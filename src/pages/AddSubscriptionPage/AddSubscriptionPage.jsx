import { useNavigate } from "react-router-dom";

import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";
import Header from "../../components/Header/Header";
import { useSubscriptions } from "../../context/SubscriptionContext";
import Footer from "../../components/Footer/Footer";

import styles from "./AddSubscriptionPage.module.css";

const AddSubscriptionPage = () => {
  const { addSubscription } = useSubscriptions();
  const navigate = useNavigate();

  const handleSubmit = (subscription) => {
    addSubscription(subscription);
    navigate("/");
  };

  return (
    <div className={styles.addSubscriptionPage}>
      <Header />
      <SubscriptionForm
        onSubmit={handleSubmit}
        isEdit={false}
        defaultValues={null}
      />
      <Footer />
    </div>
  );
};

export default AddSubscriptionPage;
