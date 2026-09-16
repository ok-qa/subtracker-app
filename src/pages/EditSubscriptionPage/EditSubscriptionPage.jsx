import { useParams, useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../context/SubscriptionContext";
import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";
import Layout from "../../components/Layout/Layout";
import NewSubscriptionForm from "../../components/NewSubscriptionForm/NewSubscriptionForm";
import { useSelector } from "react-redux";

const EditSubscriptionPage = () => {
  const { id } = useParams();
  const { subscriptions, editSubscription } = useSubscriptions();
  const navigate = useNavigate();
  const { featureFlags } = useSelector((state) => state.app);

  const existing = subscriptions.find(
    (subscription) => subscription._id === id,
  );
  const defaultValues = existing
    ? {
        ...existing,
        term: existing.term?._id || existing.term,
        category: existing.category?._id || existing.category,
      }
    : null;

  const handleSubmit = async (updated) => {
    await editSubscription(updated);
    navigate("/");
  };

  if (!featureFlags) {
    return;
  }

  //if (!existing) return <p>Loading...</p>;

  return (
    <Layout>
      {!featureFlags.NEW_SUBSCRIPTION_FORM ? (
        <SubscriptionForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          isEdit
        />
      ) : (
        <NewSubscriptionForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          isEdit
        />
      )}
    </Layout>
  );
};

export default EditSubscriptionPage;
