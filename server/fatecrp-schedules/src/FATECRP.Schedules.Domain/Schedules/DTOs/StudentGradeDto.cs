using Newtonsoft.Json;

namespace FATECRP.Schedules.Domain.Schedules.DTOs;

public class StudentGradeDto
{
    [JsonProperty("studentName")]
    public string? StudentName { get; set; }

    [JsonProperty("ra")]
    public string? RA { get; set; }

    [JsonProperty("semester")]
    public string? Semester { get; set; }

    [JsonProperty("days")]
    public List<Day> Days { get; set; } = new();
}

public class Day
{
    [JsonProperty("monday")]
    public List<Subject>? Monday { get; set; } = null;

    [JsonProperty("tuesday")]
    public List<Subject>? Tuesday { get; set; } = null;

    [JsonProperty("wednesday")]
    public List<Subject>? Wednesday { get; set; } = null;

    [JsonProperty("thursday")]
    public List<Subject>? Thursday { get; set; } = null;

    [JsonProperty("friday")]
    public List<Subject>? Friday { get; set; } = null;

    [JsonProperty("saturday")]
    public List<Subject>? Saturday { get; set; } = null;

}

public class Subject
{
    [JsonProperty("tag")]
    public string? Tag { get; set; }

    [JsonProperty("lessonTime")]
    public string? LessonTime { get; set; }

    [JsonProperty("lessonName")]
    public string? LessonName { get; set; }

    [JsonProperty("teacherName")]
    public string? TeacherName { get; set; }

    [JsonProperty("classroom")]
    public string? Classroom { get; set; }

    [JsonProperty("classroomLink")]
    public string? ClassroomLink { get; set; }

}