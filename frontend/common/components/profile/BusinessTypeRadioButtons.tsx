import { Business, Person } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import { Control, Path } from "react-hook-form";
import { BusinessType } from "../../../apis/profileApi/Models/BusinessType";
import useI18n, { TranslationFunc } from "../../i18n/useI18n";
import CustomRadioButtonGroup, { RadioButtonOption } from "../../react-hook-mui/CustomRadioButtonGroup";

export function getBusinessTypeOptions(translation: TranslationFunc) {
  return [
    { label: translation("company"), value: BusinessType.Company },
    { label: translation("person"), value: BusinessType.Individual }
  ];
}

type PropsForType<T extends object, V> = {
  -readonly [Key in keyof T]-?: T[Key] extends V | undefined ? Key : never;
}[keyof T];

interface Props<T extends object> {
  control: Control<T, object>;
  name: PropsForType<T, BusinessType> & Path<T>;
}

export default function BusinessTypeRadioButtons<T extends object>(props: Props<T>) {
  const t = useI18n();
  return (
    <CustomRadioButtonGroup
      name={props.name}
      control={props.control}
      options={getBusinessTypeOptions(t)}
      row
      renderCustomComponent={renderCustomPriceBox}
    />
  );

  function renderCustomPriceBox(
    priceOption: RadioButtonOption<BusinessType>,
    onSelect: () => void,
    isSelected: boolean
  ) {
    const icon =
      priceOption.value === BusinessType.Company ? (
        <Business sx={{ height: "50px", width: "50px" }} />
      ) : (
        <Person sx={{ height: "50px", width: "50px" }} />
      );
    return (
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.primary.light}`,
          borderRadius: "5px",
          padding: (theme) => theme.spacing(),
          backgroundColor: (theme) => (isSelected ? theme.palette.primary.veryLight : ""),
          display: "flex",
          alignItems: "center",
          gap: (theme) => theme.spacing()
        }}
        onClick={onSelect}
      >
        {icon}
        {priceOption.label}
      </Box>
    );
  }
}
