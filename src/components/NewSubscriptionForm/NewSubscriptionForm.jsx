import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../context/SubscriptionContext";
import SubscriptionDatePicker from "../CustomDatePicker/CustomDatePicker";
import { useSelector } from "react-redux";

const initialState = {
  name: "",
  price: "",
  category: "",
  term: "",
  endDate: null,
};

const NewSubscriptionForm = ({ onSubmit, defaultValues, isEdit = false }) => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const {
    categories: { categoriesData },
    terms: { termsData },
  } = useSubscriptions();

  const { featureFlags } = useSelector((state) => state.app);

  useEffect(() => {
    if (defaultValues) {
      setForm({
        ...defaultValues,
        category: defaultValues.category?._id || defaultValues.category || "",
        term: defaultValues.term?._id || defaultValues.term || "",
        endDate: defaultValues.endDate
          ? new Date(defaultValues.endDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [defaultValues]);

  const handleNewDateChange = (value) => {
    setForm((prev) => ({ ...prev, endDate: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.endDate) return;
    const fullForm = {
      ...form,
      id: isEdit ? form._id : undefined,
      price: parseFloat(form.price),
    };
    onSubmit(fullForm);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, maxWidth: 500, mx: "auto", height: "100%" }}
    >
      <Typography
        fontSize={26}
        fontWeight="700"
        color="text.primary"
        letterSpacing={-0.8}
      >
        {isEdit ? "Edit" : "Add"} Subscription
      </Typography>
      <Typography fontSize={14} color="#64748B" sx={{ mt: 1 }}>
        {isEdit
          ? "Update the details and we'll keep track renewals"
          : "Enter the details and we'll track renewals and totals for you"}
      </Typography>
      <Paper
        sx={{
          mt: 3,
          p: 4,
          boxShadow:
            "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06), 0 24px 48px -12px rgba(79,70,229,0.10)",
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {categoriesData.map((category) => (
              <MenuItem key={category.name} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Term"
            name="term"
            value={form.term}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {termsData.map((term) => (
              <MenuItem key={term.name} value={term._id}>
                {term.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          {!featureFlags.CUSTOM_DATEPICKER ? (
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
          ) : (
            <SubscriptionDatePicker
              value={form.endDate}
              onChange={handleNewDateChange}
            />
          )}
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Button
            variant="contained"
            type="submit"
            onClick={() => navigate("/")}
            sx={{
              color: "#0F172A",
              bgcolor: "#FFFFFF",
              border: "2px solid #E2E8F0",
              borderRadius: "20px",
              boxShadow: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ borderRadius: "20px" }}
          >
            {isEdit ? "Update" : "Add"} Subscription
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewSubscriptionForm;
