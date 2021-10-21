import * as React from "react";
import {
  ModalStep,
  StepBasedModal,
} from "../../../common/components/stepBased/StepBasedModal";
import { JobNewBudgetForm } from "./JobNewBudgetForm";
import { JobNewScopeForm } from "./JobNewScopeForm";
import { JobNewSkillsForm } from "./JobNewSkillsForm";
import { JobNewTitleForm } from "./JobNewTitleForm";

interface Props {}

export function JobNewModal(props: Props) {
  var steps = [
    new ModalStep("Title", <JobNewTitleForm />, true),
    new ModalStep("Skills", <JobNewSkillsForm />, true),
    new ModalStep("Scope", <JobNewScopeForm />, true),
    new ModalStep("Budget", <JobNewBudgetForm />, true),
  ];

  return (
    <StepBasedModal steps={steps} onSave={() => window.console.log("save")} />
  );
}
