﻿using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Mediator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FATECRP.Schedules.Domain.Schedules.Commands;
using FATECRP.Schedules.Domain.Schedules.Queries;

namespace FATECRP.Schedules.Services.Api.Controllers
{
    [Route("api")]
    public class ScheduleController : ApiController
    {
        private readonly IMediatorHandler _mediator;

        public ScheduleController(ILogger<ScheduleController> logger, INotificationHandler<DomainNotification> notifications, IMediatorHandler mediator) : base(logger, notifications)
        {
            _mediator = mediator;
        }

        [Authorize(AuthenticationSchemes = "Firebase")]
        [HttpPut("schedules/update")]
        public async Task<IActionResult> Update([FromBody] UpdateSchedulesCommand command, CancellationToken cancellationToken)
        {
            await _mediator.SendCommand(command, cancellationToken);
            return ResponseApi();
        }

        [Authorize(AuthenticationSchemes = "Firebase")]
        [HttpGet("schedules/get")]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            var result = await _mediator.Query(new GetAllSchedulesQuery(), cancellationToken);
            return ResponseApi(result);
        }
    }
}
