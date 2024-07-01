using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Mediator;
using FATECRP.Schedules.Domain.Mediator.Messages;
using FATECRP.Schedules.Domain.Schedules.DTOs;
using FATECRP.Schedules.Domain.Scraper;
using Newtonsoft.Json;
using FATECRP.Schedules.Domain.Storage;

namespace FATECRP.Schedules.Domain.Users.Commands;

public class ScrapeUserCommand : Command<StudentGradeDto?>
{
    [JsonProperty("ra")]
    public string Email { get; set; } = null!;

    [JsonProperty("password")]
    public string Password { get; set; } = null!;
}
public class ScrapeUserCommandHandler : CommandHandler, IRequestHandler<ScrapeUserCommand, StudentGradeDto?>
{
    private readonly IFirestoreService _firestoreService;
    private readonly IScraperService _scraper;
    public ScrapeUserCommandHandler(IMediatorHandler mediator,
        INotificationHandler<DomainNotification> notifications,
        IScraperService scraper,
        IFirestoreService firestoreService) : base(mediator, notifications)
    {
        _scraper = scraper;
        _firestoreService = firestoreService;
    }
    public async Task<StudentGradeDto?> Handle(ScrapeUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var htmlScraped = await _scraper.ScrapeHTMLAsync(request.Email, request.Password);
            if (!htmlScraped.Success)
            {
                await _notifications.Handle(new DomainNotification("User", "Usuário ou senha inválidos."), cancellationToken);
                return null;
            }

            var parseSuccess = await _scraper.ParseHtml(htmlScraped.HTML);
            if (!parseSuccess)
            {
                await _notifications.Handle(new DomainNotification("User", "Falha ao logar."), cancellationToken);
                return null;
            }

            var student = _scraper.GetStudent();
            var lessons = await _firestoreService.GetSchedulesByTagAndTime(_scraper.GetTagTime());

            Dictionary<string, List<ScheduleDto>> scheduleDtos = lessons
                .ToDictionary(
                    entry => entry.Key,
                    entry => entry.Value.Select(lesson => new ScheduleDto
                    {
                        Course = lesson.Course,
                        Semester = lesson.Semester,
                        LessonName = lesson.LessonName,
                        Tag = lesson.Tag,
                        WeekDay = lesson.WeekDay,
                        LessonTime = lesson.LessonTime,
                        TeacherName = lesson.TeacherName,
                        Classroom = lesson.Classroom,
                        Floor = lesson.Floor,
                        ClassroomLink = lesson.ClassroomLink
                    }).ToList()
                );

            return new StudentGradeDto() { Student = student, Days = scheduleDtos};
        }
        catch (Exception)
        {
            await _notifications.Handle(new DomainNotification("User", "Falha ao logar."), cancellationToken);
            return null;
        }
    }
}
