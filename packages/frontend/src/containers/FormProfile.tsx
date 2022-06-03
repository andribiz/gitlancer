import { FieldProps, Formik } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { useState } from "react";
import { useSnackbar } from "../components/SnackBarProvider";
import { useWalletProvider } from "../contexts/wallet.provider";
import { useUpdateUserProfileMutation } from "../generated/graphql";
import { usePageInfoProvider } from "./Layout";

const validationSchema = yup.object().shape({
  name: yup.string().min(2, "Too Short!").max(100, "Too Long!").nullable(),
  email: yup.string().email("Email invalid").nullable(),
});

const FormProfile: React.FC = () => {
  const snackbar = useSnackbar();
  const { setLoading } = usePageInfoProvider();

  const { user, provider, updateUser } = useWalletProvider();

  const [updateGQLUser] = useUpdateUserProfileMutation({
    onError: (error) => {
      snackbar.errorMessage(`Opps ${error}`);
      setLoading(false);
      console.log(error.stack);
    },
    onCompleted: (data) => {
      if (!data.UpdateUserProfile) return;
      updateUser(data.UpdateUserProfile);
      setLoading(false);
    },
  });

  return (
    <>
      <Formik
        initialValues={user!}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          setLoading(true);
          updateGQLUser({
            variables: {
              id: user!.id,
              input: {
                name: data.name,
                email: data.email,
              },
            },
          });
        }}
      >
        {({ handleChange, values, touched, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  id="wallet"
                  name="wallet"
                  label="Wallet Address"
                  value={values.wallet}
                  disabled
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={values.name || ""}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="email"
                  value={values.email || ""}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item md={12}>
                {provider && (
                  <Grid item md={4} sx={{ paddingLeft: "10px" }}>
                    <Button variant="contained" type="submit">
                      Update Profile
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormProfile;
