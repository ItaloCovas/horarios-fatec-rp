using Newtonsoft.Json;

namespace FATECRP.Schedules.Services.Api.Response
{
    public class MessageError
    {
        [JsonProperty("key")]
        public string Key { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}