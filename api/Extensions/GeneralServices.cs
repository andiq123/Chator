namespace api.Extensions;

public static class GeneralServices
{
    public static IServiceCollection AddGeneralService(this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddAutoMapper(typeof(Program));

        services.AddDbContext<DataContext>(options =>
           {
               options.UseSqlite(config.GetConnectionString("DefaultConnection"));
           });


        services.AddCors(options => options.AddDefaultPolicy(builder => builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials()));
        services.AddSignalR();
        return services;
    }
}
