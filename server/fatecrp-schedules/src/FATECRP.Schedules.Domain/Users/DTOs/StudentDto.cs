using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Users.DTOs;

public class StudentDto
{
    [JsonProperty("name")]
    public string? Name { get; set; }

    [JsonProperty("semester")]
    public string? Semester { get; set; }

    [JsonProperty("ra")]
    public string? RA { get; set; }
}
