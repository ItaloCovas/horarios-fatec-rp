using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;

namespace FATECRP.Schedules.Domain.Mediator;

public abstract class CommandHandler
{
    protected readonly IMediatorHandler _mediator;
    protected readonly DomainNotificationHandler _notifications;

    protected CommandHandler(IMediatorHandler mediator, INotificationHandler<DomainNotification> notifications)
    {
        _mediator = mediator;
        _notifications = (DomainNotificationHandler)notifications;
    }
}
