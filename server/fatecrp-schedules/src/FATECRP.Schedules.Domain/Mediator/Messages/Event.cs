using MediatR;

namespace FATECRP.Schedules.Domain.Mediator.Messages;

public abstract class Event : Message, INotification
{
    public Guid UId { get; set; }
    public string Message { get; set; }
    public Guid AggregateId { get; protected set; }
    public string AggregateEntityName { get; set; }
    public object Data { get; set; }
    public Guid UserUId { get; set; }

    protected Event(object data) : this()
    {
        Data = data;
        UId = Guid.NewGuid();
        SetTimestamp(DateTime.Now);
    }

    protected Event()
    {
        UId = Guid.NewGuid();
        SetTimestamp(DateTime.Now);
    }
}
