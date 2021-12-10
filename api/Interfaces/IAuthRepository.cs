namespace api.Interfaces;
public interface IAuthRepository
{
    Task<TokenResponseViewModel> Register(UserToCreateDto userToCreateDto);
    Task<TokenResponseViewModel> Login(UserToLoginDto userToLoginDto);
    Task<bool> UserExists(string username);
}
