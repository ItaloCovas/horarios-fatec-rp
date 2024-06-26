using FATECRP.Schedules.Domain.Users.DTOs;

namespace FATECRP.Schedules.Domain.Authentication;

public interface IJwtProvider
{
    Task<TokenResponse?> GetTokenAsync(string email, string password);
    Task<TokenResponse?> RefreshTokenAsync(string refreshToken);
}
