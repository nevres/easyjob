import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldPath } from "react-hook-form";
import { SelectItem } from "./MultiSelectElement";

export type AutocompleteElementProps<T> = Omit<
  AutocompleteProps<SelectItem, undefined, undefined, undefined>,
  "name" | "renderInput" | "multiple"
> & {
  name: FieldPath<T>;
  control: Control<T, object>;
  label: string;
  multiple?: boolean;
};

export default function AutocompleteElement<T>({
  name,
  control,
  options,
  label,
  multiple,
  ...rest
}: AutocompleteElementProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => {
        console.log(value);
        return (
          <Autocomplete
            disablePortal
            autoComplete={true}
            id="combo-box-demo"
            options={options}
            onChange={(event, value) => onChange(value)}
            onBlur={onBlur}
            fullWidth
            multiple={multiple}
            value={value}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        );
      }}
    ></Controller>
  );
}
