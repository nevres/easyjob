import { Control } from "react-hook-form";
import React from "react";
import PriceAmountGroup from "./PriceAmountGroup";
import PriceTypeCheckboxes from "./PriceTypeCheckboxes";
import { Price } from "../../../apis/jobProcessingApi/Models/Price";

interface Props<T extends { price: Price }> {
  control: Control<T, object>;
}

export default function PriceGroupFilter<T extends { price: Price }>(props: Props<T>) {
  return (
    <>
      <PriceTypeCheckboxes control={props.control} />
      <PriceAmountGroup control={props.control} />
    </>
  );
}
