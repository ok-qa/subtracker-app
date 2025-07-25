import { useNavigate } from "react-router-dom";

import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";
import Header from "../../components/Header/Header";
import { useSubscriptions } from "../../context/SubscriptionContext";

const AddSubscriptionPage = () => {
  const { addSubscription } = useSubscriptions();
  const navigate = useNavigate();

  const handleSubmit = (subscription) => {
    addSubscription(subscription);
    navigate("/");
  };

  return (
    <>
      <Header />
      <SubscriptionForm
        onSubmit={handleSubmit}
        isEdit={false}
        defaultValues={null}
      />
    </>
  );
};

export default AddSubscriptionPage;
