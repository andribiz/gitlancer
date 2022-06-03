import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Head from "next/head";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePageInfoProvider } from "../../containers/Layout";
import { useEffect } from "react";

const JobsPage = () => {
  const { setTitle, setDescription } = usePageInfoProvider();

  useEffect(() => {
    setTitle("Gitlancer | Job Listing");
    setDescription("List of jobs offering");
  }, [setDescription, setTitle]);

  return (
    <Container>
      <Box sx={{ paddingBottom: "40px" }}>
        <Typography variant="h3">Jobs Listing</Typography>
      </Box>
      <Box>
        <Link href={"/jobs/create"} passHref>
          <Button variant="contained">Create </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default JobsPage;
