using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Mediator;
using Microsoft.AspNetCore.Mvc;
using FATECRP.Schedules.Domain.Users.Commands;
using Microsoft.AspNetCore.Authorization;

namespace FATECRP.Schedules.Services.Api.Controllers;

[Route("api")]
public class UserController : ApiController
{
    private readonly IMediatorHandler _mediator;

    public UserController(ILogger<UserController> logger, INotificationHandler<DomainNotification> notifications, IMediatorHandler mediator) : base(logger, notifications)
    {
        _mediator = mediator;
    }

    [HttpPost("user/scrape")]
    public async Task<IActionResult> Scrape([FromBody] ScrapeUserCommand command, CancellationToken cancellationToken)
    {
        var sucess = await _mediator.SendCommand(command, cancellationToken);
        return ResponseApi();
    }

    [HttpPost("user/login")]
    public async Task<IActionResult> Login([FromBody] LoginUserCommand command, CancellationToken cancellationToken)
    {
        var login = await _mediator.SendCommand(command, cancellationToken);
        return ResponseApi(login);
    }

    [HttpPost("user/register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserCommand command, CancellationToken cancellationToken)
    {
        await _mediator.SendCommand(command, cancellationToken);
        return ResponseApi();
    }

    [HttpPost("user/token/refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshUserTokenCommand command, CancellationToken cancellationToken)
    {
        var refresh = await _mediator.SendCommand(command, cancellationToken);
        return ResponseApi(refresh);
    }

    [Authorize]
    [HttpPost("user/token/validate")]
    public IActionResult ValidateToken()
    {
        return ResponseApi();
    }

}
