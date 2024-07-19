using DotNetEnv;
using Carter;
using IoContainer;

Env.Load();
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

IoC.AddServices(builder.Services, builder.Configuration);

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x=> x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();
//app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();
app.MapCarter();
app.MapFallbackToFile("index.html");

app.Run();