import { useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../assets/context/SubscriptionContext";
import Header from "../../components/Header/Header";
import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";

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
