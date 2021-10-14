import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import useI18n from "../../common/i18n/useI18n";
import TextFieldElement from "../../common/react-hook-mui/TextFieldElement";
import InputAdornment from "@mui/material/InputAdornment";
import MultiSelectElement from "../../common/react-hook-mui/SelectElement";
import { Button, Stack, useThemeProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { JobUrgency } from "../../api/Models/JobUrgency";

export interface JobFilterModel {
  name: string;
  location: string;
  durationInHours: number;
  price: number;
  urgency: JobUrgency;
}

interface JobFilterProps {
  handleOnSubmit: (filter: JobFilterModel) => void;
}

export default function JobFilter(props: JobFilterProps) {
  const { handleSubmit, control } = useForm<JobFilterModel>();

  const onSubmit: SubmitHandler<JobFilterModel> = (data) => {
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
          endAdornment: (
            <InputAdornment position="end">{t("hoursShort")}</InputAdornment>
          ),
        }}
      />
      <MultiSelectElement
        name="location"
        menuItems={["Tuzla", "Sarajevo", "Istanbul"]}
        control={control}
        showChips
        fullWidth
        label={t("location")}
      />
      <Box textAlign="center">
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={handleSubmit(onSubmit)}
        >
          {t("search")}
        </Button>
      </Box>
    </Stack>
  );
}
