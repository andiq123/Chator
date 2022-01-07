var builder = WebApplication.CreateBuilder(args);




// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddGeneralService(builder.Configuration);


var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors();
app.UseDefaultFiles();
app.UseStaticFiles();


app.MapControllers();
app.MapFallbackToController("Index", "Fallback");
app.MapHub<ChatHub>("/chat");


try
{
    await app.RunAsync();
}
catch (Exception ex)
{
    Console.WriteLine("Error: " + ex.Message);
}

