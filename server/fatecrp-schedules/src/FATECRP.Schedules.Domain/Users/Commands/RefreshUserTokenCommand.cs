using MediatR;
using FATECRP.Schedules.Domain.Authentication;
using FATECRP.Schedules.Domain.Mediator;
using FATECRP.Schedules.Domain.Mediator.Messages;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Users.DTOs;

namespace FATECRP.Schedules.Domain.Users.Commands;

public class RefreshUserTokenCommand : Command<TokenResponse?>
{
    public string RefreshToken { get; set; } = null!;
}
public class RefreshUserTokenCommandHandler : CommandHandler, IRequestHandler<RefreshUserTokenCommand, TokenResponse?>
{
    private readonly IJwtProvider _jwtProvider;
    public RefreshUserTokenCommandHandler(IMediatorHandler mediator,
        INotificationHandler<DomainNotification> notifications,
        IJwtProvider jwtProvider) : base(mediator, notifications)
    {
        _jwtProvider = jwtProvider;
    }
    public async Task<TokenResponse?> Handle(RefreshUserTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var token = await _jwtProvider.RefreshTokenAsync(request.RefreshToken);
            if (token != null)
                return token;
            else
                await _notifications.Handle(new DomainNotification("User", "Refresh Token inválido."), cancellationToken);
            return null;
        }
        catch (Exception)
        {
            await _notifications.Handle(new DomainNotification("User", "Falha ao atualizar o token."), cancellationToken);
            return null;
        }
    }
}