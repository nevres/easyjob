import { Button, ButtonGroup } from "@mui/material";
import * as React from "react";
import useI18n from "../../i18n/useI18n";
import { ActiveStepModel } from "./Step";

interface Props<T> {
  activeStep: ActiveStepModel<T>;
  setPreviousActiveStep: () => void;
  setNextActiveStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  lastStepLabel: string;
  hideBackButton?: boolean;
}

export function StepperActionButtons<T>(props: Props<T>) {
  const t = useI18n();

  return (
    <ButtonGroup size="small">
      {!props.hideBackButton && (
        <Button
          onClick={props.setPreviousActiveStep}
          variant="contained"
          disabled={props.isFirstStep}
          style={{ marginRight: "5px" }}
        >
          {t("back")}
        </Button>
      )}
      <Button onClick={props.setNextActiveStep} variant="contained" style={{ marginLeft: "5px" }}>
        {props.isLastStep ? props.lastStepLabel : t("next")}
      </Button>
    </ButtonGroup>
  );
}
