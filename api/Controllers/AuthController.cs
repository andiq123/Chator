namespace api.Controllers;

public class AuthController : BaseController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHubContext<ChatHub> _hub;
    public AuthController(IUnitOfWork unitOfWork, IHubContext<ChatHub> hub)
    {
        _unitOfWork = unitOfWork;
        _hub = hub;
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenResponseViewModel>> Login(UserToLoginDto userToLoginDto)
    {
        var token = await _unitOfWork.Auth.Login(userToLoginDto);
        return Ok(token);
    }

    [HttpPost("register")]
    public async Task<ActionResult<TokenResponseViewModel>> Register(UserToCreateDto userToCreateDto)
    {
        var token = await _unitOfWork.Auth.Register(userToCreateDto);
        await _hub.Clients.All.SendAsync("RegisteredUser");
        return Ok(token);
    }

}
