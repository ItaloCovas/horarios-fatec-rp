using FATECRP.Schedules.Domain.Authentication;
using FirebaseAdmin.Auth;

namespace FATECRP.Schedules.Infra.Data.Authentication;

public class AuthenticationService : IAuthenticationService
{
    public Task<string> LoginAsync(string email, string password)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> RegisterAsync(string email, string password)
    {
        var userArgs = new UserRecordArgs
        {
            Email = email,
            Password = password
        };

        try
        {
            var userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(userArgs);

            if (userRecord == null)
                return false;
            else
                return true;

        }
        catch (Exception ex)
        {
            throw new Exception("Erro ao registrar usuário", ex);
        }
    }
}
