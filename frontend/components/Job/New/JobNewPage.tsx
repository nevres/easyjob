import React from "react";
import { StepperActionButtons } from "../../../common/components/stepBased/StepperActionButtons";
import useI18n from "../../../common/i18n/useI18n";
import { Stepper } from "../../../common/components/stepBased/Stepper";
import { useJobNew } from "./hooks/useJobNew";
import { Box } from "@mui/material";

export default function JobNewPage() {
  const { activeStep, steps, setPreviousActiveStep, setNextActiveStep, isFirstStep, isLastStep } = useJobNew();

  const t = useI18n();

  return (
    <Box>
      <Stepper activeStep={activeStep} steps={steps} />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <StepperActionButtons
          activeStep={activeStep}
          setPreviousActiveStep={setPreviousActiveStep}
          setNextActiveStep={setNextActiveStep}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          lastStepLabel={t("save")}
        />
      </div>
    </Box>
  );
}
