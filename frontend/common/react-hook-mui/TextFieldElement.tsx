import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldError, Control } from "react-hook-form";
import React from "react";

export type TextFieldElementProps<T> = Omit<TextFieldProps, "name"> & {
  name: keyof T;
  parseError?: (error: FieldError) => string;
  control: Control<T, object>;
};

export default function TextFieldElement<T>({
  parseError,
  type,
  required,
  name,
  control,
  ...rest
}: TextFieldElementProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
      }) => (
        <TextField
          {...rest}
          name={name.toString()}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          type={type}
          error={invalid}
          helperText={
            error
              ? typeof parseError === "function"
                ? parseError(error)
                : error.message
              : rest.helperText
          }
        />
      )}
    />
  );
}
