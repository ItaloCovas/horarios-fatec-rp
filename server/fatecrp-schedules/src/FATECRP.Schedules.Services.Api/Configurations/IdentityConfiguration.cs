using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FATECRP.Schedules.Services.Api.Configurations
{
    public static class IdentityConfiguration
    {
        public static void AddIdentityConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));

        services.AddAuthentication()
        .AddJwtBearer("Firebase", options =>
        {
            options.Authority = configuration["Authentication:ValidIssuer"];
            options.Audience = configuration["Authentication:Audience"];
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = configuration["Authentication:ValidIssuer"],
                ValidateIssuerSigningKey = true
            };
        });
            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes("Firebase")
                    .RequireAuthenticatedUser()
                    .Build();
            });
        }
    }
}
