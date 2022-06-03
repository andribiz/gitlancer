import { Field, FieldProps, Formik } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSnackbar } from "../components/SnackBarProvider";
import { useWalletProvider } from "../contexts/wallet.provider";
import {
  BiddingType,
  JobsData,
  JobsDataInput,
  useCreateJobsDataMutation,
  useGetJobsDataByIdLazyQuery,
} from "../generated/graphql";
import { usePageInfoProvider } from "./Layout";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormikMDEditor from "../components/FormikMDE";
// import "easymde/dist/easymde.min.css";

const validationSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(100, "Too Long!").required(),
});

interface Props {
  id?: string;
}

const FormProfile: React.FC<Props> = ({ id }) => {
  const snackbar = useSnackbar();
  const { user, provider, updateUser } = useWalletProvider();
  const { setLoading } = usePageInfoProvider();
  const [data, setData] = useState<JobsData | undefined>();
  const value: JobsDataInput = {
    biddingType: BiddingType.OpenBid,
    body: "",
    title: "",
    price: 1,
    creatorID: user?.id || "",
  };
  const [getJobByID] = useGetJobsDataByIdLazyQuery({
    onError: (error) => {
      snackbar.errorMessage(`Opps ${error}`);
      setLoading(false);
      console.log(error.stack);
    },
    onCompleted: (data) => {
      if (!data.GetJobsDataID) return;
      setData(data.GetJobsDataID);
      setLoading(false);
    },
  });

  const [createJob] = useCreateJobsDataMutation({
    onError: (error) => {
      snackbar.errorMessage(`Opps ${error}`);
      setLoading(false);
      console.log(error.stack);
    },
    onCompleted: (data) => {
      if (!data.CreateJobsData) return;
      setData(data.CreateJobsData);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getJobByID({
      variables: {
        id,
      },
    });
  }, [id, getJobByID, setLoading]);

  return (
    <>
      <Formik
        initialValues={value}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          setLoading(true);
          // console.log(data);
          createJob({
            variables: {
              input: data,
            },
          });
        }}
      >
        {({ handleChange, values, touched, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Field
                type="hidden"
                id="creatorID"
                name="creatorID"
                value={user?.id}
              />
              <Grid item md={12}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={values.title || ""}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Grid>
              <Grid item md={12}>
                <Field id="body" name="body" component={FormikMDEditor} />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  id="price"
                  type="number"
                  name="price"
                  label="Price"
                  value={values.price}
                  onChange={handleChange}
                  // error={touched.body && Boolean(errors.body)}
                  // helperText={touched.body && errors.body}
                />
              </Grid>
              <Grid item md={12}>
                <InputLabel>Bidding Type</InputLabel>
                <Select
                  name="biddingType"
                  id="biddingType"
                  label="Bidding Type"
                  onChange={handleChange}
                  value={values.biddingType}
                >
                  {Object.keys(BiddingType).map((key) => (
                    <MenuItem
                      key={key}
                      value={BiddingType[key as keyof typeof BiddingType]}
                    >
                      {BiddingType[key as keyof typeof BiddingType].replace(
                        "_",
                        " "
                      )}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item md={12}>
                {provider && (
                  <Grid item md={4} sx={{ paddingLeft: "10px" }}>
                    <Button variant="contained" type="submit">
                      Create Job
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
