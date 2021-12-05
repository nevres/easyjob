import * as React from "react";
import { Control } from "react-hook-form";
import PriceGroup from "../../../common/components/price/PriceGroup";
import useI18n from "../../../common/i18n/useI18n";
import { JobNewModel } from "./helper/JobNewHelper";
import { JobNewFormLayout } from "./JobNewFormLayout";

interface Props {
  control: Control<JobNewModel, object>;
}

export function JobNewBudgetForm(props: Props) {
  const t = useI18n();
  return (
    <JobNewFormLayout title={t("howDoYouWantToPay")}>
      <PriceGroup control={props.control} />
    </JobNewFormLayout>
  );
}
