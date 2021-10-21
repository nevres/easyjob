import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import * as React from "react";
import { useState } from "react";
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
  steps: Array<ModalStep>;
  onSave: () => void;
}

export function StepBasedModal(props: Props) {
  const [activeStep, setActiveStep] = useState(0);
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
        <Stepper activeStep={activeStep} steps={props.steps} />
        <div style={{ padding: "10px 0px" }}>
          {activeStep < props.steps.length
            ? props.steps[activeStep].body
            : null}
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <StepperActionButtons
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            numberOfSteps={props.steps.length}
            lastStep={{
              label: t("save"),
              postAction: props.onSave,
            }}
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
  p: 2,
};
