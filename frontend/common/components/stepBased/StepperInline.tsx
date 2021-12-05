import { Box } from "@mui/material";
import React from "react";
import { FullWidthDivider } from "../../../components/FullWidthDivider";
import { StepModel } from "./Step";

interface Props<T> {
  currentStepIndex: number;
  steps: Array<StepModel<T>>;
}

export function StepperInline<T>(props: Props<T>) {
  return (
    <Box>
      {props.steps.map((step, index) => {
        if (index > props.currentStepIndex) return null;

        return (
          <Box key={index}>
            {step.renderBody()}
            <FullWidthDivider />
          </Box>
        );
      })}
    </Box>
  );
}
