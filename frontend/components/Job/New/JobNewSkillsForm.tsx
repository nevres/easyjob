import { Stack } from "@mui/material";
import * as React from "react";
import { Control } from "react-hook-form";
import useI18n from "../../../common/i18n/useI18n";
import { TagsInput } from "../../../common/components/TagsInput";
import { JobNewModel } from "./helper/JobNewHelper";

interface Props {
  control: Control<JobNewModel, object>;
}

export function JobNewSkillsForm(props: Props) {
  const t = useI18n();

  return (
    <Stack spacing={2}>
      <TagsInput control={props.control} name={"skills"} placeholder={t("jobSkills")} />
    </Stack>
  );
}
