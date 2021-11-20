import { Box, Button, Modal } from "@mui/material";
import * as React from "react";
import useI18n from "../../i18n/useI18n";
import { ActiveStepModel, StepModel } from "./Step";
import { Stepper } from "./Stepper";
import { StepperActionButtons } from "./StepperActionButtons";

interface Props<T> {
  activeStep: ActiveStepModel<T>;
  steps: Array<StepModel<T>>;
  setPreviousActiveStep: () => void;
  setNextActiveStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  lastStepLabel: string;
  style?: React.CSSProperties;
}

export function StepBasedModal<T>(props: Props<T>) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const t = useI18n();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={props.style}
    >
      <Box sx={style as any}>
        <Stepper activeStep={props.activeStep} steps={props.steps} />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleClose} variant="outlined" style={{ marginRight: "5px" }}>
            {t("close")}
          </Button>
          <StepperActionButtons
            activeStep={props.activeStep}
            setPreviousActiveStep={props.setPreviousActiveStep}
            setNextActiveStep={props.setNextActiveStep}
            isFirstStep={props.isFirstStep}
            isLastStep={props.isLastStep}
            lastStepLabel={props.lastStepLabel}
          />
        </div>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 2
};
