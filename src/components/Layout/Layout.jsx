import { Box } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AppBackground from "../AppBackground/AppBackground";
import SubscriptionSection from "../../pages/HomePage/atoms/SubscriptionsSection/SubscriptionSection";
import FilterSidebar from "../../pages/HomePage/atoms/FilterSidebar/FilterSidebar";

const Layout = ({ children, filterSidebar, open, setOpen }) => {
  if (filterSidebar) {
    return (
      <AppBackground>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            width: "100%",
          }}
        >
          <FilterSidebar open={open} setOpen={setOpen} />

          <Box sx={{ flex: 1 }}>
            <Header open={open} setOpen={setOpen} />

            <Box
              component="main"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <SubscriptionSection />
            </Box>

            <Footer />
          </Box>
        </Box>
      </AppBackground>
    );
  }
  return (
    <AppBackground>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Header open={open} setOpen={setOpen} />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            p: 4,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </AppBackground>
  );
};

export default Layout;
