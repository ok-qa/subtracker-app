import { useState } from "react";
import { Box } from "@mui/material";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SubscriptionSection from "../HomePage/atoms/SubscriptionsSection/SubscriptionSection";
import FilterSidebar from "../HomePage/atoms/FilterSidebar/FilterSidebar";
import AppBackground from "../../components/AppBackground/AppBackground";
import Layout from "../../components/Layout/Layout";

const HomePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Layout filterSidebar={true} open={open} setOpen={setOpen}>
      <SubscriptionSection />
    </Layout>
  );
};

export default HomePage;
