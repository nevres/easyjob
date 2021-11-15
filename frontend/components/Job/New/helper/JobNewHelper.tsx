import * as yup from "yup";
import React from "react";
import { JobNewTitleForm } from "../JobNewTitleForm";
import { JobNewSkillsForm } from "../JobNewSkillsForm";
import { JobNewScopeForm } from "../JobNewScopeForm";
import { JobNewBudgetForm } from "../JobNewBudgetForm";
import { Control } from "react-hook-form";
import { PriceModel } from "../../../../api/Models/PriceTypeModel";
import { StepModel } from "../../../../common/components/stepBased/Step";

export enum JobNewStep {
  Title,
  Skills,
  Scope,
  Budget
}

export type JobNewModel = {
  name: string;
  description: string;
  category: number;
  skills: string[];
  price: PriceModel;
};

const TitleStepValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const SkillsStepValidationSchema = yup.object();

const ScopeStepValidationSchema = yup.object();

const BudgetStepValidationSchema = yup.object();

export function GetJobNewValidationSchemas() {
  return [TitleStepValidationSchema, SkillsStepValidationSchema, ScopeStepValidationSchema, BudgetStepValidationSchema];
}

export function GetJobNewSteps(control: Control<JobNewModel, object>): Array<StepModel<JobNewStep>> {
  return [
    {
      stepId: JobNewStep.Title,
      label: "Title",
      hideLabel: true,
      renderBody: () => <JobNewTitleForm control={control} />
    },
    {
      stepId: JobNewStep.Skills,
      label: "Skills",
      hideLabel: true,
      renderBody: () => <JobNewSkillsForm control={control} />
    },
    {
      stepId: JobNewStep.Scope,
      label: "Scope",
      hideLabel: true,
      renderBody: () => <JobNewScopeForm />
    },
    {
      stepId: JobNewStep.Budget,
      label: "Budget",
      hideLabel: true,
      renderBody: () => <JobNewBudgetForm control={control} />
    }
  ];
}
