import { useCallback } from "react";
import * as yup from "yup";
import { AnyObject, AssertsShape, Assign, ObjectShape, TypeOfShape } from "yup/lib/object";

/**
 *
 * @param validationSchemas Provide all validation schemas, which will be taken based on the context param validationSchemaId which is index of the array. if context value is not provided, then first schema will be taken
 * @returns
 */
export function useYupValidationResolver(
  validationSchemas: Array<
    yup.ObjectSchema<Assign<ObjectShape, object>, AnyObject, TypeOfShape<any>, AssertsShape<any>>
  >
) {
  return useCallback(
    async (data, context) => {
      try {
        const values =
          context.validationSchemaId !== undefined &&
          context.validationSchemaId >= 0 &&
          context.validationSchemaId <= validationSchemas.length - 1
            ? await validationSchemas[context.validationSchemaId].validate(data, {
                abortEarly: false
              })
            : await validationSchemas[0].validate(data, {
                abortEarly: false
              });

        return {
          values,
          errors: {}
        };
      } catch (errors: any) {
        debugger;
        return {
          values: {},
          errors: errors.inner?.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchemas]
  );
}
