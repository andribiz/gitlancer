import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import Head from "next/head";
import { useSnackbar } from "../components/SnackBarProvider";
import { useState } from "react";
import FormProfile from "../containers/FormProfile";
import { useWalletProvider } from "../contexts/wallet.provider";

const ProfilePage = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  const { provider, user } = useWalletProvider();

  if (!provider || !user) {
    return (
      <Container>
        <Head>
          <title>Gitlancer | Geek Profiles</title>
          <meta name="description" content="Create your NFT " />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Typography variant="h4">
          Please Login through metamask first
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Head>
        <title>Gitlancer | Geek Profiles</title>
        <meta name="description" content="Create your NFT " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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

export default ProfilePage;
