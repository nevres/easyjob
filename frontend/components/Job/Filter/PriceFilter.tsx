import CheckboxButtonGroup, { CheckBoxOption } from "../../../common/react-hook-mui/CheckboxButtonGroup";
import { Control, FieldPath } from "react-hook-form";
import { PriceType } from "../../../api/Models/PriceType";
import { JobFilterModel } from "./Filter";
import React from "react";
import { SHOP_CURRENCY } from "../../../domain/constants";
import InputAdornment from "@mui/material/InputAdornment";
import TextFieldElement from "../../../common/react-hook-mui/TextFieldElement";
import PriceGroup from "../../../common/components/PriceGroup";

interface PriceFilterProps {
  control: Control<JobFilterModel, object>;
}

export default function PriceFilter(props: PriceFilterProps) {
  return <PriceGroup control={props.control} />;
}
