import * as React from "react";
import { Control } from "react-hook-form";
import PriceGroup from "../../../common/components/price/PriceGroup";
import { JobNewModel } from "./helper/JobNewHelper";

interface Props {
  control: Control<JobNewModel, object>;
}

export function JobNewBudgetForm(props: Props) {
  return <PriceGroup control={props.control} />;
}
