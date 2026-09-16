import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../context/SubscriptionContext";
import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";
import Layout from "../../components/Layout/Layout";

import NewSubscriptionForm from "../../components/NewSubscriptionForm/NewSubscriptionForm";
import { useSelector } from "react-redux";

const AddSubscriptionPage = () => {
  const { addSubscription } = useSubscriptions();
  const navigate = useNavigate();
  const { featureFlags } = useSelector((state) => state.app);

  const handleSubmit = (subscription) => {
    addSubscription(subscription);
    navigate("/");
  };
  if (!featureFlags) {
    return;
  }

  return (
    <Layout>
      {!featureFlags.NEW_SUBSCRIPTION_FORM ? (
        <SubscriptionForm
          onSubmit={handleSubmit}
          isEdit={false}
          defaultValues={null}
        />
      ) : (
        <NewSubscriptionForm
          onSubmit={handleSubmit}
          isEdit={false}
          defaultValues={null}
        />
      )}
    </Layout>
  );
};

export default AddSubscriptionPage;
