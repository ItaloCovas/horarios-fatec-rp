using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Mediator;
using FATECRP.Schedules.Domain.Mediator.Messages;
using FATECRP.Schedules.Domain.Schedules.DTOs;
using FATECRP.Schedules.Domain.Scraper;

namespace FATECRP.Schedules.Domain.Users.Commands;

public class ScrapeUserCommand : Command<StudentGradeDto>
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}
public class ScrapeUserCommandHandler : CommandHandler, IRequestHandler<ScrapeUserCommand, StudentGradeDto?>
{
    private readonly IScraperService _scraper;
    public ScrapeUserCommandHandler(IMediatorHandler mediator,
        INotificationHandler<DomainNotification> notifications,
        IScraperService scraper) : base(mediator, notifications)
    {
        _scraper = scraper;
    }
    public async Task<StudentGradeDto?> Handle(ScrapeUserCommand request, CancellationToken cancellationToken)
    {       
        try
        {
            var studentGrade = await _scraper.ScrapeAsync(request.Email, request.Password);
            return studentGrade;
        }
        catch (Exception)
        {
            await _notifications.Handle(new DomainNotification("User", "Falha ao logar."), cancellationToken);
            return null;
        }
    }
}
