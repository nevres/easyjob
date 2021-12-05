import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PriceType } from "../../../../apis/jobProcessingApi/Models/PriceType";
import { useJobApi } from "../../../../common/customHooks/api/useJobApi";
import { useSteps } from "../../../../common/customHooks/stepper/useSteps";
import useI18n from "../../../../common/i18n/useI18n";
import { useYupValidationResolver } from "../../../../common/utils/yupValidationHelper";
import { SHOP_CURRENCY } from "../../../../domain/constants";
import { GetJobNewSteps, GetJobNewValidationSchemas, JobNewModel } from "../helper/JobNewHelper";

export function useJobNew(onSubmit?: () => void) {
  const [schemaContext, setSchemaContext] = useState({ validationSchemaId: 0 });
  const jobApi = useJobApi();
  const t = useI18n();

  const { handleSubmit, control } = useForm<JobNewModel>({
    context: schemaContext,
    mode: "onBlur",
    resolver: useYupValidationResolver(GetJobNewValidationSchemas(t)),
    defaultValues: {
      price: {
        priceType: PriceType.FixedPrice
      }
    }
  });

  const { activeStep, setPreviousActiveStep, setNextActiveStep, steps, isFirstStep, isLastStep } = useSteps(() =>
    GetJobNewSteps(control)
  );

  const handleSetNextActiveStep = () => {
    handleSubmit(async (data) => {
      if (isLastStep) {
        await jobApi.createJob(
          data.name,
          data.description,
          data.description,
          undefined,
          undefined,
          undefined,
          data.address.country,
          data.address.city,
          data.address.addressLine,
          data.address.zip,
          undefined,
          SHOP_CURRENCY,
          data.price.priceType,
          data.price.minPrice,
          data.price.maxPrice,
          undefined,
          data.category.value as number
        );
        if (onSubmit) {
          onSubmit();
        }
        return;
      }
      setNextActiveStep();
    })();
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
