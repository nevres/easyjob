import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import React from "react";
import { Control } from "react-hook-form";
import { SHOP_CURRENCY } from "../../../domain/constants";
import useI18n from "../../i18n/useI18n";
import TextFieldElement from "../../react-hook-mui/TextFieldElement";

export type PriceAmountModel = {
  minPrice: number;
  maxPrice: number;
};

interface Props<T extends { price: PriceAmountModel }> {
  control: Control<T, object>;
}

export default function PriceAmountGroup<T extends { price: PriceAmountModel }>(props: Props<T>) {
  let t = useI18n();

  return (
    <Stack direction="row" spacing={2}>
      <TextFieldElement
        control={props.control}
        name={"price.minPrice" as any}
        id="outlined-search"
        type="number"
        placeholder={t("min")}
        InputProps={{
          endAdornment: <InputAdornment position="end">{SHOP_CURRENCY}</InputAdornment>
        }}
      />
      <TextFieldElement
        control={props.control}
        name={"price.maxPrice" as any}
        id="outlined-search"
        type="number"
        placeholder={t("max")}
        InputProps={{
          endAdornment: <InputAdornment position="end">{SHOP_CURRENCY}</InputAdornment>
        }}
      />
    </Stack>
  );
}
