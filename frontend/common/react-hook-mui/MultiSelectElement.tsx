import React from "react";
import CloseIcon from "@mui/icons-material/Cancel";
import { Controller, FieldError, Control, FieldPath } from "react-hook-form";
import { Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";

export type ValueType = number | string;

export type SelectItem = {
  value: ValueType;
  label: string;
};

export type MultiSelectElementProps<T> = Omit<SelectProps, "value"> & {
  menuItems: Array<SelectItem>;
  name: FieldPath<T>;
  control: Control<T, object>;
  label: string;
  multiple?: boolean;
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
  multiple,
  ...rest
}: MultiSelectElementProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => {
        helperText = error ? (typeof parseError === "function" ? parseError(error) : error.message) : helperText;

        const { onChange, onBlur } = field;
        const value = field.value as Array<ValueType>;

        return (
          <FormControl variant={variant} style={{ minWidth }} fullWidth={rest.fullWidth} error={invalid}>
            <InputLabel error={invalid} htmlFor={rest.id || `select-multi-select-${name}`} required={required}>
              {label}
            </InputLabel>
            <Select
              {...rest}
              id={rest.id || `select-multi-select-${name}`}
              label={label}
              multiple={multiple}
              error={invalid}
              value={value || []}
              required={required}
              onChange={onChange}
              onBlur={onBlur}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: menuMaxHeight,
                    width: menuMaxWidth
                  }
                }
              }}
              renderValue={
                showChips
                  ? (selected: Array<ValueType>) => (
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {(selected || []).map((selectedValue) => (
                          <Chip
                            key={selectedValue}
                            label={selectedValue}
                            style={{ display: "flex", flexWrap: "wrap" }}
                            onDelete={() => {
                              onChange(value.filter((i: any) => i !== selectedValue));
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
              {menuItems.map((item: SelectItem) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  style={{
                    fontWeight: (value || []).includes(item.value) ? "bold" : "normal"
                  }}
                >
                  {item.label}
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
