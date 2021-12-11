namespace api.Models;

public class MessageViewModel
{
    public Guid Id { get; set; }
    public string? Text { get; set; }
    public DateTime Created { get; set; }
    public string? SenderId { get; set; }
    public string? RecieverId { get; set; }
}
