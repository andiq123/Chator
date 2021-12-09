

namespace api.Controllers
{
    public class AuthController : BaseController
    {
        private readonly IAuthRepository _authRepository;
        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("login")]
        public async Task<string> Login(UserToLoginDto userToLoginDto)
        {
            return await _authRepository.Login(userToLoginDto);
        }

        [HttpPost("register")]
        public async Task<string> Register(UserToCreateDto userToCreateDto)
        {
            return await _authRepository.Register(userToCreateDto);
        }

    }
}