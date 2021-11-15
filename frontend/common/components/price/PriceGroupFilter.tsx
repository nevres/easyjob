import { Control } from "react-hook-form";
import React from "react";
import PriceAmountGroup from "./PriceAmountGroup";
import PriceTypeCheckboxes from "./PriceTypeCheckboxes";
import { PriceModel } from "../../../api/Models/PriceTypeModel";

interface Props<T extends { price: PriceModel }> {
  control: Control<T, object>;
}

export default function PriceGroupFilter<T extends { price: PriceModel }>(props: Props<T>) {
  return (
    <>
      <PriceTypeCheckboxes control={props.control} />
      <PriceAmountGroup control={props.control} />
    </>
  );
}
