namespace api.Controllers;

[Authorize]
public class UsersController : BaseController
{
    private readonly IUnitOfWork _unitOfWork;

    public UsersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<UserViewModel>>> GetUsersAsync()
    {
        var loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var users = await _unitOfWork.Users.GetUsersAsync(loggedUserId);
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserViewModel>> GetUserAsync(string id)
    {
        var user = await _unitOfWork.Users.GetUserAsync(id);
        return user;
    }

    [HttpPost("photo")]
    public async Task<IActionResult> photoTest()
    {
        var file = Request.Form.Files[0];
        if (file == null) return BadRequest(new ApiException(400, "No Image was provided"));
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _unitOfWork.Users.GetUserAsync(userId);
        if (user == null) return NotFound(new ApiException(404, "User not found"));

        if (!string.IsNullOrEmpty(user.PhotoUrl))
            ImageHelper.RemoveImage(user.PhotoUrl);

        var userToUpdate = new UserToUpdateDto()
        {
            Photo = ImageHelper.CreateImage(file)
        };

        var userUpdated = await _unitOfWork.Users.UpdateUserAsync(userId, userToUpdate);
        return Ok(userUpdated);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UserViewModel>> UpdateUser(string id, [FromBody] UserToUpdateDto userToUpdateDto)
    {
        var loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (loggedUserId != id)
        {
            return Unauthorized();
        }

        var user = await _unitOfWork.Users.UpdateUserAsync(id, userToUpdateDto);
        return Ok(user);
    }

    [HttpGet("loggedUser")]
    public async Task<ActionResult<UserViewModel>> GetUserByEmailAsync()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Ok(await _unitOfWork.Users.GetUserAsync(userId));
    }
}


