using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Schedules.DTOs;

public class ScheduleDto
{
    [JsonProperty("course")] // Curso
    public string? Course { get; set; }

    [JsonProperty("semester")] // Semestre
    public string? Semester { get; set; }

    [JsonProperty("lessonName")] // Disciplina
    public string? LessonName { get; set; }

    [JsonProperty("tag")] // Código da disciplina
    public string? Tag { get; set; }

    [JsonProperty("weekDay")] // Dia da semana
    public string? WeekDay { get; set; }

    [JsonProperty("lessonTime")] // Horário
    public string? LessonTime { get; set; }

    [JsonProperty("teacherName")] // Professor
    public string? TeacherName { get; set; }

    [JsonProperty("classroom")] // Sala
    public string? Classroom { get; set; }

    [JsonProperty("floor")] // Andar
    public string? Floor { get; set; }

    [JsonProperty("classroomLink")]  // Link de uma imagem de mostra a localização da sala de aula
    public string? ClassroomLink { get; set; }
}
