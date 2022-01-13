namespace api.Repositories;

public class UnitOfWork : IUnitOfWork
{

    public IAuthRepository Auth { get; private set; }

    public IUsersRepository Users { get; private set; }

    public IMessagesRepository Messages { get; private set; }

    private readonly DataContext _context;
    public UnitOfWork(DataContext context, SignInManager<User> signInManager, UserManager<User> userManager, TokenService tokenService, IMapper mapper)
    {
        _context = context;
        Auth = new AuthRepository(signInManager, userManager, tokenService);
        Users = new UsersRepository(userManager, mapper);
        Messages = new MessagesRepository(_context, mapper);

    }
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
        await Task.CompletedTask;
    }
}
