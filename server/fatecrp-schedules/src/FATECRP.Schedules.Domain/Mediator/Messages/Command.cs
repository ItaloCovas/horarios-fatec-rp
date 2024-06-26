using MediatR;

namespace FATECRP.Schedules.Domain.Mediator.Messages;

public abstract class Command<T> : Message, IRequest<T>
{
    protected Command()
    {
        SetTimestamp(DateTime.Now);
    }
}
