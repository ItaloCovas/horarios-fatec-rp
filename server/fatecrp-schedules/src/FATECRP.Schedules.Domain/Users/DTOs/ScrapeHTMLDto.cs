using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Users.DTOs;

public class ScrapeHTMLDto
{
    [JsonProperty("success")]
    public bool Success { get; set; } = false;

    [JsonProperty("html")]
    public string HTML { get; set; } = string.Empty;

}
