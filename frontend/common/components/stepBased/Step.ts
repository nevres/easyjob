export interface StepModel<T> {
  stepId: T;
  label: string;
  hideLabel: boolean;
  renderBody: () => JSX.Element;
}

export interface ActiveStepModel<T> extends Pick<StepModel<T>, "stepId" | "renderBody"> {
  index: number;
}
