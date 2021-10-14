using NJsonSchema;
using NJsonSchema.CodeGeneration.TypeScript;
using NSwag;
using NSwag.CodeGeneration.TypeScript;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace FrontendClientGenerator
{
    internal static partial class Generator
    {
        async public static Task GenerateTypescriptClient(string savePath, string swaggerPath)
        {
            SetMainSavePath(savePath);
            CreateDirectories();

            var openApiDocument = await OpenApiDocument.FromFileAsync(swaggerPath);

            var settings = new TypeScriptClientGeneratorSettings();
            settings.TypeScriptGeneratorSettings.SchemaType = SchemaType.Swagger2;
            settings.TypeScriptGeneratorSettings.TypeStyle = TypeScriptTypeStyle.Interface;
            settings.TypeScriptGeneratorSettings.TypeScriptVersion = 4.1M;
            settings.TypeScriptGeneratorSettings.DateTimeType = TypeScriptDateTimeType.String;

            var generator = new TypeScriptClientGenerator(openApiDocument, settings);
            var generatedCode = generator.GenerateFile();

            var clientFiles = GenerateClientFiles(generatedCode);

            AddAsyncModifier(openApiDocument.Operations, clientFiles);

            DeleteUnnecessaryFiles(clientFiles);
            SaveFilesIfChanged(clientFiles);
        }

    }
}