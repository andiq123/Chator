namespace api.Controllers;

[Authorize]
public class MessagesController : BaseController
{
    private readonly IMessagesRepository _messagesRepository;
    private readonly IUsersRepository _usersRepository;
    public MessagesController(IMessagesRepository messagesRepository, IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
        _messagesRepository = messagesRepository;
    }


    [HttpGet("{otherUserId}")]
    public async Task<ActionResult<IReadOnlyList<MessageViewModel>>> GetMessages(string otherUserId)
    {
        try
        {
            var loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(await _messagesRepository.GetMessages(loggedUserId, otherUserId));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }


    [HttpPost]
    public async Task<ActionResult<Message>> CreateMessage(MessageToAddDto message)
    {
        try
        {
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }
            return Ok(await _messagesRepository.AddMessage(message, userId));
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
}


