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

    public async Task<IReadOnlyList<UserViewModel>> GetUsersAsync(string loggedUserId)
    {
        var users = await _userManager.Users.Where(x => x.Id != loggedUserId).ToListAsync();
        if (users == null) throw new Exception("No users in Database");
        return users.Select(x => _mapper.Map<User, UserViewModel>(x)).ToList();
    }

    public async Task<UserViewModel> UpdateUserAsync(string userId, UserToUpdateDto userToUpdateDto)
    {
        var user = await GetUserRawAsync(userId);
        user.UserName = userToUpdateDto.Username ?? user.UserName;
        user.Description = userToUpdateDto.Description ?? user.Description;
        user.PhotoUrl = userToUpdateDto.PhotoUrl ?? user.PhotoUrl;
        await _userManager.UpdateAsync(user);
        return _mapper.Map<User, UserViewModel>(user);
    }
}
