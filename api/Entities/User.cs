namespace api.Entities;
public class User : IdentityUser
{
    public string? PhotoUrl { get; set; }
    public string? Description { get; set; }

}
