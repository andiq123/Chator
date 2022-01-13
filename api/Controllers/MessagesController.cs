namespace api.Controllers;

[Authorize]
public class MessagesController : BaseController
{
    private readonly IUnitOfWork _unitOfWork;

    public MessagesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }


    [HttpGet("{otherUserId}")]
    public async Task<ActionResult<IReadOnlyList<MessageViewModel>>> GetMessages(string otherUserId)
    {
        var loggedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Ok(await _unitOfWork.Messages.GetMessages(loggedUserId, otherUserId));
    }


    [HttpPost]
    public async Task<ActionResult<Message>> CreateMessage(MessageToAddDto message)
    {
        var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        return Ok(await _unitOfWork.Messages.AddMessage(message, userId));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMessage(Guid id)
    {
        var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        await _unitOfWork.Messages.DeleteMessage(id, userId);
        return Ok();
    }

    [HttpPut("{messageId}")]
    public async Task<ActionResult<Message>> EditMessage(string messageId, MessageToUpdateDto messageToUpdateDto)
    {
        var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var parsed = Guid.Parse(messageId);
        var message = await _unitOfWork.Messages.UpdateMessage(parsed, userId, messageToUpdateDto.Text);
        return Ok(message);
    }

}


