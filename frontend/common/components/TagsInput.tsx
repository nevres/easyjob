import { ControlCamera } from "@mui/icons-material";
import React, { useState } from "react";
import { Control, Controller, FieldPath } from "react-hook-form";
import { default as ReactTagsInput } from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

export type TagsInputProps<T> = {
  name: FieldPath<T>;
  control: Control<T, object>;
  placeholder: string;
};

export function TagsInput<T>(props: TagsInputProps<T>) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState: { invalid, error } }) => {
        //   helperText = error ? (typeof parseError === "function" ? parseError(error) : error.message) : helperText;

        const { onChange, onBlur } = field;
        const value = field.value as Array<string>;
        return (
          <>
            <ReactTagsInput
              value={value || []}
              onChange={onChange}
              inputValue={""}
              onlyUnique
              addOnBlur
              inputProps={{ placeHolder: props.placeholder }}
            />
            {/* {helperText && <FormHelperText>{helperText}</FormHelperText>} */}
          </>
        );
      }}
    />
  );
}
