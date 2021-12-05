import { Grid, Stack } from "@mui/material";
import * as React from "react";
import { Control } from "react-hook-form";
import useI18n from "../../../common/i18n/useI18n";
import TextFieldElement from "../../../common/react-hook-mui/TextFieldElement";
import { Address } from "../../../apis/jobProcessingApi/Models/Address";

interface Props<T extends { address: Address }> {
  control: Control<T, object>;
}

export function JobNewAddressForm<T extends { address: Address }>(props: Props<T>) {
  const t = useI18n();

  return (
    <Stack spacing={2}>
      <TextFieldElement
        control={props.control}
        name={"address.addressLine" as any}
        id="outlined"
        label={t("addressLine")}
        fullWidth
      />
      <Grid container style={{ justifyContent: "space-between" }}>
        <Grid item xs={8} sm={8} md={8} lg={8}>
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
      <TextFieldElement
        control={props.control}
        name={"address.country" as any}
        id="outlined"
        label={t("country")}
        fullWidth
      />
    </Stack>
  );
}
