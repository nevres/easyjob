import { createContext } from "react";

export type SnackbarProviderValue = {
  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {string} [actionLabel] label for the action button
   */
  (message: string, severity: "success" | "info" | "warning" | "error"): void;
};

export type Severity = "success" | "info" | "warning" | "error";

const SnackbarContext = createContext<SnackbarProviderValue>(() => {});
export default SnackbarContext;
