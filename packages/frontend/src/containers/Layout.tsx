import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import AppBar from "../components/AppBar";

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <AppBar />
      <Container sx={{ padding: "20px" }}>{children}</Container>
    </Box>
  );
};

export default Layout;
