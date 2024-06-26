using MediatR;
using FATECRP.Schedules.Domain.Mediator.Messages;

namespace FATECRP.Schedules.Domain.Mediator;

public interface IMediatorHandler
{
    Task PublishEvent<T>(T e, CancellationToken cancellationToken = default) where T : Event;
    Task<TResult> SendCommand<TResult>(Command<TResult> command, CancellationToken cancellationToken = default);
    Task<TResponse?> Query<TResponse>(IRequest<TResponse> query, CancellationToken cancellationToken = default);
}

public class MediatorHandler : IMediatorHandler
{
    private readonly IMediator _mediator;

    public MediatorHandler(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task<TResult> SendCommand<TResult>(Command<TResult> command, CancellationToken cancellationToken = default)
        => await _mediator.Send(command, cancellationToken);

    public async Task PublishEvent<T>(T e, CancellationToken cancellationToken = default) where T : Event
        => await _mediator.Publish(e, cancellationToken);

    public async Task<TResponse?> Query<TResponse>(IRequest<TResponse> query, CancellationToken cancellationToken = default)
        => await _mediator.Send(query, cancellationToken);
}
