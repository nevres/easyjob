import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Control, FieldPath } from "react-hook-form";
import { CategoryResponse } from "../../api/Models/CategoryResponse";
import { useJobApi } from "../customHooks/api/useJobApi";
import useI18n from "../i18n/useI18n";
import AutocompleteElement from "../react-hook-mui/AutocompleteElement";
import { SelectItem } from "../react-hook-mui/MultiSelectElement";

export type CategoriesSelectProps<T> = {
  name: FieldPath<T>;
  control: Control<T, object>;
  disableMultiselect?: boolean;
};

export function CategoriesSelect<T>(props: CategoriesSelectProps<T>) {
  const jobApi = useJobApi();
  const t = useI18n();

  let categoriesPromise = useAsync<CategoryResponse[]>(async () => await jobApi.getJobCategories(), []);

  const categoryMenuItems = useMemo((): Array<SelectItem> => {
    if (!categoriesPromise?.result) return [];
    return categoriesPromise.result.map((x) => ({ value: x.id, label: x.categoryName } as SelectItem));
  }, [categoriesPromise]);

  return (
    <AutocompleteElement
      control={props.control}
      name={props.name}
      options={categoryMenuItems}
      label={t("category")}
      multiple={!props.disableMultiselect}
    />
    // <MultiSelectElement
    //   control={props.control}
    //   name={props.name}
    //   menuItems={categoryMenuItems}
    //   label={t("category")}
    //   multiple
    // />
  );
}
