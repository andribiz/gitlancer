import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ButtonConnect from "./ButtonConnect";
import TopMenuBar from "./TopMenuBar";
import Link from "next/link";

const DSAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Link href={"/"} passHref>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              DeepSea
            </Typography>
          </Link>
          <TopMenuBar />
          <ButtonConnect />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DSAppBar;
