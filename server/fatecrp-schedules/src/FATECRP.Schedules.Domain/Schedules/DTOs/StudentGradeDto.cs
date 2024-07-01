using FATECRP.Schedules.Domain.Storage.DTOs;
using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Schedules.DTOs;

public class StudentGradeDto
{
    [JsonProperty("estudante")]
    public StudentDto Student { get; set; } = new();

    [JsonProperty("dias")]
    public Dictionary<string, List<ScheduleDto>> Days { get; set; } = new();
}

