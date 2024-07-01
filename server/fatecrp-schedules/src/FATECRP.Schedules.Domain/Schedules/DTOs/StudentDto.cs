using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Schedules.DTOs
{
    public class StudentDto
    {
        [JsonProperty("nomeAluno")]
        public string? StudentName { get; set; }

        [JsonProperty("ra")]
        public string? RA { get; set; }

        [JsonProperty("semestre")]
        public string? Semester { get; set; }
    }
}
