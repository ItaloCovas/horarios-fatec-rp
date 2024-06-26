namespace FATECRP.Schedules.Domain.Authentication;

public interface IAuthenticationService
{
    Task<bool> RegisterAsync(string email, string password);
    Task<string> LoginAsync(string email, string password);
}
