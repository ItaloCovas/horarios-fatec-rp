using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Users.DTOs;

public class ScheduleRequest
{
    [JsonProperty("tag")] // Código da disciplina
    public string? Tag { get; set; }

    [JsonProperty("lessonTime")] // Horário
    public string? LessonTime { get; set; }
}