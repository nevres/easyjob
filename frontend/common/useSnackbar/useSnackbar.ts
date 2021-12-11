import { useContext } from "react";
import SnackbarContext from "./snackbarContext";

const useSnackbar = () => {
  const showMessage = useContext(SnackbarContext);
  return showMessage;
};

export default useSnackbar;
