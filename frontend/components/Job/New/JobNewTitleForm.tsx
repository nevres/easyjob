import { Box, Grid } from "@mui/material";
import * as React from "react";
import { Control } from "react-hook-form";
import { CategoriesSelect } from "../../../common/components/CategoriesSelect";
import useI18n from "../../../common/i18n/useI18n";
import TextFieldElement from "../../../common/react-hook-mui/TextFieldElement";
import { JobNewModel } from "./helper/JobNewHelper";
import { JobNewFormLayout } from "./JobNewFormLayout";

interface Props {
  control: Control<JobNewModel, object>;
}

export function JobNewTitleForm(props: Props) {
  const t = useI18n();
  return (
    <JobNewFormLayout title={t("jobBasicInfo")}>
      <Box>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <TextFieldElement
              control={props.control}
              name={"name"}
              id="outlined"
              label={t("chooseNameForYourJob")}
              placeholder={t("jobTitleExample")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CategoriesSelect control={props.control} name="category" disableMultiselect />
          </Grid>
        </Grid>
      </Box>
      <TextFieldElement
        control={props.control}
        name={"description"}
        id="outlined"
        label={t("jobDescriptionLabel")}
        placeholder={t("jobDescription")}
        multiline
        rows={4}
        fullWidth
      />
    </JobNewFormLayout>
  );
}
