using FATECRP.Schedules.Domain.Schedules.DTOs;
using FATECRP.Schedules.Domain.Storage.DTOs;

namespace FATECRP.Schedules.Domain.Storage;

public interface IFirestoreService
{
    Task UpdateAllSchedules(List<LessonTimeDto> schedules);
    Task<List<LessonTimeDto>> GetSchedulesByAcronymAndTime(List<AcronymTimeDto> acronymTimesList);
}
