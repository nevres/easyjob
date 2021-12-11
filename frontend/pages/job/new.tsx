import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import Router from "next/router";
import React from "react";
import { StepperActionButtons } from "../../common/components/stepBased/StepperActionButtons";
import { StepperInline } from "../../common/components/stepBased/StepperInline";
import "../../common/i18n/i18next";
import useI18n from "../../common/i18n/useI18n";
import { useJobNew } from "../../components/Job/New/hooks/useJobNew";
import Layout, { smallerPageContentWrapper } from "../../layouts/Layout";

const JobNewPage: NextPage = () => {
  const t = useI18n();

  const { activeStep, steps, setPreviousActiveStep, setNextActiveStep, isFirstStep, isLastStep } =
    useJobNew(onNewJobCreation);

  return (
    <Layout>
      <Box sx={smallerPageContentWrapper}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {t("createNewJobTitle")}
        </Typography>
        <Typography sx={{ textAlign: "center" }}>{t("createNewJobDescription")}</Typography>
        <Box mt={3}>
          <StepperInline currentStepIndex={activeStep.index} steps={steps} />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <StepperActionButtons
              activeStep={activeStep}
              setPreviousActiveStep={setPreviousActiveStep}
              setNextActiveStep={setNextActiveStep}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              hideBackButton
              lastStepLabel={t("save")}
            />
          </div>
        </Box>
      </Box>
    </Layout>
  );

  function onNewJobCreation() {
    Router.push("/");
  }
};

export default JobNewPage;
