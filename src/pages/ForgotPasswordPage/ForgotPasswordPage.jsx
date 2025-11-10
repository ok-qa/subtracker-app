import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import { forgotPassword } from "../../api";
import { CheckCircleRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPasswordPage = () => {
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await forgotPassword(values.email);
        setSubmitted(true);
        setSuccess(true);
      } catch (error) {
        const errorMessage = error.response.data.message;
        console.error(error);
        if (errorMessage === "User not found") {
          formikHelpers.setFieldError("email", errorMessage);
        }
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2}>
          Forgot Password
        </Typography>
        <Typography variant="body2" mb={3}>
          Enter your email to receive a reset link.
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            margin="normal"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={submitted}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={formik.isSubmitting || submitted}
          >
            {formik.isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        {success && (
          <Alert
            icon={<CheckCircleRounded fontSize="inherit" />}
            severity="success"
            sx={{ mt: 2 }}
          >
            Please check your email and follow the link we sent.
          </Alert>
        )}

        <Typography mt={2} textAlign="center">
          <Link component="button" onClick={() => navigate("/signin")}>
            Back to Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage;
