import { useParams, useNavigate } from "react-router-dom";
import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";

import Header from "../../components/Header/Header";
import { useSubscriptions } from "../../assets/context/SubscriptionContext";

const EditSubscriptionPage = () => {
  const { id } = useParams();
  const { subscriptions, editSubscription } = useSubscriptions();
  const navigate = useNavigate();

  const existing = subscriptions.find((s) => s.id === id);

  const handleSubmit = (updated) => {
    editSubscription(updated);
    navigate("/");
  };

  return (
    <>
      <Header />
      <SubscriptionForm
        onSubmit={handleSubmit}
        defaultValues={existing}
        isEdit
      />
    </>
  );
};

export default EditSubscriptionPage;
