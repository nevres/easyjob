import { Alert, Snackbar } from "@mui/material";
import React, { useState, Fragment } from "react";
import ConfirmContext, { Severity, SnackbarProviderValue } from "./snackbarContext";

export interface ConfirmProviderProps {}

type SnackbarMessage = {
  message: string;
  severity: Severity;
};

const SnackbarErrorProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Array<SnackbarMessage>>([]);

  const showMessage: SnackbarProviderValue = (
    message: string,
    severity: Severity,
    actionLabel?: string,
    handleActionHandler?: () => void,
    handleHideWithoutAction?: () => void
  ) => {
    setMessages((prevValue) => {
      return [...prevValue, { message, severity }];
    });
  };

  return (
    <Fragment>
      <ConfirmContext.Provider value={showMessage}>{children}</ConfirmContext.Provider>

      {messages.map((message) => {
        return (
          <Snackbar
            open={messages.length > 0}
            autoHideDuration={6000}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <Alert
              onClose={() => {
                setMessages([]);
              }}
              severity={message.severity}
              //   sx={{ width: "100%" }}
            >
              {message.message}
            </Alert>
          </Snackbar>
        );
      })}
    </Fragment>
  );
};

export default SnackbarErrorProvider;
