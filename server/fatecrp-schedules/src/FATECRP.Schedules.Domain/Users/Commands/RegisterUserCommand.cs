using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Mediator;
using FATECRP.Schedules.Domain.Mediator.Messages;
using Newtonsoft.Json;
using FATECRP.Schedules.Domain.Authentication;

namespace FATECRP.Schedules.Domain.Users.Commands;

public class RegisterUserCommand : Command<bool>
{
    [JsonProperty("email")]
    public string Email { get; set; } = null!;
    [JsonProperty("password")]
    public string Password { get; set; } = null!;
}
public class RegisterUserCommandHandler : CommandHandler, IRequestHandler<RegisterUserCommand, bool>
{
    private readonly IAuthenticationService _authenticationService;

    public RegisterUserCommandHandler(IMediatorHandler mediator,
        INotificationHandler<DomainNotification> notifications,
        IAuthenticationService authenticationService) : base(mediator, notifications)
    {
        _authenticationService = authenticationService;
    }
    public async Task<bool> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            return await _authenticationService.RegisterAsync(request.Email, request.Password);
        }
        catch (Exception)
        {
            await _notifications.Handle(new DomainNotification("User", "Falha ao registrar usuário."), cancellationToken);
            return false;
        }
    }
}
