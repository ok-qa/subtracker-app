import AddSubscriptionBtn from "../../components/AddSubscriptionBtn/AddSubscriptionBtn";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SubscriptionSection from "../HomePage/atoms/SubscriptionsSection/SubscriptionSection";
//import CategoryFilter from "./atoms/SubscriptionFilter/SubscriptionFilter";

const HomePage = () => {
  return (
    <>
      <Header />
      {/* <CategoryFilter /> */}
      {/* <AddSubscriptionBtn /> */}
      <SubscriptionSection />
      <Footer />
    </>
  );
};

export default HomePage;
