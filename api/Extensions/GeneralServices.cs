namespace api.Extensions;

public static class GeneralServices
{
    public static IServiceCollection AddGeneralService(this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<IAuthRepository, AuthRepository>();
        services.AddScoped<IUsersRepository, UsersRepository>();
        services.AddScoped<IMessagesRepository, MessagesRepository>();
        services.AddAutoMapper(typeof(Program));

        services.AddDbContext<DataContext>(options => options.UseSqlite(config.GetConnectionString("DefaultConnection")));
        services.AddCors(options => options.AddDefaultPolicy(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
        return services;
    }
}
