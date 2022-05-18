import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import React, { createContext, useState } from "react";

type SnackbarContextType = {
  errorMessage: (info: string) => void;
  infoMessage: (info: string) => void;
  warnMessage: (info: string) => void;
};

export const SnackBarContext = createContext<SnackbarContextType>({
  errorMessage: () => {},
  infoMessage: () => {},
  warnMessage: () => {},
});

export function useSnackbar(): SnackbarContextType {
  const context = React.useContext(SnackBarContext);
  return {
    errorMessage: context!.errorMessage,
    infoMessage: context!.infoMessage,
    warnMessage: context!.warnMessage,
  };
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState<string>("");

  const handleClose = () => {
    setOpen(false);
  };

  const infoMessage = (info: string) => {
    setSeverity("success");
    setMessage(info);
    setOpen(true);
  };
  const errorMessage = (info: string) => {
    setSeverity("error");
    setMessage(info);
    setOpen(true);
  };
  const warnMessage = (info: string) => {
    setSeverity("warning");
    setMessage(info);
    setOpen(true);
  };
  return (
    <SnackBarContext.Provider
      value={{
        infoMessage,
        warnMessage,
        errorMessage,
      }}
    >
      <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        {children}
      </>
    </SnackBarContext.Provider>
  );
};

export default SnackbarProvider;
