import { useForm, SubmitHandler } from "react-hook-form";
import useI18n from "../../../common/i18n/useI18n";
import TextFieldElement from "../../../common/react-hook-mui/TextFieldElement";
import { Button, Divider, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { JobUrgency } from "../../../api/Models/JobUrgency";
import { CategoriesSelect } from "../../../common/components/CategoriesSelect";
import { JobDurationType } from "../../../api/Models/JobDurationType";
import { JobDurationSelect } from "../../../common/components/JobDurationSelect";
import { LocationSelect } from "../../../common/components/LocationSelect";
import PriceGroupFilter from "../../../common/components/price/PriceGroupFilter";
import { Price } from "../../../api/Models/Price";
import { SelectItem } from "../../../common/react-hook-mui/MultiSelectElement";

export type JobFilterModel = {
  name: string;
  location: string;
  durationInHours: number;
  urgency: JobUrgency;
  price: Price;
  categories: Array<SelectItem>;
  jobDurationType?: JobDurationType;
};

interface JobFilterProps {
  handleOnSubmit: (filter: JobFilterModel) => void;
}

export default function JobFilter(props: JobFilterProps) {
  const { handleSubmit, control, watch, reset } = useForm<JobFilterModel>({ defaultValues: { categories: [] } });

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
      <JobDurationSelect control={control} name={"jobDurationType"} />
      <Divider />
      <LocationSelect name="location" control={control} />
      <Divider />
      <PriceGroupFilter control={control} />
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
