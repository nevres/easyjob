import React from "react";
import { Control } from "react-hook-form";
import * as yup from "yup";
import { Address } from "../../../../apis/jobProcessingApi/Models/Address";
import { Price } from "../../../../apis/jobProcessingApi/Models/Price";
import { PriceType } from "../../../../apis/jobProcessingApi/Models/PriceType";
import { StepModel } from "../../../../common/components/stepBased/Step";
import { TranslationFunc } from "../../../../common/i18n/useI18n";
import { SelectItem } from "../../../../common/react-hook-mui/MultiSelectElement";
import { JobNewAddressForm } from "../JobNewAddress";
import { JobNewBudgetForm } from "../JobNewBudgetForm";
import { JobNewSkillsForm } from "../JobNewSkillsForm";
import { JobNewTitleForm } from "../JobNewTitleForm";

export enum JobNewStep {
  Title,
  Skills,
  Budget,
  Address
}

export type JobNewModel = {
  name: string;
  description: string;
  category: SelectItem;
  skills: string[];
  price: Price;
  address: Address;
};

function getTitleStepValidationSchema(t: TranslationFunc) {
  return yup.object().shape({
    name: yup.string().required(t("jobTitleIsRequired")),
    description: yup.string().required(t("jobDescriptionIsRequired")),
    category: yup.object().required(t("categoryIsRequired"))
  });
}

const SkillsStepValidationSchema = yup.object();

function getAddressStepValidationSchema(t: TranslationFunc) {
  return yup.object({
    address: yup.object().shape({
      city: yup.string().required(t("addressCityIsRequired")),
      country: yup.string().required(t("addressCountryIsRequired")),
      addressLine: yup.string().required(t("addressStreetIsRequired")),
      zip: yup.string().required(t("addressZipIsRequired"))
    })
  });
}

function getBudgetStepValidationSchema(t: TranslationFunc) {
  return yup.object({
    price: yup.object().shape({
      type: yup.mixed<PriceType>().oneOf(Object.values(PriceType)),
      minPrice: yup.number().typeError(t("minPriceIsRequired")).required(t("minPriceIsRequired")),
      maxPrice: yup.number().typeError(t("maxPriceIsRequired")).required(t("maxPriceIsRequired"))
    })
  });
}

export function GetJobNewValidationSchemas(t: TranslationFunc) {
  return [
    getTitleStepValidationSchema(t),
    SkillsStepValidationSchema,
    getAddressStepValidationSchema(t),
    getBudgetStepValidationSchema(t)
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
