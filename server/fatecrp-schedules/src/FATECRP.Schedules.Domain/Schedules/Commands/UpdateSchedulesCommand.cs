using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Mediator;
using FATECRP.Schedules.Domain.Mediator.Messages;
using FATECRP.Schedules.Domain.Storage;
using FATECRP.Schedules.Domain.Storage.DTOs;

namespace FATECRP.Schedules.Domain.Schedules.Commands;

public class UpdateSchedulesCommand : Command<bool>
{
    public List<LessonTimeDto> schedules = new();
}

public class UpdateSchedulesCommandHandler : CommandHandler, IRequestHandler<UpdateSchedulesCommand, bool>
{
    private readonly IFirestoreService _firestoreService;

    public UpdateSchedulesCommandHandler(IMediatorHandler mediator,
        INotificationHandler<DomainNotification> notifications,
        IFirestoreService firestoreService) : base(mediator, notifications)
    {
        _firestoreService = firestoreService;
    }

    public async Task<bool> Handle(UpdateSchedulesCommand request, CancellationToken cancellationToken)
    {
        try
        {
           await _firestoreService.UpdateAllSchedules(request.schedules);
        }
        catch (Exception)
        {
            await _notifications.Handle(new DomainNotification("Schedules", "Falha ao tentar atualizar grade de horários."), cancellationToken);
            return false;
        }
        return true;
    }
}