using MediatR;
using Microsoft.AspNetCore.Mvc;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Services.Api.Response;

namespace FATECRP.Schedules.Services.Api.Controllers
{
    [ApiController]
    public class ApiController : ControllerBase
    {
        protected ILogger _logger;
        protected readonly DomainNotificationHandler _notifications;
        protected ApiController(ILogger logger, INotificationHandler<DomainNotification> notifications)
        {
            _logger = logger;
            _notifications = (DomainNotificationHandler)notifications;
        }

        protected ActionResult ResponseApi(object? result = null)
        {
            if (!ModelState.IsValid)
            {
                for (var i = 0; i < ModelState.Count; i++)
                    _notifications.Handle(new DomainNotification(ModelState.Keys.ToList()[i], ModelState.Values.ToList()[i].Errors.FirstOrDefault().ErrorMessage), CancellationToken.None);
            }

            if (!_notifications.HasNotifications())
            {
                return Ok(new Result
                {
                    Succeeded = true,
                    Data = result
                });
            }

            return BadRequest(new Result()
            {
                Succeeded = false,
                Errors = _notifications.GetNotifications().Select(n => new MessageError { Key = n.Key, Message = n.Value }).ToArray()
            });
        }
    }
}