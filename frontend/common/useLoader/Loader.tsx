import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useCallback, Fragment } from "react";
import LoaderContext from "./LoaderContext";

const SnackbarErrorProvider: React.FC = ({ children }) => {
  const [loaders, setLoaders] = useState<number>(0);

  const addLoader = useCallback(() => {
    setLoaders((prevState: number) => {
      return (prevState += 1);
    });
  }, []);

  const removeLoader = useCallback(() => {
    setLoaders((prevState: number) => {
      return (prevState -= 1);
    });
  }, []);

  return (
    <Fragment>
      <LoaderContext.Provider value={{ addLoader, removeLoader }}>{children}</LoaderContext.Provider>
      {loaders > 0 && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Fragment>
  );
};

export default SnackbarErrorProvider;
