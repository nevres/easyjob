import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Control, FieldPath } from "react-hook-form";
import { CategoryResponse } from "../../apis/jobProcessingApi/Models/CategoryResponse";
import { JobDurationType } from "../../apis/jobProcessingApi/Models/JobDurationType";
import { JobFilterModel } from "../../components/Job/Filter/Filter";
import { getJobDurationTypeTranslation } from "../../domain/job/jobHelper";
import { useJobApi } from "../customHooks/api/useJobApi";
import useI18n from "../i18n/useI18n";
import MultiSelectElement, { SelectItem } from "../react-hook-mui/MultiSelectElement";

export type JobDurationSelectProps<T> = {
  name: FieldPath<T>;
  control: Control<T, object>;
};

export function JobDurationSelect<T>(props: JobDurationSelectProps<T>) {
  const t = useI18n();

  const jobDurationOptions: Array<SelectItem> = [
    { label: getJobDurationTypeTranslation(JobDurationType.LessThanADay, t), value: JobDurationType.LessThanADay },
    { label: getJobDurationTypeTranslation(JobDurationType.LessThanAWeek, t), value: JobDurationType.LessThanAWeek },
    { label: getJobDurationTypeTranslation(JobDurationType.LessThanAMonth, t), value: JobDurationType.LessThanAMonth },
    { label: getJobDurationTypeTranslation(JobDurationType.OneToSixMonths, t), value: JobDurationType.OneToSixMonths },
    {
      label: getJobDurationTypeTranslation(JobDurationType.MoreThanSixMonths, t),
      value: JobDurationType.MoreThanSixMonths
    }
  ];

  return (
    <MultiSelectElement
      control={props.control}
      name={props.name}
      menuItems={jobDurationOptions}
      label={t("jobDuration")}
    />
  );
}
