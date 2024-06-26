using MediatR;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using FATECRP.Schedules.Domain.Mediator;
using Serilog;

namespace FATECRP.Schedules.Services.Api.Configurations
{
    public static class DependencyInjectionConfiguration
    {
        public static void ResolveDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            var assemblyMediatrProject = AppDomain.CurrentDomain.Load("FATECRP.Schedules.Domain");
            services.AddMediatR(o =>
            {
                o.RegisterServicesFromAssembly(assemblyMediatrProject);
                o.AddPipelineValidator(services, assemblyMediatrProject);
            });

            services.AddScoped<INotificationHandler<DomainNotification>, DomainNotificationHandler>();
            services.AddScoped<IMediatorHandler, MediatorHandler>();

            // loggers
            services.AddLogging(builder => builder.AddSerilog());
        }
    }
}