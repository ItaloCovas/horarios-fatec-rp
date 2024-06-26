using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using FATECRP.Schedules.Domain.Mediator.Notifications;
using System.Reflection;

namespace FATECRP.Schedules.Domain.Mediator;

public static class MediatRExtensions
{

    public static void AddPipelineValidator(this IServiceCollection services, Assembly assembly)
    {
        var vs = AssemblyScanner.FindValidatorsInAssembly(assembly);

        foreach (var v in vs)
            services.AddScoped(v.InterfaceType, v.ValidatorType);

        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
    }

    public static void AddPipelineValidator(this MediatRServiceConfiguration c, IServiceCollection services, Assembly assembly)
    {
        var vs = AssemblyScanner.FindValidatorsInAssembly(assembly);

        foreach (var v in vs)
            services.AddScoped(v.InterfaceType, v.ValidatorType);

        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
    }
}
