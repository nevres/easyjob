import { Button, ButtonGroup } from "@mui/material";
import * as React from "react";
import useI18n from "../../i18n/useI18n";

interface Props {
  activeStep: number;
  onStepChange: (activeStep: number) => void;
  numberOfSteps: number;
  lastStepLabel: string;
}

export function StepperActionButtons(props: Props) {
  const t = useI18n();
  const isFirstStep = props.activeStep === 0;
  const isLastStep = props.activeStep === props.numberOfSteps - 1;

  return (
    <ButtonGroup size="small">
      <Button
        onClick={() => props.onStepChange(props.activeStep - 1)}
        variant="contained"
        disabled={isFirstStep}
        style={{ marginRight: "5px" }}
      >
        {t("back")}
      </Button>
      <Button
        onClick={() => props.onStepChange(props.activeStep + 1)}
        variant="contained"
        style={{ marginLeft: "5px" }}
      >
        {isLastStep ? props.lastStepLabel : t("next")}
      </Button>
    </ButtonGroup>
  );
}
