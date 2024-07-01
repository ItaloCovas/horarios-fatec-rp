using MediatR;
using FATECRP.Schedules.Domain.Schedules.DTOs;
using FATECRP.Schedules.Domain.Storage;
using FATECRP.Schedules.Domain.Storage.DTOs;

namespace FATECRP.Schedules.Domain.Schedules.Queries;

public class GetAllSchedulesQuery : IRequest<List<LessonTimeDto>>
{
}

public class GetAllPermissionsQueryHandler : IRequestHandler<GetAllSchedulesQuery, List<LessonTimeDto>>
{
    private readonly IFirestoreService _firestoreService;

    public GetAllPermissionsQueryHandler(IFirestoreService firestoreService)
    {
        _firestoreService = firestoreService;
    }

    public async Task<List<LessonTimeDto>> Handle(GetAllSchedulesQuery request, CancellationToken cancellationToken)
    {
        return await _firestoreService.GetAllSchedules();
    }
}

