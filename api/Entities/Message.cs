namespace api.Entities;

public class Message
{
    public Guid Id { get; set; }
    public string? Text { get; set; }
    public DateTime Created { get; set; }

    public string? SenderId { get; set; }
    public User? Sender { get; set; }

    public string? RecieverId { get; set; }
    public User? Reciever { get; set; }

}
