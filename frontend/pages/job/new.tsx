import React from "react";
import { Box } from "@mui/material";
import { StepperActionButtons } from "../../common/components/stepBased/StepperActionButtons";
import { Stepper } from "../../common/components/stepBased/Stepper";
import useI18n from "../../common/i18n/useI18n";
import { NextPage } from "next";
import Layout from "../../layouts/Layout";
import { useJobNew } from "../../components/Job/New/hooks/useJobNew";
import Router from "next/router";
import "../../common/i18n/i18next";

const JobNewPage: NextPage = () => {
  const onNewJobCreation = () => {
    Router.push("/");
  };

  const { activeStep, steps, setPreviousActiveStep, setNextActiveStep, isFirstStep, isLastStep } =
    useJobNew(onNewJobCreation);

  const t = useI18n();

  return (
    <Layout>
      <Box>
        <Stepper activeStep={activeStep} steps={steps} />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <StepperActionButtons
            activeStep={activeStep}
            setPreviousActiveStep={setPreviousActiveStep}
            setNextActiveStep={setNextActiveStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            lastStepLabel={t("save")}
          />
        </div>
      </Box>
    </Layout>
  );
};

export default JobNewPage;
