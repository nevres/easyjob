import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";

interface Props {
  title: string;
  additionalDescription?: string;

  children: JSX.Element[] | JSX.Element;
}

export function JobNewFormLayout(props: Props) {
  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h5">{props.title}</Typography>
        {props.additionalDescription && <Typography>{props.additionalDescription}</Typography>}
      </Box>
      <Stack spacing={2}>{props.children}</Stack>
    </Box>
  );
}
