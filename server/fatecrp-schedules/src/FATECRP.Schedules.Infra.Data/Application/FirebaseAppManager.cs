using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Configuration;

namespace FATECRP.Schedules.Infra.Data.Application;

public static class FirebaseAppManager
{
    private static FirebaseApp _firebaseApp;

    public static FirebaseApp GetFirebaseApp(IConfiguration configuration)
    {
        if (_firebaseApp == null)
        {
            _firebaseApp = FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromFile("firebase.json")
            });
        }

        return _firebaseApp;
    }
}
