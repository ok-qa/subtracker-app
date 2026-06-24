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
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { forgotPassword } from "../../api";
import { CheckCircleRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppBackground from "../../components/AppBackground/AppBackground";
import AuthSubmitBtn from "../../components/AuthSubmitBtn/AuthSubmitBtn";
import LogoTitleContainer from "../../components/LogoTitleContainer/LogoTitleContainer";

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
    <AppBackground isAuth childrenWrapperStyles={{ p: { xs: 3, sm: 5 } }}>
      <Container maxWidth="xs">
        <LogoTitleContainer />
        <Paper elevation={3} sx={{ p: 4, width: 350 }}>
          <Typography variant="h5" mb={2}>
            Forgot your password?
          </Typography>
          <Typography variant="body2" mb={3} sx={{ color: "#647488" }}>
            No worries — enter your email and we'll send you a reset link.
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email address"
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

            {success && (
              <Alert
                icon={<CheckCircleRounded fontSize="inherit" />}
                severity="success"
                elevation={2}
                sx={{
                  mt: 2,
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#aff2ba3b",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  {" "}
                  Reset link sent
                </Typography>
                <Typography>
                  Please check your email and follow the link we sent.
                </Typography>
              </Alert>
            )}

            <AuthSubmitBtn
              disabled={formik.isSubmitting || submitted || formik.errors.email}
              title={formik.isSubmitting ? "Sending..." : "Send Reset Link"}
            />
          </form>
        </Paper>

        <Link
          component="button"
          onClick={() => navigate("/signin")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            width: "100%",
            color: " #6366F1",
          }}
        >
          <ArrowBackIcon fontSize="extra-small" />
          <Typography textAlign="center" fontSize={14} fontWeight={600}>
            Back to Sign In
          </Typography>
        </Link>
      </Container>
    </AppBackground>
  );
};

export default ForgotPasswordPage;
