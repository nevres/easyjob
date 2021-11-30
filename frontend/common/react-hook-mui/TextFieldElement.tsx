import { TextField, TextFieldProps, Typography } from "@mui/material";
import { Controller, FieldError, Control, FieldPath } from "react-hook-form";
import React from "react";

export type TextFieldElementProps<T> = Omit<TextFieldProps, "name"> & {
  name: FieldPath<T>;
  parseError?: (error: FieldError) => string;
  control: Control<T, object>;
};

export default function TextFieldElement<T>({
  parseError,
  type,
  required,
  name,
  control,
  label,
  ...rest
}: TextFieldElementProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <>
          {label && <Typography variant="h5">{label}</Typography>}
          <TextField
            {...rest}
            name={name.toString()}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            type={type}
            error={invalid}
            label={""}
            helperText={
              error ? (typeof parseError === "function" ? parseError(error) : error.message) : rest.helperText
            }
          />
        </>
      )}
    />
  );
}
