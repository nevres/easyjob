import { useMemo, useState } from "react";
import { ActiveStepModel, StepModel } from "../../components/stepBased/Step";

export function useSteps<T>(getSteps: () => Array<StepModel<T>>) {
  const steps = useMemo(() => getSteps(), []);
  const [activeStep, setActiveStep] = useState<ActiveStepModel<T>>(getActiveStepByIndex(0, steps));

  const setPreviousActiveStep = () => {
    const previousIndex = activeStep.index - 1;
    if (previousIndex < 0) return;

    setActiveStep(getActiveStepByIndex(previousIndex, steps));
  };

  const setNextActiveStep = () => {
    const nextIndex = activeStep.index + 1;
    if (nextIndex === steps.length) return;

    setActiveStep(getActiveStepByIndex(nextIndex, steps));
  };

  const isFirstStep = activeStep.index === 0;
  const isLastStep = activeStep.index === steps.length - 1;
  return { activeStep, setPreviousActiveStep, setNextActiveStep, steps, isFirstStep, isLastStep };
}

function getActiveStepByIndex<T>(index: number, steps: Array<StepModel<T>>): ActiveStepModel<T> {
  if (index < 0 || index >= steps.length) throw new Error("index of the range - getActiveStepByIndex");
  return { stepId: steps[index].stepId, index: index, renderBody: steps[index].renderBody };
}
