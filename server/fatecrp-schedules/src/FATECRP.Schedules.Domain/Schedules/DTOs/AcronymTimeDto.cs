using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Schedules.DTOs;

public class AcronymTimeDto
{
    [JsonProperty("acronym")]
    public string Acronym { get; set; } = null!;

    [JsonProperty("lessonTime")]
    public string LessonTime { get; set; } = null!;
}
