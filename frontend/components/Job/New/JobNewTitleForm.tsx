import { Stack } from "@mui/material";
import * as React from "react";
import { Control } from "react-hook-form";
import { CategoriesSelect } from "../../../common/components/CategoriesSelect";
import useI18n from "../../../common/i18n/useI18n";
import TextFieldElement from "../../../common/react-hook-mui/TextFieldElement";
import { JobNewModel } from "./JobNewModal";

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
        label={t("name")}
        fullWidth
      />
     <CategoriesSelect control={props.control} name="category" />
     <TextFieldElement
        control={props.control}
        name={"description"}
        id="outlined"
        label={t("description")}
        multiline
        rows={3}
        fullWidth
      />
    </Stack>
  );
}
