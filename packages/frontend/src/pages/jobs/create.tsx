import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Head from "next/head";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormJobs from "../../containers/FormJobs";
import withMustLogin from "../../components/WithLogin";

const JobsCreatePage = () => {
  return (
    <Container>
      <Box sx={{ paddingBottom: "40px" }}>
        <Typography variant="h3">Create Jobs</Typography>
      </Box>
      <Paper elevation={3}>
        <Box sx={{ padding: "20px" }}>
          <FormJobs />
        </Box>
      </Paper>
    </Container>
  );
};

export default withMustLogin(JobsCreatePage);
