using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace FrontendClientGenerator
{
    internal class TypescriptClientFile
    {
        private static readonly char _dirSepChar = Path.DirectorySeparatorChar;
        internal TypescriptClientFile(string fileName, string location, string code, TypescriptType typescriptType)
        {
            FileName = fileName;
            Code = code;
            Type = typescriptType;
            Location = location;
        }

        internal string FileName { get; }
        internal string Code { get; set; }
        internal TypescriptType Type { get; }
        internal string Location { get; }

        internal static TypescriptClientFile GenerateFromCodeAndPath(string code, string rootPath)
        {
            GetFileNameAndTypescriptType(code, out var fileName, out var typescriptType);
            var location = GetLocation(rootPath, fileName, typescriptType);
            return new TypescriptClientFile(fileName, location, code, typescriptType);

        }

        private static void GetFileNameAndTypescriptType(string code, out string fileName, out TypescriptType codeType)
        {
            string[] splitCode = Regex.Split(code, @"\s");
            codeType = splitCode[1].ToTypescriptType();
            fileName = splitCode[2];
            if (fileName.Contains('(')) fileName = Regex.Split(fileName, @"\(")[0];
        }

        internal void ResolveImports(List<TypescriptClientFile> clientFiles)
        {
            clientFiles.ForEach(cf =>
            {
                if (FileName == cf.FileName || FileName == "ApiException") return;
                switch (Type)
                {
                    case TypescriptType.Interface:
                        if (IsBase(cf.FileName) || IsProperty(cf.FileName)) AddImportStatement(cf);
                        break;
                    case TypescriptType.Class:
                        if (cf.FileName == "throwException" || IsRequestBody(cf.FileName) || IsReturnType(cf.FileName)) AddImportStatement(cf);
                        break;
                    case TypescriptType.Function:
                        if (cf.FileName == "ApiException") AddImportStatement(cf);
                        break;
                    case TypescriptType.Enum:
                        break;
                    default: throw new ArgumentOutOfRangeException(nameof(cf));
                }
            });

            bool IsBase(string fileName)
            {
                return Code.Contains($"extends {fileName}");
            }
            bool IsProperty(string fileName)
            {
                if (Code.Contains($": {fileName};")) return true;
                if (Code.Contains($": {fileName}[]")) return true;
                if (Code.Contains($": {fileName} |")) return true;
                return false;
            }

            bool IsRequestBody(string fileName)
            {
                if (Code.Contains($"body: {fileName} ")) return true;
                if (Code.Contains($"body: {fileName}):")) return true;
                return false;
            }

            bool IsReturnType(string fileName)
            {
                if (Code.Contains($"Promise<{fileName}>")) return true;
                if (Code.Contains($"Promise<{fileName}[]>")) return true;
                return false;
            }
        }

        internal void DisableEslintRules(bool noExplicitAny = true, bool consistentTypeAssertions = true)
        {
            if (Type != TypescriptType.Class && Type != TypescriptType.Function) return;
            if (noExplicitAny) Code = "/* eslint-disable @typescript-eslint/no-explicit-any */\n" + Code;
            if (consistentTypeAssertions) Code = "/* eslint-disable @typescript-eslint/consistent-type-assertions */\n" + Code;
        }

        private void AddImportStatement(TypescriptClientFile fi)
        {
            string relativePath = Type.GetRelativeFilePath(fi);
            string importStatement = $"import {{{fi.FileName}}} from '{relativePath}'\n";
            Code = importStatement + Code;
        }

        private static string GetLocation(string rootDirectory, string fileName, TypescriptType codeType)
        {
            var location = rootDirectory + _dirSepChar;
            if (fileName.Contains("Exception"))
            {
                location += fileName;
                return location;
            }
            location += codeType switch
            {
                TypescriptType.Interface => "Models" + _dirSepChar + fileName,
                TypescriptType.Enum => "Models" + _dirSepChar + fileName,
                TypescriptType.Class => "Clients" + _dirSepChar + fileName,
                TypescriptType.Function => fileName,
                _ => throw new ArgumentOutOfRangeException(),
            };
            return location;
        }
    }
}
