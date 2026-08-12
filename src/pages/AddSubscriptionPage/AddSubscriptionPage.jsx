import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../context/SubscriptionContext";
import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";
import Layout from "../../components/Layout/Layout";

const AddSubscriptionPage = () => {
  const { addSubscription } = useSubscriptions();
  const navigate = useNavigate();

  const handleSubmit = (subscription) => {
    addSubscription(subscription);
    navigate("/");
  };

  return (
    <Layout>
      <SubscriptionForm
        onSubmit={handleSubmit}
        isEdit={false}
        defaultValues={null}
      />
    </Layout>
  );
};

export default AddSubscriptionPage;
