import AddSubscriptionBtn from "../../components/AddSubscriptionBtn/AddSubscriptionBtn";
import Header from "../../components/Header/Header";
import SubscriptionSection from "../HomePage/atoms/SubscriptionsSection/SubscriptionSection";

const HomePage = () => {
  return (
    <>
      <Header />
      <AddSubscriptionBtn />
      <SubscriptionSection />
    </>
  );
};

export default HomePage;
