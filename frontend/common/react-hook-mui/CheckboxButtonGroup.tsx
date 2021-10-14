import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { FieldError, Control, useController, FieldPath } from "react-hook-form";

type ValueType = number;

export type CheckBoxOption = {
  value: ValueType;
  label: string;
};

export type CheckboxButtonGroupProps<T> = {
  options: CheckBoxOption[];
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

export default function CheckboxButtonGroup<T>({
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
}: CheckboxButtonGroupProps<T>): JSX.Element {
  const {
    field: { value: selectedValues = [], onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  helperText = error
    ? typeof parseError === "function"
      ? parseError(error)
      : error.message
    : helperText;

  const handleChange = (index: ValueType) => {
    const newArray = [...selectedValues] as Array<ValueType>;
    const exists = isValueInOptions(index);
    if (exists) {
      newArray.splice(
        selectedValues.findIndex((i: any) => i === index),
        1
      );
    } else {
      newArray.push(index);
    }
    onChange(newArray);
    if (typeof rest.onChange === "function") {
      rest.onChange(newArray);
    }
  };

  return (
    <FormControl error={invalid} required={required}>
      {label && <FormLabel error={invalid}>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option: any) => {
          const isChecked = isValueInOptions(option.value);
          return (
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value={option.value}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => handleChange(option.value)}
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

  function isValueInOptions(value: ValueType) {
    return (
      (selectedValues as Array<ValueType>).find((item) => item === value) !==
      undefined
    );
  }
}
