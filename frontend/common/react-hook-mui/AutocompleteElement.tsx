import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldPath } from "react-hook-form";

export type AutocompleteElementProps<T, U> = Omit<
  AutocompleteProps<U, undefined, undefined, undefined>,
  "name" | "renderInput" | "multiple"
> & {
  name: FieldPath<T>;
  control: Control<T, object>;
  label: string;
  multiple?: boolean;
};

export default function AutocompleteElement<T, U>({
  name,
  control,
  options,
  label,
  multiple,
  ...rest
}: AutocompleteElementProps<T, U>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <Autocomplete
          disablePortal
          autoComplete={true}
          id="combo-box-demo"
          options={options}
          onChange={onChange}
          fullWidth
          multiple={multiple}
          value={value}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    ></Controller>
  );
}
