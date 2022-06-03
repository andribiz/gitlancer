import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import Head from "next/head";
import AppBar from "../components/AppBar";
import React, { createContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  children: JSX.Element;
}

interface AppInfo {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setLoading: (loading: boolean) => void;
}

export const PageInfoContext = createContext<AppInfo>({
  setTitle: (title: string) => {},
  setDescription: (description: string) => {},
  setLoading: (loading: boolean) => {},
});

export const usePageInfoProvider = () => {
  const context = React.useContext(PageInfoContext);
  return {
    setTitle: context.setTitle,
    setDescription: context.setDescription,
    setLoading: context.setLoading,
  };
};

const Layout: React.FC<Props> = ({ children }) => {
  const [title, setTitle] = useState("Gitlancer");
  const [description, setDescription] = useState(
    "Outsource your web2 jobs in web3"
  );
  const [loading, setLoading] = useState(false);

  return (
    <Box>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <PageInfoContext.Provider
        value={{
          setTitle,
          setDescription,
          setLoading,
        }}
      >
        <Container sx={{ padding: "20px" }}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {children}
        </Container>
      </PageInfoContext.Provider>
    </Box>
  );
};

export default Layout;
