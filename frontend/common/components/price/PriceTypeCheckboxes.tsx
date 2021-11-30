import React from "react";
import { Control } from "react-hook-form";
import { Price } from "../../../api/Models/Price";
import { PriceType } from "../../../api/Models/PriceType";
import CheckboxButtonGroup, { CheckBoxOption } from "../../react-hook-mui/CheckboxButtonGroup";

export const PRICE_OPTIONS: Array<CheckBoxOption> = [
  { label: PriceType.FixedPrice, value: 0 },
  { label: PriceType.Hourly, value: 1 }
];

interface Props<T extends { price: Price }> {
  control: Control<T, object>;
}

export default function PriceTypeCheckboxes<T extends { price: Price }>(props: Props<T>) {
  return <CheckboxButtonGroup name={"price.priceType" as any} control={props.control} options={PRICE_OPTIONS} row />;
}
