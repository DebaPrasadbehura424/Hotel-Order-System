using backend.Data;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

var connections =
    "server=localhost;database=todo_db;user=root;password=sitaram";

builder.Services.AddDbContext<AppDbContext>(options =>
options.UseMySql(
    connections,
    ServerVersion.AutoDetect(connections)
)
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


builder.Services.AddControllers();

var app = builder.Build();

// app.UseHttpsRedirection();
app.UseCors("AllowReact");
app.MapControllers();

app.Run();