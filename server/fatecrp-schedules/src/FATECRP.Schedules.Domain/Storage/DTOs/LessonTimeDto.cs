using Google.Cloud.Firestore;
using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Storage.DTOs;

[FirestoreData]
public class LessonTimeDto
{
    [FirestoreProperty]
    [JsonProperty("course")] // Curso
    public string? Course { get; set; }

    [FirestoreProperty]
    [JsonProperty("semester")] // Semestre
    public string? Semester { get; set; }

    [FirestoreProperty]
    [JsonProperty("lessonName")] // Disciplina
    public string? LessonName { get; set; }

    [FirestoreProperty]
    [JsonProperty("weekDay")] // Dia da semana
    public string? WeekDay { get; set; }

    [FirestoreProperty]
    [JsonProperty("lessonTime")] // Horário
    public string? LessonTime { get; set; }

    [FirestoreProperty]
    [JsonProperty("teacherName")] // Professor
    public string? TeacherName { get; set; }

    [FirestoreProperty]
    [JsonProperty("classroom")] // Sala
    public string? Classroom { get; set; }

    [FirestoreProperty]
    [JsonProperty("floor")] // Andar
    public string? Floor { get; set; }

    [FirestoreProperty]
    [JsonProperty("classroomLink")]  // Link de uma imagem de mostra a localização da sala de aula
    public string? ClassroomLink { get; set; }

    [FirestoreProperty]
    [JsonProperty("tag")] // Código da disciplina
    public string? Tag { get; set; }
}
