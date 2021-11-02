import * as React from "react";
import { useForm } from "react-hook-form";
import { StepBasedModal } from "../../../common/components/stepBased/StepBasedModal";
import { useState } from "react";
import { useYupValidationResolver } from "../../../common/utils/yupValidationHelper";
import { GetJobNewSteps, GetJobNewValidationSchemas, JobNewModel } from "./helper/JobNewHelper";
import useI18n from "../../../common/i18n/useI18n";

interface Props {}

export function JobNewModal(props: Props) {
  const [schemaContext, setSchemaContext] = useState({ validationSchemaId: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const { handleSubmit, control } = useForm<JobNewModel>({
    context: schemaContext,
    mode: "onBlur",
    resolver: useYupValidationResolver(GetJobNewValidationSchemas())
  });

  const t = useI18n();
  const steps = GetJobNewSteps(control);

  const handleStepChange = (newActiveStep: number) => {
    handleSubmit(() => {
      if (newActiveStep === steps.length) {
        window.console.log("fefefef");
        return;
      }
      setActiveStep(newActiveStep);
      setSchemaContext({ validationSchemaId: newActiveStep });
    }, undefined)();
  };

  return (
    <StepBasedModal activeStep={activeStep} steps={steps} onStepChange={handleStepChange} lastStepLabel={t("save")} />
  );
}
