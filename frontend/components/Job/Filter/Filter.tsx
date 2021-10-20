import React from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import Box from "@mui/material/Box";
import useI18n from "../../../common/i18n/useI18n";
import TextFieldElement from "../../../common/react-hook-mui/TextFieldElement";
import InputAdornment from "@mui/material/InputAdornment";
import MultiSelectElement from "../../../common/react-hook-mui/MultiSelectElement";
import { Button, Divider, Stack, useThemeProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { JobUrgency } from "../../../api/Models/JobUrgency";
import PriceFilter from "./PriceFilter";
import { PriceType } from "../../../api/Models/PriceType";
import { CategoriesSelect } from "../../../common/components/CategoriesSelect";

export type JobFilterModel = {
  name: string;
  location: Array<string>;
  durationInHours: number;
  urgency: JobUrgency;
  price: PriceFilterModel;
  categories: Array<number>;
};

type PriceFilterModel = {
  type: PriceType;
  minAmount: number;
  maxAmount: number;
};

interface JobFilterProps {
  handleOnSubmit: (filter: JobFilterModel) => void;
}

export default function JobFilter(props: JobFilterProps) {
  const { handleSubmit, control, watch, reset } = useForm<JobFilterModel>();

  const onSubmit: SubmitHandler<JobFilterModel> = (data) => {
    window.console.log(data);
    props.handleOnSubmit(data);
  };

  const t = useI18n();

  return (
    <Stack spacing={2}>
      <TextFieldElement
        control={control}
        name={"name"}
        id="outlined-search"
        label={t("name")}
        type="search"
        fullWidth
      />
      <TextFieldElement
        control={control}
        name={"durationInHours"}
        id="outlined-search"
        label={t("durationInHours")}
        type="number"
        placeholder=""
        fullWidth
        InputProps={{
          endAdornment: <InputAdornment position="end">{t("hoursShort")}</InputAdornment>
        }}
      />
      <Divider />
      <MultiSelectElement
        name="location"
        menuItems={[{ value: 1, label: "Bosnia" }]}
        control={control}
        showChips
        fullWidth
        label={t("location")}
      />
      <Divider />
      <PriceFilter control={control} />
      <CategoriesSelect control={control} name="categories" />
      <Stack spacing={2} direction={"row"} justifyContent="center">
        <Button variant="contained" endIcon={<SearchIcon />} onClick={handleSubmit(onSubmit)}>
          {t("search")}
        </Button>
        <Button variant="outlined" endIcon={<ClearIcon />} onClick={() => reset()}>
          {t("clear")}
        </Button>
      </Stack>
    </Stack>
  );
}
