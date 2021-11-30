import * as yup from "yup";
import React from "react";
import { JobNewTitleForm } from "../JobNewTitleForm";
import { JobNewSkillsForm } from "../JobNewSkillsForm";
import { JobNewBudgetForm } from "../JobNewBudgetForm";
import { Control } from "react-hook-form";
import { Price } from "../../../../api/Models/Price";
import { StepModel } from "../../../../common/components/stepBased/Step";
import { Address } from "../../../../api/Models/Address";
import { JobNewAddressForm } from "../JobNewAddress";
import { PriceType } from "../../../../api/Models/PriceType";

export enum JobNewStep {
  Title,
  Skills,
  Budget,
  Address
}

export type JobNewModel = {
  name: string;
  description: string;
  category: number;
  skills: string[];
  price: Price;
  address: Address;
};

const TitleStepValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const SkillsStepValidationSchema = yup.object();

const AddressStepValidationSchema = yup.object({
  address: yup.object().shape({
    city: yup.string().required(),
    country: yup.string().required(),
    addressLine: yup.string().required(),
    zip: yup.string().required()
  })
});

const BudgetStepValidationSchema = yup.object({
  price: yup.object().shape({
    type: yup.mixed<PriceType>().oneOf(Object.values(PriceType)),
    minAmount: yup.number().required(),
    maxAmount: yup.number().required()
  })
});

export function GetJobNewValidationSchemas() {
  return [
    TitleStepValidationSchema,
    SkillsStepValidationSchema,
    AddressStepValidationSchema,
    BudgetStepValidationSchema
  ];
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
      stepId: JobNewStep.Address,
      label: "Address",
      hideLabel: true,
      renderBody: () => <JobNewAddressForm control={control} />
    },
    {
      stepId: JobNewStep.Budget,
      label: "Budget",
      hideLabel: true,
      renderBody: () => <JobNewBudgetForm control={control} />
    }
  ];
}
