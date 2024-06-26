using MediatR;
using FATECRP.Schedules.Domain.Schedules.DTOs;
using FATECRP.Schedules.Domain.Storage;

namespace FATECRP.Schedules.Domain.Schedules.Queries;

public class GetAllSchedulesQuery : IRequest<StudentGradeDto>
{
    public List<AcronymTimeDto> acronymTimes = new();
}

public class GetAllPermissionsQueryHandler : IRequestHandler<GetAllSchedulesQuery, StudentGradeDto>
{
    private readonly IFirestoreService _firestoreService;

    public GetAllPermissionsQueryHandler(IFirestoreService firestoreService)
    {
        _firestoreService = firestoreService;
    }

    public async Task<StudentGradeDto> Handle(GetAllSchedulesQuery request, CancellationToken cancellationToken)
    {
        var lessons = await _firestoreService.GetSchedulesByAcronymAndTime(request.acronymTimes);

        var grade = new StudentGradeDto();
        return grade;
    }
}

