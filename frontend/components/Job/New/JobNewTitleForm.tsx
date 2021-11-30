import { Stack } from "@mui/material";
import * as React from "react";
import { Control } from "react-hook-form";
import { CategoriesSelect } from "../../../common/components/CategoriesSelect";
import useI18n from "../../../common/i18n/useI18n";
import TextFieldElement from "../../../common/react-hook-mui/TextFieldElement";
import { JobNewModel } from "./helper/JobNewHelper";

interface Props {
  control: Control<JobNewModel, object>;
}

export function JobNewTitleForm(props: Props) {
  const t = useI18n();
  return (
    <Stack spacing={2}>
      <TextFieldElement
        control={props.control}
        name={"name"}
        id="outlined"
        label={t("chooseNameForYourJob")}
        placeholder={t("jobTitleExample")}
        fullWidth
      />
      <CategoriesSelect control={props.control} name="category" />
      <TextFieldElement
        control={props.control}
        name={"description"}
        id="outlined"
        label={t("jobDescriptionLabel")}
        placeholder={t("jobDescription")}
        multiline
        rows={3}
        fullWidth
      />
    </Stack>
  );
}
