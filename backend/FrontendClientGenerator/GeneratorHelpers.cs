using NSwag;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace FrontendClientGenerator
{
    internal static partial class Generator
    {
        private static string _mainSavePath;
        private static readonly List<string> _delimiters = new() { "export", "function" };

        private static readonly string _typescriptExtension = ".ts";
        private static List<TypescriptClientFile> GenerateClientFiles(string code)
        {
            var splitCode = GetSplitCode(code, _delimiters);

            List<TypescriptClientFile> clientFiles = splitCode.ConvertAll(code => TypescriptClientFile.GenerateFromCodeAndPath(code, _mainSavePath));
            clientFiles.ForEach(cf => { cf.ResolveImports(clientFiles); cf.DisableEslintRules(); });
            return clientFiles;
        }
        private static List<string> GetSplitCode(string wholeCode, List<string> delimiters)
        {
            var regexDelimiters = CreateRegexDelimiters(delimiters);
            var regexPattern = "(?=(" + regexDelimiters + "))";

            var splitCode = Regex.Split(wholeCode, regexPattern).ToList();
            splitCode = splitCode.Where(ex => !delimiters.Contains(ex)).Skip(1).ToList();
            splitCode = splitCode.ConvertAll(file => file.Contains("export") ? file : "export " + file);
            return splitCode;

        }

        private static string CreateRegexDelimiters(List<string> delimiters)
        {
            StringBuilder regexDelimiters = new StringBuilder();
            foreach (var delimiter in delimiters)
            {
                regexDelimiters.Append(delimiter + "|");
            }
            return regexDelimiters.ToString().Remove(regexDelimiters.Length - 1);
        }

        private static void AddAsyncModifier(IEnumerable<OpenApiOperationDescription> operations, List<TypescriptClientFile> clientFiles)
        {
            var clientClasses = clientFiles.Where(cf => cf.Type == TypescriptType.Class);
            foreach (var o in operations)
            {
                var operationId = o.Operation.OperationId;
                var clientFileName = $"{operationId.Split('_')[0]}Client";
                var action = $"{operationId.Split('_')[1]}(";

                var processAction = $"process{action}";
                var camelAction = char.ToLower(action[0]) + action.Substring(1);

                var file = clientClasses.First(cf => cf.FileName == clientFileName);
                var code = file.Code.Replace(camelAction, $"async {camelAction}");
                code = code.Replace($"protected {processAction}", $"protected async {processAction}");
                file.Code = code;
            }
        }
        private static void CreateDirectories()
        {
            Directory.CreateDirectory(Path.Combine(_mainSavePath, @"..\"));
            Directory.CreateDirectory(_mainSavePath);
            var modelsSavePath = Path.Combine(_mainSavePath, "Models");
            var clientsSavePath = Path.Combine(_mainSavePath, "Clients");
            Directory.CreateDirectory(modelsSavePath);
            Directory.CreateDirectory(clientsSavePath);
        }
        private static void SetMainSavePath(string savePath)
        {
            _mainSavePath = savePath;
        }
        private static void DeleteUnnecessaryFiles(List<TypescriptClientFile> clientFiles)
        {

            var allFilePaths = Directory.GetFiles(_mainSavePath, "*", SearchOption.AllDirectories);
            var newFilePaths = clientFiles.Select(cf => cf.Location + _typescriptExtension);

            foreach (var p in allFilePaths.Where(f => !newFilePaths.Contains(f)))
            {
                File.Delete(p);
            }
        }

        private static void SaveFilesIfChanged(List<TypescriptClientFile> clientFiles)
        {
            foreach (var clientFile in clientFiles)
            {
                string savePath = clientFile.Location + _typescriptExtension;
                try
                {
                    var previousFile = File.ReadAllText(savePath);
                    if (previousFile != clientFile.Code)
                    {
                        File.WriteAllTextAsync(savePath, clientFile.Code);
                    }
                }
                catch
                {
                    File.WriteAllTextAsync(savePath, clientFile.Code);
                }
            }
        }
    }
}
