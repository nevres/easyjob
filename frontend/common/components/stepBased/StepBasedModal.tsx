import { Box, Button, Modal } from "@mui/material";
import * as React from "react";
import useI18n from "../../i18n/useI18n";
import { Stepper } from "./Stepper";
import { StepperActionButtons } from "./StepperActionButtons";

export class ModalStep {
  label: string;
  hideLabel: boolean;
  body: JSX.Element;

  constructor(label: string, body: JSX.Element, hideLabel: boolean = false) {
    this.label = label;
    this.body = body;
    this.hideLabel = hideLabel;
  }
}

interface Props {
  activeStep: number;
  steps: Array<ModalStep>;
  lastStepLabel: string;
  onStepChange: (activeStep: number) => void;
}

export function StepBasedModal(props: Props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const t = useI18n();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style as any}>
        <Stepper activeStep={props.activeStep} steps={props.steps} />
        <div style={{ padding: "10px 0px" }}>
          {props.activeStep < props.steps.length ? props.steps[props.activeStep].body : null}
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleClose} variant="outlined" style={{ marginRight: "5px" }}>
            {t("close")}
          </Button>
          <StepperActionButtons
            activeStep={props.activeStep}
            onStepChange={props.onStepChange}
            numberOfSteps={props.steps.length}
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
