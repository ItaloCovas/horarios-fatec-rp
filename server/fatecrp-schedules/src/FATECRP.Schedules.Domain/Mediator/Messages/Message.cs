namespace FATECRP.Schedules.Domain.Mediator.Messages;

public abstract class Message
{
    public string MessageType { get; protected set; }
    public DateTime Timestamp { get; private set; }
    public void SetTimestamp(DateTime timestamp) => Timestamp = timestamp;

    protected Message()
    {
        MessageType = GetType().Name;
    }
}
