import { FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@mui/material";
import React from "react";
import { Control, FieldError, FieldPath, useController } from "react-hook-form";

type ValueType = number;

export type RadioButtonOption<T> = {
  value: T;
  label: string;
};

export type RadioButtonGroupProps<T, Q> = {
  options: RadioButtonOption<Q>[];
  control: Control<T, object>;
  name: FieldPath<T>;
  renderCustomComponent: (option: RadioButtonOption<Q>, onSelect: () => void, isSelected: boolean) => JSX.Element;

  helperText?: string;
  required?: boolean;
  parseError?: (error: FieldError) => string;
  label?: string;
  onChange?: Function;
  disabled?: boolean;
  row?: boolean;
};

export default function CustomRadioButtonGroup<T, Q>({
  helperText,
  options,
  label,
  name,
  parseError,
  required,
  disabled,
  control,
  row,
  renderCustomComponent,
  ...rest
}: RadioButtonGroupProps<T, Q>): JSX.Element {
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
        {options.map((option: RadioButtonOption<Q>, index) => {
          const isSelected = option.value === value;
          return (
            <FormControlLabel
              control={renderCustomComponent(option, () => onChange(option.value), isSelected)}
              label=""
              key={index}
              sx={{ marginLeft: 0 }}
            />
          );
        })}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
