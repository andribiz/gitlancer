import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import Head from "next/head";
import { useSnackbar } from "../components/SnackBarProvider";
import { useEffect, useState } from "react";
import FormProfile from "../containers/FormProfile";
import { useWalletProvider } from "../contexts/wallet.provider";
import { usePageInfoProvider } from "../containers/Layout";
import withMustLogin from "../components/WithLogin";

const ProfilePage = () => {
  const { setTitle, setDescription } = usePageInfoProvider();

  useEffect(() => {
    setTitle("Gitlancer | Geek Profile");
    setDescription("Your geeky profile");
  }, [setDescription, setTitle]);

  return (
    <Container>
      <Box sx={{ paddingBottom: "40px" }}>
        <Typography variant="h3">Geek Profile</Typography>
      </Box>
      <Paper elevation={3}>
        <Box sx={{ padding: "20px" }}>
          <FormProfile />
        </Box>
      </Paper>
    </Container>
  );
};

export default withMustLogin(ProfilePage);
