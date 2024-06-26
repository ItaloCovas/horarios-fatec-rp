using FATECRP.Schedules.Domain.Authentication;
using FATECRP.Schedules.Domain.Scraper;
using FATECRP.Schedules.Domain.Storage;
using FATECRP.Schedules.Infra.Data.Authentication;
using FATECRP.Schedules.Infra.Data.Scraper;
using FATECRP.Schedules.Infra.Data.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FATECRP.Schedules.Infra.Data;

public static class InfraDepedencyInjection
{
    public static void AddInfrastruture(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddTransient<IFirestoreService, FirestoreService>();
        services.AddSingleton<FirestoreConfig>();


        services.AddSingleton<IAuthenticationService, AuthenticationService>();
        services.AddTransient<IJwtProvider, JwtProvider>();

        services.AddScoped<IScraperService, ScraperService>();

        services.AddHttpClient("GetTokenClient", client =>
        {
            var tokenUri = configuration.GetSection("Authentication:TokenUri").Value;
            if (string.IsNullOrEmpty(tokenUri))
                throw new ArgumentNullException("TokenUri não configurado");
            client.BaseAddress = new Uri(tokenUri);
        });

        services.AddHttpClient("RefreshTokenClient", client =>
        {
            var refreshTokenUri = configuration.GetSection("Authentication:RefreshTokenUri").Value;
            if (string.IsNullOrEmpty(refreshTokenUri))
                throw new ArgumentNullException("RefreshTokenUri não configurado");
            client.BaseAddress = new Uri(refreshTokenUri);
        });

    }
}
