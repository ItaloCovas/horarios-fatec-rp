using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Mediator;
using FATECRP.Schedules.Domain.Mediator.Messages;
using FATECRP.Schedules.Domain.Authentication;
using FATECRP.Schedules.Domain.Users.DTOs;

namespace FATECRP.Schedules.Domain.Users.Commands;

public class LoginUserCommand : Command<TokenResponse?>
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}
public class LoginUserCommandHandler : CommandHandler, IRequestHandler<LoginUserCommand, TokenResponse?>
{
    private readonly IJwtProvider _jwtProvider;
    public LoginUserCommandHandler(IMediatorHandler mediator,
        INotificationHandler<DomainNotification> notifications,
        IJwtProvider jwtProvider) : base(mediator, notifications)
    {
        _jwtProvider = jwtProvider;
    }
    public async Task<TokenResponse?> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var token = await _jwtProvider.GetTokenAsync(request.Email, request.Password);
            if (token != null)
                return token;
            else
                await _notifications.Handle(new DomainNotification("User", "Login ou senha inválidos."), cancellationToken);
            return null;
        }
        catch (Exception)
        {
            await _notifications.Handle(new DomainNotification("User", "Falha ao logar."), cancellationToken);
            return null;
        }
    }
}
