namespace api.Controllers;

public class AuthController : BaseController
{
    private readonly IAuthRepository _authRepository;
    private readonly IHubContext<ChatHub> _hub;
    public AuthController(IAuthRepository authRepository, IHubContext<ChatHub> hub)
    {
        _hub = hub;
        _authRepository = authRepository;
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenResponseViewModel>> Login(UserToLoginDto userToLoginDto)
    {
        var token = await _authRepository.Login(userToLoginDto);
        return Ok(token);
    }

    [HttpPost("register")]
    public async Task<ActionResult<TokenResponseViewModel>> Register(UserToCreateDto userToCreateDto)
    {
        var token = await _authRepository.Register(userToCreateDto);
        await _hub.Clients.All.SendAsync("RegisteredUser");
        return Ok(token);
    }

}
