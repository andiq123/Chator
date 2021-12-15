namespace api.Controllers;

[Authorize]
public class UsersController : BaseController
{
    private readonly IUsersRepository _usersRepository;
    public UsersController(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<UserViewModel>>> GetUsersAsync()
    {
        try
        {
            var loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var users = await _usersRepository.GetUsersAsync(loggedUserId);
            return Ok(users);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserViewModel>> GetUserAsync(string id)
    {
        try
        {
            var user = await _usersRepository.GetUserAsync(id);
            return user;
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UserViewModel>> UpdateUser(string id, [FromBody] UserToUpdateDto userToUpdateDto)
    {
        var loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (loggedUserId != id)
        {
            return Unauthorized();
        }
        try
        {
            var user = await _usersRepository.UpdateUserAsync(id, userToUpdateDto);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet("loggedUser")]
    public async Task<ActionResult<UserViewModel>> GetUserByEmailAsync()
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(await _usersRepository.GetUserAsync(userId));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
}


