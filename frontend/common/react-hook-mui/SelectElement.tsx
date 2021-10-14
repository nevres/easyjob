import React from "react";
import CloseIcon from "@mui/icons-material/Cancel";
import { Controller, FieldError, Control, FieldPath } from "react-hook-form";
import {
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

export type MultiSelectElementProps<T> = Omit<SelectProps, "value"> & {
  menuItems: any;
  name: FieldPath<T>;
  control: Control<T, object>;
  label: string;
  required?: boolean;
  validation?: any;
  parseError?: (error: FieldError) => string;
  minWidth?: number;
  menuMaxHeight?: number;
  menuMaxWidth?: number;
  helperText?: string;
  showChips?: boolean;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function MultiSelectElement<T>({
  menuItems,
  control,
  label = "",
  required = false,
  validation = {},
  parseError,
  name,
  menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  menuMaxWidth = 250,
  minWidth = 120,
  helperText,
  showChips,
  variant,
  ...rest
}: MultiSelectElementProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
      }) => {
        helperText = error
          ? typeof parseError === "function"
            ? parseError(error)
            : error.message
          : helperText;
        return (
          <FormControl
            variant={variant}
            style={{ minWidth }}
            fullWidth={rest.fullWidth}
            error={invalid}
          >
            <InputLabel
              error={invalid}
              htmlFor={rest.id || `select-multi-select-${name}`}
              required={required}
            >
              {label}
            </InputLabel>
            <Select
              {...rest}
              id={rest.id || `select-multi-select-${name}`}
              label={label}
              multiple
              error={invalid}
              value={value || []}
              required={required}
              onChange={onChange}
              onBlur={onBlur}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: menuMaxHeight,
                    width: menuMaxWidth,
                  },
                },
              }}
              renderValue={
                showChips
                  ? (selected: any) => (
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {((selected as any[]) || []).map((selectedValue) => (
                          <Chip
                            key={selectedValue}
                            label={selectedValue}
                            style={{ display: "flex", flexWrap: "wrap" }}
                            onDelete={() => {
                              onChange(
                                value.filter((i: any) => i !== selectedValue)
                              );
                              // setValue(name, formValue.filter((i: any) => i !== value), { shouldValidate: true })
                            }}
                            deleteIcon={
                              <CloseIcon
                                onMouseDown={(ev) => {
                                  ev.stopPropagation();
                                }}
                              />
                            }
                          />
                        ))}
                      </div>
                    )
                  : undefined
              }
            >
              {menuItems.map((item: any) => (
                <MenuItem
                  key={item}
                  value={item}
                  style={{
                    fontWeight: (value || []).includes(item)
                      ? "bold"
                      : "normal",
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
