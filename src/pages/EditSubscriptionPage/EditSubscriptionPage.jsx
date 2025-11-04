import { useParams, useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../context/SubscriptionContext";
import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const EditSubscriptionPage = () => {
  const { id } = useParams();
  const { subscriptions, editSubscription } = useSubscriptions();
  const navigate = useNavigate();

  const existing = subscriptions.find(
    (subscription) => subscription._id === id
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

  //if (!existing) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <SubscriptionForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        isEdit
      />
      <Footer />
    </>
  );
};

export default EditSubscriptionPage;
