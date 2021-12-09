
namespace api.Interfaces;

public interface IAuthRepository
{
    Task<string> Register(UserToCreateDto userToCreateDto);
    Task<string> Login(UserToLoginDto userToLoginDto);
    Task<bool> UserExists(string username);
}
