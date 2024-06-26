using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Users.DTOs;

public class TokenResponse
{
    [JsonProperty("email", NullValueHandling = NullValueHandling.Ignore)]
    public string? Email { get; set; }

    [JsonProperty("token")]
    public string Token { get; set; } = null!;

    [JsonProperty("refreshToken")]
    public string RefreshToken { get; set; } = null!;

    [JsonProperty("expireIn")]
    public long ExpireIn { get; set; }
}
