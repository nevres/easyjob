import { createContext } from "react";

export type SnackbarProviderValue = {
  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [actionLabel] label for the action button
   * @param {function} [handleActionHandler] click handler for the action button
   * @param {any} [customParameters] custom parameters that will be passed to the snackbar renderer
   * @param {function} [handleHideWithoutAction] handler function that is called when the snackbar hides and the action button was not clicked
   */
  (
    message: string,
    severity: "success" | "info" | "warning" | "error",
    actionLabel?: string,
    handleActionHandler?: () => void,
    handleHideWithoutAction?: () => void
  ): void;
};

export type Severity = "success" | "info" | "warning" | "error";

const SnackbarContext = createContext<SnackbarProviderValue>(null as any);
export default SnackbarContext;
