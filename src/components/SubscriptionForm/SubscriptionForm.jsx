import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getCategories, getTerms } from "../../api";

const initialState = {
  name: "",
  price: "",
  category: "",
  term: "",
  endDate: "",
};

const SubscriptionForm = ({ onSubmit, defaultValues, isEdit = false }) => {
  const [form, setForm] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [terms, setTerms] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categories, terms] = await Promise.all([
          getCategories(),
          getTerms(),
        ]);

        setCategories(categories);
        setTerms(terms);
      } catch (err) {
        console.error("Failed to load categories/terms", err);
      }
    };
    fetchData();
  }, []);

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
        {categories.map((category) => (
          <MenuItem key={category.name} value={category._id}>
            {category.name}
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
        {terms.map((term) => (
          <MenuItem key={term.name} value={term._id}>
            {term.name}
          </MenuItem>
        ))}
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
