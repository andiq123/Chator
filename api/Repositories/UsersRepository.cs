namespace api.Repositories;

public class UsersRepository : IUsersRepository
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;
    public UsersRepository(UserManager<User> userManager, IMapper mapper)
    {
        _mapper = mapper;
        _userManager = userManager;
    }

    public async Task<UserViewModel> GetUserAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) throw new Exception("No user found");
        return _mapper.Map<User, UserViewModel>(user);
    }

    public async Task<User> GetUserRawAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) throw new Exception("No user found");
        return user;
    }

    public async Task<IReadOnlyList<UserViewModel>> GetUsersAsync()
    {
        var users = await _userManager.Users.ToListAsync();
        if (users == null) throw new Exception("No users in Database");
        return users.Select(x => _mapper.Map<User, UserViewModel>(x)).ToList();
    }
}
