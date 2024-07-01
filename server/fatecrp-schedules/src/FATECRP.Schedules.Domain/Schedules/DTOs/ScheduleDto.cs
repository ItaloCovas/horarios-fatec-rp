using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Reflection;

namespace FATECRP.Schedules.Domain.Schedules.DTOs;

public class ScheduleDto
{
    [JsonProperty("curso")] // Curso
    public string? Course { get; set; }

    [JsonIgnore]
    [JsonProperty("semetre")] // Semestre
    public string? Semester { get; set; }

    [JsonProperty("materia")] // Disciplina
    public string? LessonName { get; set; }

    [JsonIgnore]
    [JsonProperty("tag")] // Código da disciplina
    public string? Tag { get; set; }

    [JsonIgnore]
    [JsonProperty("dia")] // Dia da semana
    public string? WeekDay { get; set; }

    [JsonProperty("horario")] // Horário
    public string? LessonTime { get; set; }

    [JsonProperty("professor")] // Professor
    public string? TeacherName { get; set; }

    [JsonProperty("sala")] // Sala
    public string? Classroom { get; set; }

    [JsonProperty("andar")] // Andar
    public string? Floor { get; set; }

    [JsonProperty("imagemUrl")]  // Link de uma imagem de mostra a localização da sala de aula
    public string? ClassroomLink { get; set; }
}

public class SkipJsonIgnoreContractResolver : DefaultContractResolver
{
    protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
    {
        var property = base.CreateProperty(member, memberSerialization);
        var ignoreAttribute = member.GetCustomAttribute<JsonIgnoreAttribute>();

        if (ignoreAttribute != null)
        {
            property.Ignored = false;
        }

        return property;
    }
}