import { useState } from "react";
import { Box } from "@mui/material";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SubscriptionSection from "../HomePage/atoms/SubscriptionsSection/SubscriptionSection";
import FilterSidebar from "../HomePage/atoms/FilterSidebar/FilterSidebar";
import AppBackground from "../../components/AppBackground/AppBackground";

const HomePage = () => {
  const [open, setOpen] = useState(false);

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
};

export default HomePage;
