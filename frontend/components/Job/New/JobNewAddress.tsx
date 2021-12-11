import { Box, Grid } from "@mui/material";
import * as React from "react";
import { Control } from "react-hook-form";
import { Address } from "../../../apis/jobProcessingApi/Models/Address";
import useI18n from "../../../common/i18n/useI18n";
import TextFieldElement from "../../../common/react-hook-mui/TextFieldElement";
import { JobNewFormLayout } from "./JobNewFormLayout";

interface Props<T extends { address: Address }> {
  control: Control<T, object>;
}

export function JobNewAddressForm<T extends { address: Address }>(props: Props<T>) {
  const t = useI18n();

  return (
    <JobNewFormLayout title={t("enterAddressOfJob")}>
      <TextFieldElement
        control={props.control}
        name={"address.addressLine" as any}
        id="outlined"
        label={t("addressLine")}
        fullWidth
      />
      <Box>
        <Grid container columnSpacing={2}>
          <Grid item xs={9} sm={9} md={9} lg={9}>
            <TextFieldElement
              control={props.control}
              name={"address.city" as any}
              id="outlined"
              label={t("city")}
              fullWidth
            />
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <TextFieldElement
              control={props.control}
              name={"address.zip" as any}
              id="outlined"
              label={t("zip")}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      <TextFieldElement
        control={props.control}
        name={"address.country" as any}
        id="outlined"
        label={t("country")}
        fullWidth
      />
    </JobNewFormLayout>
  );
}
