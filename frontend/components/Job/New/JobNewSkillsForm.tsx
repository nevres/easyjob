import * as React from "react";
import { Control } from "react-hook-form";
import { TagsInput } from "../../../common/components/TagsInput";
import useI18n from "../../../common/i18n/useI18n";
import { JobNewModel } from "./helper/JobNewHelper";
import { JobNewFormLayout } from "./JobNewFormLayout";

interface Props {
  control: Control<JobNewModel, object>;
}

export function JobNewSkillsForm(props: Props) {
  const t = useI18n();

  return (
    <JobNewFormLayout title={t("whichSkillsAreNeeded")} additionalDescription={t("addSkillsWhichAreNeededToFinishJob")}>
      <TagsInput control={props.control} name={"skills"} label={t("jobSkills")} placeholder={t("jobSkills")} />
    </JobNewFormLayout>
  );
}
