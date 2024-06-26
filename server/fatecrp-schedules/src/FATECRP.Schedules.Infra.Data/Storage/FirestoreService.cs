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

    public async Task<List<LessonTimeDto>> GetSchedulesByAcronymAndTime(List<AcronymTimeDto> acronymTimesList)
    {
        List<LessonTimeDto> schedules = new List<LessonTimeDto>();

        foreach (var acronymTime in acronymTimesList)
        {
            CollectionReference collection = _firestoreDb.Collection("lessonTime");
            Query query = collection.WhereEqualTo("Sigla", acronymTime.Acronym).WhereEqualTo("Horario", acronymTime.LessonTime);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();

            foreach (DocumentSnapshot document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    LessonTimeDto lessonTime = document.ConvertTo<LessonTimeDto>();
                    schedules.Add(lessonTime);
                }
            }
        }

        return schedules;
    }
}