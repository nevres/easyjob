import { Control } from "react-hook-form";
import React from "react";
import PriceAmountGroup from "./PriceAmountGroup";
import { PriceModel } from "../../../api/Models/PriceTypeModel";
import PriceTypeRadioButtons from "./PriceTypeRadioButtons";

interface Props<T extends { price: PriceModel }> {
  control: Control<T, object>;
}

export default function PriceGroup<T extends { price: PriceModel }>(props: Props<T>) {
  return (
    <>
      <PriceTypeRadioButtons control={props.control} />
      <PriceAmountGroup control={props.control} />
    </>
  );
}
