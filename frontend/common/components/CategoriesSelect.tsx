import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Control, FieldPath } from "react-hook-form";
import { CategoryResponse } from "../../api/Models/CategoryResponse";
import { JobFilterModel } from "../../components/Job/Filter/Filter";
import { useJobApi } from "../customHooks/api/useJobApi";
import useI18n from "../i18n/useI18n";
import MultiSelectElement, { SelectItem } from "../react-hook-mui/MultiSelectElement";

export type CategoriesSelectProps<T> = {
  name: FieldPath<T>;
  control: Control<T, object>;
};

export function CategoriesSelect<T>(props: CategoriesSelectProps<T>) {
  const jobApi = useJobApi();
  const t = useI18n();

  let categoriesPromise = useAsync<CategoryResponse[]>(async () => await jobApi.getJobCategories(), []);

  type CategoriesPromiseType = typeof categoriesPromise;

  const categoryMenuItems = useMemo((): Array<SelectItem> => {
    if (!categoriesPromise?.result) return [];
    return categoriesPromise.result.map((x) => ({ value: x.id, label: x.categoryName } as SelectItem));
  }, [categoriesPromise]);

  return (
    <MultiSelectElement control={props.control} name={props.name} menuItems={categoryMenuItems} label={t("category")} />
  );
}
