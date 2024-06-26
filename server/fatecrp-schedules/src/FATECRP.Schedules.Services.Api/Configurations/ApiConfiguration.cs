using Microsoft.AspNetCore.Mvc.Formatters;

namespace FATECRP.Schedules.Services.Api.Configurations
{
    public static class ApiConfiguration
    {
        public static void AddApiConfig(this IServiceCollection services)
        {
            services
                .AddMvcCore(o =>
                {
                    o.OutputFormatters.Remove(new XmlDataContractSerializerOutputFormatter());
                })
                .AddNewtonsoftJson(o =>
                {
                    o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                })
                .ConfigureApiBehaviorOptions(a => a.SuppressModelStateInvalidFilter = true)
                .AddApiExplorer()
                .AddCors(options =>
                {
                    options.AddPolicy("All",
                        builder =>
                            builder
                                .AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader());
                })
                .AddFormatterMappings();

            services.AddControllers(options =>
            {
                options.AllowEmptyInputInBodyModelBinding = true;
            });
        }
        public static void UseApiConfiguration(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}