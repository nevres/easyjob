import { Control } from "react-hook-form";
import React from "react";
import CheckboxButtonGroup, { CheckBoxOption } from "../../react-hook-mui/CheckboxButtonGroup";
import { PriceType } from "../../../api/Models/PriceType";
import { PriceTypeModel } from "../../../api/Models/PriceTypeModel";

export const PRICE_OPTIONS: Array<CheckBoxOption> = [
  { label: PriceType.FixedPrice, value: 0 },
  { label: PriceType.Hourly, value: 1 }
];

interface Props<T extends { price: PriceTypeModel }> {
  control: Control<T, object>;
}

export default function PriceTypeCheckboxes<T extends { price: PriceTypeModel }>(props: Props<T>) {
  return <CheckboxButtonGroup name={"price.type" as any} control={props.control} options={PRICE_OPTIONS} row />;
}
