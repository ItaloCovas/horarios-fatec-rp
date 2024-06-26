using Serilog;
using Serilog.Events;

namespace FATECRP.Schedules.Services.Api.Configurations
{
    public static class LoggerConfiguration
    {
        public static void AddLoggerConfig(this WebApplicationBuilder builder)
        {
            builder.Host.UseSerilog((host, log) =>
            {
                if (host.HostingEnvironment.IsProduction())
                    log.MinimumLevel.Information();
                else
                    log.MinimumLevel.Debug();
                log.MinimumLevel.Override("Microsoft", LogEventLevel.Warning);
                log.MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning);
                log.MinimumLevel.Override("Microsoft.EntityFrameworkCore.Database.Command", LogEventLevel.Warning);
                log.WriteTo.Console();
            });
        }


    }
}
