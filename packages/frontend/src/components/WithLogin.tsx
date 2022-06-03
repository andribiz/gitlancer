import React, { useState } from "react";
import { WalletContext } from "../contexts/wallet.provider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const withMustLogin =
  <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> =>
  // eslint-disable-next-line react/display-name
  (props) =>
    (
      <WalletContext.Consumer>
        {({ user }) => {
          if (user) return <WrappedComponent {...props} />;
          return (
            <Container>
              <Typography variant="h4">
                Please Login through metamask first
              </Typography>
            </Container>
          );
        }}
      </WalletContext.Consumer>
    );

export default withMustLogin;
