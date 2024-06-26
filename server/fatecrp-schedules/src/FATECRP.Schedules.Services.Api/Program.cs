using FATECRP.Schedules.Infra.Data;
using FATECRP.Schedules.Services.Api.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.AddLoggerConfig();
builder.Services.AddApiConfig();
builder.Services.AddSwaggerConfig();
builder.Services.AddInfrastruture(builder.Configuration);
builder.Services.ResolveDependencies(builder.Configuration);
builder.Services.AddIdentityConfiguration(builder.Configuration);

var app = builder.Build();

app.UseApiConfiguration(app.Environment);
app.UseSwaggerConfig();
app.Run();

