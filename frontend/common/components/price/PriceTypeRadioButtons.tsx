import { Control } from "react-hook-form";
import React from "react";
import { PriceType } from "../../../api/Models/PriceType";
import RadioButtonGroup, { RadioButtonOption } from "../../react-hook-mui/RadioButtonGroup";
import { Price } from "../../../api/Models/Price";

export const PRICE_OPTIONS: Array<RadioButtonOption<PriceType>> = [
  { label: PriceType.FixedPrice, value: PriceType.FixedPrice },
  { label: PriceType.Hourly, value: PriceType.Hourly }
];

interface Props<T extends { price: Price }> {
  control: Control<T, object>;
}

export default function PriceTypeRadioButtons<T extends { price: Price }>(props: Props<T>) {
  return <RadioButtonGroup name={"price.priceType" as any} control={props.control} options={PRICE_OPTIONS} row />;
}
