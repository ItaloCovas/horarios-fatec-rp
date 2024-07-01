using FATECRP.Schedules.Domain.Schedules.DTOs;
using FATECRP.Schedules.Domain.Storage;
using FATECRP.Schedules.Domain.Storage.DTOs;
using Google.Cloud.Firestore;

namespace FATECRP.Schedules.Infra.Data.Storage;

public class FirestoreService : IFirestoreService
{
    private readonly FirestoreDb _firestoreDb;

    public FirestoreService(FirestoreConfig firestoreConfig)
    {
        _firestoreDb = firestoreConfig.FirestoreDb;
    }

    public async Task UpdateAllSchedules(List<LessonTimeDto> schedules)
    {
        CollectionReference collection = _firestoreDb.Collection("lessonTime");

        QuerySnapshot snapshot = await collection.GetSnapshotAsync();
        foreach (DocumentSnapshot document in snapshot.Documents)
        {
            await document.Reference.DeleteAsync();
        }

        foreach (var schedule in schedules)
        {
            LessonTimeDto lessonTime = schedule as LessonTimeDto;
            if (lessonTime != null)
            {
                await collection.AddAsync(lessonTime);
            }
        }
    }

    public async Task<List<LessonTimeDto>> GetAllSchedules()
    {
        List<LessonTimeDto> schedules = new List<LessonTimeDto>();

        CollectionReference collection = _firestoreDb.Collection("lessonTime");
        QuerySnapshot allDocumentsSnapshot = await collection.GetSnapshotAsync();

        List<LessonTimeDto> allLessonTimes = allDocumentsSnapshot.Documents
            .Where(doc => doc.Exists)
            .Select(doc => doc.ConvertTo<LessonTimeDto>())
            .OrderBy(lessonTime => lessonTime.Semester)
            .ThenBy(lessonTime => lessonTime.Course)
            .ThenBy(lessonTime => GetDayOfWeekNumber(lessonTime?.WeekDay ?? string.Empty))
            .ThenBy(lessonTime => lessonTime.LessonTime)
            .ToList();

        return allLessonTimes;
    }

    private int GetDayOfWeekNumber(string day)
    {
        switch (day.ToLower())
        {
            case "segunda-feira":
            return 0;
            case "terça-feira":
            return 1;
            case "quarta-feira":
            return 2;
            case "quinta-feira":
            return 3;
            case "sexta-feira":
            return 4;
            case "sábado":
            return 5;
            default:
            return 6;
        }
    }

    public async Task<Dictionary<string, List<LessonTimeDto>>> GetSchedulesByTagAndTime(Dictionary<string, List<TagTimeDto>> tagTimesDict)
    {
        Dictionary<string, List<LessonTimeDto>> schedulesDict = new Dictionary<string, List<LessonTimeDto>>();

        CollectionReference collection = _firestoreDb.Collection("lessonTime");
        QuerySnapshot allDocumentsSnapshot = await collection.GetSnapshotAsync();

        List<LessonTimeDto> allLessonTimes = allDocumentsSnapshot.Documents
            .Where(doc => doc.Exists)
            .Select(doc => doc.ConvertTo<LessonTimeDto>())
            .ToList();

        foreach (var entry in tagTimesDict)
        {
            string weekDay = entry.Key;
            var tagTimesList = entry.Value;

            foreach (var tagTime in tagTimesList)
            {
                var filtered = allLessonTimes
                    .FirstOrDefault(lessonTime => lessonTime.Tag == tagTime.Tag
                                                  && lessonTime.LessonTime == tagTime.LessonTime
                                                  && lessonTime.WeekDay == weekDay);

                if (filtered != null)
                {
                    if (!schedulesDict.ContainsKey(weekDay))
                        schedulesDict[weekDay] = new List<LessonTimeDto>();

                    schedulesDict[weekDay].Add(filtered);
                }
            }
        }

        foreach (var key in schedulesDict.Keys.ToList())
            schedulesDict[key] = schedulesDict[key].OrderBy(lessonTime => lessonTime.LessonTime).ToList();

        return schedulesDict;
    }
}