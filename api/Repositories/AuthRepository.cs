
namespace api.Repositories;

public class AuthRepository : IAuthRepository
{

    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;

    public AuthRepository(SignInManager<User> signInManager, UserManager<User> userManager, TokenService tokenService)
    {
        _tokenService = tokenService;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<TokenResponseViewModel> Login(UserToLoginDto userToLoginDto)
    {
        var user = await _userManager.FindByNameAsync(userToLoginDto.Username) ?? throw new Exception("User not found");

        var passwordCheck = await _signInManager.CheckPasswordSignInAsync(user, userToLoginDto.Password, false);

        return !passwordCheck.Succeeded
            ? throw new Exception("User not found")
            : new TokenResponseViewModel() { Token = _tokenService.GenerateToken(user) };
    }

    public async Task<TokenResponseViewModel> Register(UserToCreateDto userToCreateDto)
    {
        var userExists = await UserExists(userToCreateDto.Username ?? "");
        if (userExists) throw new Exception("User already exists");

        var userToCreate = new User() { UserName = userToCreateDto.Username, Description = userToCreateDto.Description };

        var result = await _userManager.CreateAsync(userToCreate, userToCreateDto.Password);
        if (result.Errors.Any())
        {
            throw new Exception("Password too weak");
        }

        var userFromDb = await _userManager.FindByNameAsync(userToCreate.UserName);
        return new TokenResponseViewModel() { Token = _tokenService.GenerateToken(userFromDb) };
    }

    public async Task<bool> UserExists(string username)
    {
        return await _userManager.FindByNameAsync(username) != null;
    }
}
