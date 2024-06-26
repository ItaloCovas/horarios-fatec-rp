using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Mediator;
using FATECRP.Schedules.Domain.Mediator.Messages;
using FATECRP.Schedules.Domain.Schedules.DTOs;

namespace FATECRP.Schedules.Domain.Users.Commands;

public class ScrapeUserCommand : Command<List<ScheduleDto>>
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}
public class ScrapeUserCommandHandler : CommandHandler, IRequestHandler<ScrapeUserCommand, List<ScheduleDto>>
{

    public ScrapeUserCommandHandler(IMediatorHandler mediator,
        INotificationHandler<DomainNotification> notifications) : base(mediator, notifications)
    {
    }
    public async Task<List<ScheduleDto>> Handle(ScrapeUserCommand request, CancellationToken cancellationToken)
    {
        var schedules = new List<ScheduleDto>();

        try
        {

        }
        catch (Exception)
        {
            await _notifications.Handle(new DomainNotification("User", "Falha ao logar."), cancellationToken);
            return schedules;
        }
        return schedules;
    }
}
