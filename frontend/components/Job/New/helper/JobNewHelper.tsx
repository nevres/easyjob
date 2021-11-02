import { PriceModel } from "../../../../common/components/PriceGroup";
import * as yup from "yup";
import { ModalStep } from "../../../../common/components/stepBased/StepBasedModal";
import React from "react";
import { JobNewTitleForm } from "../JobNewTitleForm";
import { JobNewSkillsForm } from "../JobNewSkillsForm";
import { JobNewScopeForm } from "../JobNewScopeForm";
import { JobNewBudgetForm } from "../JobNewBudgetForm";
import { Control } from "react-hook-form";

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

export function GetJobNewSteps(control: Control<JobNewModel, object>) {
  return [
    new ModalStep("Title", <JobNewTitleForm control={control} />, true),
    new ModalStep("Skills", <JobNewSkillsForm control={control} />, true),
    new ModalStep("Scope", <JobNewScopeForm />, true),
    new ModalStep("Budget", <JobNewBudgetForm control={control} />, true)
  ];
}
