import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../containers/Layout";
import WalletProvider from "../contexts/wallet.provider";
import { ApolloProvider } from "@apollo/client";
import client from "../contexts/apollo-client";
import SnackbarProvider from "../components/SnackBarProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider>
        <WalletProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WalletProvider>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default MyApp;
