namespace api.Helpers;

public class Profiles : Profile
{
    public Profiles()
    {
        CreateMap<User, UserViewModel>();
    }
}
