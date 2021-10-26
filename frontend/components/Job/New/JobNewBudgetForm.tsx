import { Stack } from "@mui/material";
import * as React from "react";
import { Control } from "react-hook-form";
import PriceGroup from "../../../common/components/PriceGroup";
import useI18n from "../../../common/i18n/useI18n";
import { JobNewModel } from "./JobNewModal";

interface Props {
  control: Control<JobNewModel, object>;
}

export function JobNewBudgetForm(props: Props) {
  const t = useI18n();

  return (
    <Stack spacing={2}>
      <PriceGroup control={props.control} />
    </Stack>
  );
}
