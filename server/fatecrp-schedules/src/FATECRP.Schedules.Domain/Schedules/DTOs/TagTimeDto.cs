using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Schedules.DTOs;

public class TagTimeDto
{
    [JsonProperty("tag")]
    public string Tag { get; set; } = null!;

    [JsonProperty("lessonTime")]
    public string LessonTime { get; set; } = null!;
}
