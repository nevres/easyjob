import * as React from "react";
import { StepBasedModal } from "../../../common/components/stepBased/StepBasedModal";
import useI18n from "../../../common/i18n/useI18n";
import { useJobNew } from "./hooks/useJobNew";

interface Props {}

export function JobNewModal(props: Props) {
  const t = useI18n();
  const { activeStep, steps, setPreviousActiveStep, setNextActiveStep, isFirstStep, isLastStep } = useJobNew();

  return (
    <StepBasedModal
      activeStep={activeStep}
      steps={steps}
      setPreviousActiveStep={setPreviousActiveStep}
      setNextActiveStep={setNextActiveStep}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      lastStepLabel={t("save")}
      style={{ minHeight: "400px", minWidth: "400px" }}
    />
  );
}
