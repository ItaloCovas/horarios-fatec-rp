using FluentValidation.Results;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace FATECRP.Schedules.Domain.Mediator.Notifications;

public class ValidationBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    private readonly IServiceProvider _provider;
    private readonly ILogger<ValidationBehavior<TRequest, TResponse>> _logger;
    private readonly INotificationHandler<DomainNotification> _notifications;

    public ValidationBehavior(IServiceProvider provider, ILogger<ValidationBehavior<TRequest, TResponse>> logger, INotificationHandler<DomainNotification> notifications)
    {
        _provider = provider;
        _logger = logger;
        _notifications = notifications;
    }

    public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (typeof(TRequest).Name.Contains("Query"))
        {
            return next();
        }

        var validator = _provider.GetService<IValidator<TRequest>>();

        if (validator == null)
            throw new InvalidOperationException($"Validator for '{typeof(TRequest).FullName}' not found");

        _logger.LogDebug("Validating instance");
        var result = validator.Validate(request);
        var failures = result.Errors.Where(f => f != null).ToList();
        return failures.Any() ? Notify(failures) : next();
    }

    private Task<TResponse> Notify(IEnumerable<ValidationFailure> failures)
    {
        var result = default(TResponse);

        foreach (var failure in failures)
            _notifications.Handle(new DomainNotification(failure.PropertyName, failure.ErrorMessage), CancellationToken.None);

        return Task.FromResult(result);
    }
}
