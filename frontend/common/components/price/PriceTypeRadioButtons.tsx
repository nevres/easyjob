import React from "react";
import { Control } from "react-hook-form";
import { Price } from "../../../api/Models/Price";
import { PriceType } from "../../../api/Models/PriceType";
import useI18n, { TranslationFunc } from "../../i18n/useI18n";
import RadioButtonGroup from "../../react-hook-mui/RadioButtonGroup";

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
  return <RadioButtonGroup name={"price.priceType" as any} control={props.control} options={getPriceOptions(t)} row />;
}
