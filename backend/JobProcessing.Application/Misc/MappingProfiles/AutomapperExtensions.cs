using AutoMapper;
using AutoMapper.Internal;
using Google.Protobuf.WellKnownTypes;
using System;
using System.Linq.Expressions;

namespace Shared.Automapper
{
    public static class AutoMapperExtensions
    {
        public static IMappingExpression<TSource, TDestination> MapRecordMember<TSource, TDestination, TMember>(
            this IMappingExpression<TSource, TDestination> mappingExpression,
            Expression<Func<TDestination, TMember>> destinationMember, Expression<Func<TSource, TMember>> sourceMember)
        {
            var memberInfo = ReflectionHelper.FindProperty(destinationMember);
            string memberName = memberInfo.Name;
            return mappingExpression
                .ForMember(destinationMember, opt => opt.MapFrom(sourceMember))
                .ForCtorParam(memberName, opt => opt.MapFrom(sourceMember));
        }
    }

    public class Proto3TimeStampDateConverter : ITypeConverter<DateTimeOffset, Timestamp>
    {
        public Timestamp Convert(DateTimeOffset source, Timestamp destination, ResolutionContext context)
        {
            return Timestamp.FromDateTimeOffset(source);
        }
    }
}
