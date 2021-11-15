import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSteps } from "../../../../common/customHooks/stepper/useSteps";
import { useYupValidationResolver } from "../../../../common/utils/yupValidationHelper";
import { GetJobNewSteps, GetJobNewValidationSchemas, JobNewModel } from "../helper/JobNewHelper";

export function useJobNew() {
  const [schemaContext, setSchemaContext] = useState({ validationSchemaId: 0 });

  const { handleSubmit, control } = useForm<JobNewModel>({
    context: schemaContext,
    mode: "onBlur",
    resolver: useYupValidationResolver(GetJobNewValidationSchemas())
  });

  const { activeStep, setPreviousActiveStep, setNextActiveStep, steps, isFirstStep, isLastStep } = useSteps(() =>
    GetJobNewSteps(control)
  );

  const handleSetNextActiveStep = () => {
    handleSubmit(() => {
      if (isLastStep) {
        window.console.log("Save");
        return;
      }
      setNextActiveStep();
    }, undefined)();
  };

  useEffect(() => {
    setSchemaContext({ validationSchemaId: activeStep.index });
  }, [activeStep]);

  return {
    activeStep,
    steps,
    setPreviousActiveStep,
    setNextActiveStep: handleSetNextActiveStep,
    isFirstStep,
    isLastStep
  };
}
