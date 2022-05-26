import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const pages = [
  {
    title: "Jobs Listing",
    url: "/jobs",
  },
  {
    title: "My Jobs",
    url: "/jobs/my",
  },
  {
    title: "Profile",
    url: "/profile",
  },
  {
    title: "Statistic",
    url: "/stats",
  },
];

const TopMenuBar = () => {
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.title}
          sx={{ my: 2, color: "white", display: "block" }}
          onClick={() => {
            router.push(page.url);
          }}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  );
};

export default TopMenuBar;
