import AddSubscriptionBtn from "../../components/AddSubscriptionBtn/AddSubscriptionBtn";
import Header from "../../components/Header/Header";
import SubscriptionSection from "../HomePage/atoms/SubscriptionsSection/SubscriptionSection";
import CategoryFilter from "./atoms/SubscriptionFilter/SubscriptionFilter";


const HomePage = () => {
  return (
    <>
      <Header />
      <CategoryFilter />
      <AddSubscriptionBtn />
      <SubscriptionSection />
    </>
  );
};

export default HomePage;
