import { Box, Step, StepLabel, Stepper as MuiStepper } from "@mui/material";
import React from "react";
import { ActiveStepModel, StepModel } from "./Step";

interface Props<T> {
  activeStep: ActiveStepModel<T>;
  steps: Array<StepModel<T>>;
}

export function Stepper<T>(props: Props<T>) {
  return (
    <Box>
      <MuiStepper activeStep={props.activeStep.index} alternativeLabel>
        {props.steps.map((step, index) => (
          <Step id={index.toString()} key={index}>
            <StepLabel>{step.hideLabel ? "" : step.label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
      <Box padding={2}>{props.activeStep.renderBody()}</Box>
    </Box>
  );
}
