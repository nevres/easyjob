import { Button, ButtonGroup } from "@mui/material";
import * as React from "react";
import useI18n from "../../i18n/useI18n";

interface Props {
  activeStep: number;
  setActiveStep: (activeStep: number) => void;
  numberOfSteps: number;
  lastStep: {
    label: string;
    postAction: () => void;
  };
}

export function StepperActionButtons(props: Props) {
  const t = useI18n();
  const isFirstStep = props.activeStep === 0;
  const isLastStep = props.activeStep === props.numberOfSteps - 1;

  return (
    <ButtonGroup size="small">
      <Button
        onClick={() => props.setActiveStep(props.activeStep - 1)}
        variant="contained"
        disabled={isFirstStep}
        style={{ marginRight: "5px" }}
      >
        {t("back")}
      </Button>
      {isLastStep ? (
        <Button
          onClick={props.lastStep.postAction}
          variant="contained"
          style={{ marginLeft: "5px" }}
        >
          {props.lastStep.label}
        </Button>
      ) : (
        <Button
          onClick={() => props.setActiveStep(props.activeStep + 1)}
          variant="contained"
          disabled={isLastStep}
          style={{ marginLeft: "5px" }}
        >
          {t("next")}
        </Button>
      )}
    </ButtonGroup>
  );
}
