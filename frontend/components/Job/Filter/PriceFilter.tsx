import CheckboxButtonGroup, {
  CheckBoxOption,
} from "../../../common/react-hook-mui/CheckboxButtonGroup";
import { Control, FieldPath } from "react-hook-form";
import { PriceType } from "../../../api/Models/PriceType";
import { JobFilterModel } from "./Filter";
import React from "react";
import { SHOP_CURRENCY } from "../../../domain/constants";
import InputAdornment from "@mui/material/InputAdornment";
import TextFieldElement from "../../../common/react-hook-mui/TextFieldElement";
import Stack from "@mui/material/Stack";
import useI18n from "../../../common/i18n/useI18n";

interface PriceFilterProps {
  control: Control<JobFilterModel, object>;
}

export default function PriceFilter(props: PriceFilterProps) {
  let t = useI18n();

  const priceOptions: Array<CheckBoxOption> = [
    { label: PriceType.FixedPrice, value: 0 },
    { label: PriceType.Hourly, value: 1 },
  ];
  return (
    <>
      <CheckboxButtonGroup
        name={"price.type"}
        control={props.control}
        options={priceOptions}
        row
      />
      <Stack direction="row" spacing={2}>
        <TextFieldElement
          control={props.control}
          name={"price.minAmount"}
          id="outlined-search"
          type="number"
          placeholder={t("min")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{SHOP_CURRENCY}</InputAdornment>
            ),
          }}
        />
        <TextFieldElement
          control={props.control}
          name={"price.maxAmount"}
          id="outlined-search"
          type="number"
          placeholder={t("max")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{SHOP_CURRENCY}</InputAdornment>
            ),
          }}
        />
      </Stack>
    </>
  );
}
