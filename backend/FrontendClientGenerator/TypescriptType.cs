using System;

namespace FrontendClientGenerator
{
    public enum TypescriptType
    {
        Class,
        Interface,
        Function,
        Enum
    }
    internal static class TypescriptTypeMethods
    {
        internal static TypescriptType ToTypescriptType(this string str)
        {
            return (str) switch
            {
                "class" => TypescriptType.Class,
                "interface" => TypescriptType.Interface,
                "function" => TypescriptType.Function,
                "enum" => TypescriptType.Enum,
                _ => throw new ArgumentOutOfRangeException(),
            };
        }
        internal static string GetRelativeFilePath(this TypescriptType enm, TypescriptClientFile fi)
        {
            return enm switch
            {
                // interfaces only import other interfaces
                TypescriptType.Interface => $"./{fi.FileName}",
                TypescriptType.Enum => $"./{fi.FileName}",
                TypescriptType.Function => $"./{fi.FileName}", // this is only the throwException function which imports ApiException
                TypescriptType.Class => fi.Type == TypescriptType.Interface || fi.Type == TypescriptType.Enum
                ? $"../Models/{fi.FileName}"
                : $"../{fi.FileName}", // for throwException function
                _ => throw new ArgumentOutOfRangeException()
            };
        }
    }
}
