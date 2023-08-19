namespace api.Data;

public class DataContext : IdentityDbContext<User>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<Message>? Messages { get; set; }
}
