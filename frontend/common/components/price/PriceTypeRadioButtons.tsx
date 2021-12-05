import { AccessTime, Money } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import { Price } from "../../../apis/jobProcessingApi/Models/Price";
import { PriceType } from "../../../apis/jobProcessingApi/Models/PriceType";
import useI18n, { TranslationFunc } from "../../i18n/useI18n";
import CustomRadioButtonGroup, { RadioButtonOption } from "../../react-hook-mui/CustomRadioButtonGroup";

export function getPriceOptions(translation: TranslationFunc) {
  return [
    { label: translation("fixedPrice"), value: PriceType.FixedPrice },
    { label: translation("hourlyRate"), value: PriceType.Hourly }
  ];
}

interface Props<T extends { price: Price }> {
  control: Control<T, object>;
}

export default function PriceTypeRadioButtons<T extends { price: Price }>(props: Props<T>) {
  const t = useI18n();
  return (
    <CustomRadioButtonGroup
      name={"price.priceType" as any}
      control={props.control}
      options={getPriceOptions(t)}
      row
      renderCustomComponent={renderCustomPriceBox}
    />
  );

  function renderCustomPriceBox(priceOption: RadioButtonOption<PriceType>, onSelect: () => void, isSelected: boolean) {
    const icon =
      priceOption.value === PriceType.Hourly ? (
        <AccessTime sx={{ height: "50px", width: "50px" }} />
      ) : (
        <Money sx={{ height: "50px", width: "50px" }} />
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
