using FATECRP.Schedules.Infra.Data.Application;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using Grpc.Auth;
using Microsoft.Extensions.Configuration;

namespace FATECRP.Schedules.Infra.Data.Storage;

public class FirestoreConfig
{
    public FirestoreDb FirestoreDb { get; private set; }

    public FirestoreConfig(IConfiguration configuration)
    {
        var firebaseApp = FirebaseAppManager.GetFirebaseApp(configuration);
        string projectId = configuration["Firebase:ProjectId"];
        
        var credentials = firebaseApp.Options.Credential.ToChannelCredentials();
        var firestoreClientBuilder = new FirestoreClientBuilder
        {
            ChannelCredentials = credentials
        };
        var firestoreClient = firestoreClientBuilder.Build();

        FirestoreDb = FirestoreDb.Create(projectId, firestoreClient);
    }
}