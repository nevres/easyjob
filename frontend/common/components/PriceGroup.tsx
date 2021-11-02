import { Control, FieldPath } from "react-hook-form";
import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import CheckboxButtonGroup, { CheckBoxOption } from "../react-hook-mui/CheckboxButtonGroup";
import { PriceType } from "../../api/Models/PriceType";
import useI18n from "../i18n/useI18n";
import { SHOP_CURRENCY } from "../../domain/constants";
import TextFieldElement from "../react-hook-mui/TextFieldElement";

export const PRICE_OPTIONS: Array<CheckBoxOption> = [
  { label: PriceType.FixedPrice, value: 0 },
  { label: PriceType.Hourly, value: 1 }
];

export type PriceModel = {
  type: PriceType;
  minAmount: number;
  maxAmount: number;
};

interface Props<T extends { price: PriceModel }> {
  control: Control<T, object>;
}

export default function PriceGroup<T extends { price: PriceModel }>(props: Props<T>) {
  let t = useI18n();

  return (
    <>
      <CheckboxButtonGroup name={"price.type" as any} control={props.control} options={PRICE_OPTIONS} row />
      <Stack direction="row" spacing={2}>
        <TextFieldElement
          control={props.control}
          name={"price.minAmount" as any}
          id="outlined-search"
          type="number"
          placeholder={t("min")}
          InputProps={{
            endAdornment: <InputAdornment position="end">{SHOP_CURRENCY}</InputAdornment>
          }}
        />
        <TextFieldElement
          control={props.control}
          name={"price.maxAmount" as any}
          id="outlined-search"
          type="number"
          placeholder={t("max")}
          InputProps={{
            endAdornment: <InputAdornment position="end">{SHOP_CURRENCY}</InputAdornment>
          }}
        />
      </Stack>
    </>
  );
}
