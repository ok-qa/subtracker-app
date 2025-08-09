import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { categories } from "../../constants/categories";

const initialState = {
  name: "",
  price: "",
  term: "Month",
  endDate: "",
};

const SubscriptionForm = ({ onSubmit, defaultValues, isEdit = false }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (defaultValues) {
      setForm(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.endDate) return;
    const fullForm = {
      ...form,
      id: isEdit ? form.id : crypto.randomUUID(),
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
      <Typography variant="h5" mb={2}>
        {isEdit ? "Edit" : "Add"} Subscription
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
        required
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        select
        label="Term"
        name="term"
        value={form.term}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="trial">Trial</MenuItem>
        <MenuItem value="month">Month</MenuItem>
        <MenuItem value="year">Year</MenuItem>
      </TextField>

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

      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        {isEdit ? "Update" : "Add"} Subscription
      </Button>
    </Box>
  );
};

export default SubscriptionForm;
