namespace api.Data;

public class DataContext : IdentityDbContext<User>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<Message>? Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        var hasher = new PasswordHasher<User>();

        var user1 = new User
        {
            Id = "1",
            UserName = "user1",
            NormalizedUserName = "USER1",
            Description = "I am the user 1",
            PasswordHash = hasher.HashPassword(null, "Password1@")
        };

        var user2 = new User
        {
            Id = "2", 
            UserName = "user2",
            NormalizedUserName = "USER2",
            Description = "I am the user 2",
            PasswordHash = hasher.HashPassword(null, "Password1@") 
        };

        builder.Entity<User>().HasData(user1, user2);
    }

}
