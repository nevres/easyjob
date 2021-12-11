import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { Control, FieldPath } from "react-hook-form";
import { Address } from "../../apis/jobProcessingApi/Models/Address";
import { useJobApi } from "../customHooks/api/useJobApi";
import useI18n from "../i18n/useI18n";
import MultiSelectElement, { SelectItem } from "../react-hook-mui/MultiSelectElement";
import { distinctBy } from "../utils/arrayHelper";

export type LocationSelectProps<T> = {
  name: FieldPath<T>;
  control: Control<T, object>;
};

export function LocationSelect<T>(props: LocationSelectProps<T>) {
  const jobApi = useJobApi();
  const t = useI18n();

  let locationsPromise = useAsync<Address[]>(async () => await jobApi.getJobLocations(undefined), []);

  const locationMenuItems = useMemo((): Array<SelectItem> => {
    if (!locationsPromise?.result) return [];
    const distinctLocations = distinctBy(
      locationsPromise.result,
      "city",
      (x, y) => x?.toLowerCase() === y?.toLowerCase()
    );
    return distinctLocations.map((x) => ({ value: x.city, label: x.city } as SelectItem));
  }, [locationsPromise]);

  return (
    <MultiSelectElement control={props.control} name={props.name} menuItems={locationMenuItems} label={t("location")} />
  );
}
