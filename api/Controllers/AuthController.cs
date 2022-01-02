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
        try
        {
            var token = await _authRepository.Login(userToLoginDto);
            return Ok(token);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);

        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<TokenResponseViewModel>> Register(UserToCreateDto userToCreateDto)
    {
        try
        {
            var token = await _authRepository.Register(userToCreateDto);
            await _hub.Clients.All.SendAsync("RegisteredUser");
            return Ok(token);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

}
