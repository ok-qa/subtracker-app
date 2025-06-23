import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddSubscriptionBtn = () => {
  const navigate = useNavigate();

  return (
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      onClick={() => navigate("/add")}
    >
      Add Subscription
    </Fab>
  );
};

export default AddSubscriptionBtn;
