import React from "react";
import { FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Radio } from "@mui/material";
import { FieldError, Control, useController, FieldPath } from "react-hook-form";

type ValueType = number;

export type RadioButtonOption = {
  value: ValueType;
  label: string;
};

export type RadioButtonGroupProps<T> = {
  options: RadioButtonOption[];
  control: Control<T, object>;
  name: FieldPath<T>;

  helperText?: string;
  required?: boolean;
  parseError?: (error: FieldError) => string;
  label?: string;
  onChange?: Function;
  disabled?: boolean;
  row?: boolean;
};

export default function RadioButtonGroup<T>({
  helperText,
  options,
  label,
  name,
  parseError,
  required,
  disabled,
  control,
  row,
  ...rest
}: RadioButtonGroupProps<T>): JSX.Element {
  const {
    field: { value, onChange },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  });

  helperText = error ? (typeof parseError === "function" ? parseError(error) : error.message) : helperText;

  return (
    <FormControl error={invalid} required={required}>
      {label && <FormLabel error={invalid}>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option: RadioButtonOption) => {
          const isSelected = option.value === value;
          return (
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  value={option.value}
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => onChange(option.value)}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
