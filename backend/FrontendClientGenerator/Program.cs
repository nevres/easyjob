using System.Diagnostics;

namespace FrontendClientGenerator
{
    static class Program
    {
        static void Main(string[] args)
        {
            var swaggerPath = args[0];
            var savePath = args[1];

            _ = Generator.GenerateTypescriptClient(savePath, swaggerPath);
        }
    }
}