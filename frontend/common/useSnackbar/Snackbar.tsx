import { Alert, Snackbar } from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import SnackbarContext, { Severity, SnackbarProviderValue } from "./snackbarContext";

export interface ConfirmProviderProps {}

type SnackbarMessage = {
  message: string;
  severity: Severity;
};

const SnackbarMessageProvider: React.ComponentType = ({ children }) => {
  const [messages, setMessages] = useState<Array<SnackbarMessage>>([]);

  const showMessage: SnackbarProviderValue = useCallback((message: string, severity: Severity) => {
    setMessages((prevValue) => {
      return [...prevValue, { message, severity }];
    });
  }, []);

  return (
    <Fragment>
      <SnackbarContext.Provider value={showMessage}>{children}</SnackbarContext.Provider>

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

export default SnackbarMessageProvider;
