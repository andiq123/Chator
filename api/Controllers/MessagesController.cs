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


    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Message>>> GetMessages()
    {
        try
        {
            return Ok(await _messagesRepository.GetMessages());
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Message>> GetMessage(Guid id)
    {
        try
        {
            var message = await _messagesRepository.GetMessage(id);
            return Ok(message);
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


