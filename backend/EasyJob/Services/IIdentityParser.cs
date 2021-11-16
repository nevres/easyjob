using System.Security.Principal;

namespace EasyJob.Services
{
    public interface IIdentityParser<T>
    {
        T Parse(IPrincipal principal);
    }
}
