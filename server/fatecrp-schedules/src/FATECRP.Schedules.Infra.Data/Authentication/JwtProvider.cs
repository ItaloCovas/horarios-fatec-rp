using FATECRP.Schedules.Domain.Authentication;
using FATECRP.Schedules.Domain.Users.DTOs;
using Newtonsoft.Json;
using System.Net.Http.Json;

namespace FATECRP.Schedules.Infra.Data.Authentication
{
    public class JwtProvider : IJwtProvider
    {
        private readonly HttpClient _getTokenClient;
        private readonly HttpClient _refreshTokenClient;
        public JwtProvider(IHttpClientFactory httpClientFactory)
        {
            _getTokenClient = httpClientFactory.CreateClient("GetTokenClient");
            _refreshTokenClient = httpClientFactory.CreateClient ("RefreshTokenClient");
        }

        public async Task<TokenResponse?> GetTokenAsync(string email, string password)
        {
            var request = new
            {
                email,
                password,
                returnSecureToken = true
            };

            var response = await _getTokenClient.PostAsJsonAsync("", request);

            if (!response.IsSuccessStatusCode)
                return null;
            
            var authToken = await response.Content.ReadFromJsonAsync<AuthToken>();

            var tokenResponse = new TokenResponse
            {
                Email = authToken?.Email!,
                Token = authToken?.IdToken!,
                RefreshToken = authToken?.RefreshToken!,
                ExpireIn = authToken?.ExpiresIn ?? 0
            };

            return tokenResponse;
        }

        public async Task<TokenResponse?> RefreshTokenAsync(string refreshToken)
        {
            var request = new
            {
                grant_type = "refresh_token",
                refresh_token = refreshToken
            };

            var response = await _refreshTokenClient.PostAsJsonAsync("", request);

            if (!response.IsSuccessStatusCode)
                return null;

            var jsonContent = await response.Content.ReadAsStringAsync();

            var authToken = JsonConvert.DeserializeObject<RefreshedToken>(jsonContent);

            var tokenResponse = new TokenResponse
            {
                Token = authToken?.IdToken!,
                RefreshToken = authToken?.RefreshToken!,
                ExpireIn = authToken?.ExpiresIn ?? 0
            };

            return tokenResponse;
        }

        public class AuthToken
        {
            [JsonProperty("email")]
            public string Email { get; set; } = null!;

            [JsonProperty("idToken")]
            public string IdToken { get; set; } = null!;

            [JsonProperty("refreshToken")]
            public string RefreshToken { get; set; } = null!;

            [JsonProperty("expiresIn")]
            public long ExpiresIn { get; set; }
        }

        public class RefreshedToken
        {
            [JsonProperty("id_token")]
            public string IdToken { get; set; } = null!;

            [JsonProperty("refresh_token")]
            public string RefreshToken { get; set; } = null!;

            [JsonProperty("expires_in")]
            public long ExpiresIn { get; set; }
        }
    }
}
