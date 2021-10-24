import * as React from "react";
import { useForm } from "react-hook-form";
import {
  ModalStep,
  StepBasedModal,
} from "../../../common/components/stepBased/StepBasedModal";
import { JobNewBudgetForm } from "./JobNewBudgetForm";
import { JobNewScopeForm } from "./JobNewScopeForm";
import { JobNewSkillsForm } from "./JobNewSkillsForm";
import { JobNewTitleForm } from "./JobNewTitleForm";

export type JobNewModel = {
    name: string;
    description: string;
    category: number;
  };

interface Props {}

export function JobNewModal(props: Props) {
    const { handleSubmit, control, watch, reset } = useForm<JobNewModel>();

    
  var steps = [
    new ModalStep("Title", <JobNewTitleForm control={control} />, true),
    new ModalStep("Skills", <JobNewSkillsForm />, true),
    new ModalStep("Scope", <JobNewScopeForm />, true),
    new ModalStep("Budget", <JobNewBudgetForm />, true),
  ];

  return (
    <StepBasedModal steps={steps} onSave={() => window.console.log("save")} />
  );
}
