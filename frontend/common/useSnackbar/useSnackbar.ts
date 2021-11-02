import React from "react";
import SnackbarContext from "./snackbarContext";

export default function useSnackbar() {
  return React.useContext(SnackbarContext);
}
