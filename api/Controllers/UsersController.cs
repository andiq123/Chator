
namespace api.Controllers;

public class UsersController : BaseController
{
    private readonly IUsersRepository _usersRepository;
    public UsersController(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }

    [HttpGet]
    public async Task<IReadOnlyList<UserViewModel>> GetUsersAsync()
    {
        return await _usersRepository.GetUsersAsync();
    }

    [HttpGet("{id}")]
    public async Task<UserViewModel> GetUserAsync(string id)
    {
        return await _usersRepository.GetUserAsync(id);
    }
}


