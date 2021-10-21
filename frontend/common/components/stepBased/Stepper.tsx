import { Step, StepLabel, Stepper as MuiStepper } from "@mui/material";

export class StepModel {
    label: string;
    hideLabel: boolean;

    constructor(label: string, hideLabel: boolean = false) {
        this.label = label;
        this.hideLabel = hideLabel
    }
}

interface Props {
    activeStep: number;
    steps: StepModel[];
}

export function Stepper(props: Props) {
    return <MuiStepper activeStep={props.activeStep} alternativeLabel>
        {props.steps.map((step, index) =>
            <Step id={index.toString()} key={index}>
                <StepLabel >{step.hideLabel ? "" : step.label}</StepLabel>
            </Step>
        )}
    </MuiStepper>;
}