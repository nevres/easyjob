import { Control } from "react-hook-form";
import React from "react";
import PriceAmountGroup from "./PriceAmountGroup";
import PriceTypeRadioButtons from "./PriceTypeRadioButtons";
import { Price } from "../../../api/Models/Price";

interface Props<T extends { price: Price }> {
  control: Control<T, object>;
}

export default function PriceGroup<T extends { price: Price }>(props: Props<T>) {
  return (
    <>
      <PriceTypeRadioButtons control={props.control} />
      <PriceAmountGroup control={props.control} />
    </>
  );
}
