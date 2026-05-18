import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, Link as BrowserLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  Box,
  TextField,
  Link,
  Typography,
  Container,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { signIn } from "../../services/authService";
import { GoogleAuthBtn } from "../../components/GoogleAuthBtn/GoogleAuthBtn";
import AuthBackground from "../../components/AppBackground/AppBackground";

import AuthSubmitBtn from "../../components/AuthSubmitBtn/AuthSubmitBtn";

const apiUrl = import.meta.env.VITE_API_URL;

const SignInFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Must contain at least 6 characters")
    .required("Password is required!"),
});

const initialValues = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const getButtonDisabled = ({ errors, isSubmitting }) => {
    return !!(isSubmitting || errors.email || errors.password);
  };

  const handleSubmit = async (values, formikHelpers) => {
    try {
      await signIn(values, dispatch);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response.data.message;
      console.error("Login failed: ", error);
      if (
        errorMessage === "User not found" ||
        errorMessage === "Unauthorized"
      ) {
        const customErrorMessage = "Incorrect email or password";
        formikHelpers.setFieldError("email", customErrorMessage);
        formikHelpers.setFieldError("password", customErrorMessage);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const originState = btoa(
      JSON.stringify({
        frontend: window.location.origin,
      }),
    );
    window.location.href = `${apiUrl}/api/auth/get-oauth-url?state=${originState}`;
  };

  return (
    <AuthBackground>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 36,
              height: 36,
              borderRadius: "10px",
              backgroundColor: "#4F46E5",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            S
          </Box>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ ml: 2, fontWeight: 700 }}
          >
            SubTracker
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 1.5,
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Welcome back 👋
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to keep tabs on your subscriptions.
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SignInFormSchema}
          >
            {({ errors, touched, isSubmitting }) => {
              const showAlert = errors.email === "Incorrect email or password";
              return (
                <Form>
                  {showAlert && (
                    <Alert
                      icon={
                        <ErrorOutlineOutlinedIcon
                          fontSize="inherit"
                          sx={{ color: "#EF4444" }}
                        />
                      }
                      severity="error"
                      sx={{
                        mt: 2,
                        color: "#EF4444",
                        border: "1px solid #EF4444",
                        backgroundColor: "#c73c3c21",
                      }}
                    >
                      Sorry, email and password you provided don't match our
                      record. Try again or reset your password.
                    </Alert>
                  )}
                  <Field
                    as={TextField}
                    label="Email address*"
                    name="email"
                    fullWidth
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && !showAlert && errors.email}
                    sx={{
                      borderRadius: 1,
                    }}
                  />

                  <Field
                    as={TextField}
                    name="password"
                    label="Password*"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    error={touched.password && Boolean(errors.password)}
                    helperText={
                      touched.password && !showAlert && errors.password
                    }
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword
                                  ? "hide the password"
                                  : "display the password"
                              }
                              onClick={handleClickShowPassword}
                              edge="end"
                              sx={{ "&:focus": { outline: "none" } }}
                            >
                              {showPassword ? (
                                <VisibilityOffOutlined
                                  sx={{ color: "#64748B", fontSize: 20 }}
                                />
                              ) : (
                                <VisibilityOutlined
                                  sx={{
                                    color: "#64748B",
                                    fontSize: 20,
                                  }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      borderRadius: 1,
                    }}
                  />

                  <Box textAlign="right" mt={1}>
                    <Link
                      component={BrowserLink}
                      to="/forgot-password"
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  <AuthSubmitBtn
                    disabled={getButtonDisabled({ errors, isSubmitting })}
                    title={isSubmitting ? "Signing in…" : "Sign in"}
                  />

                  <Divider sx={{ my: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize={11}
                      fontWeight={600}
                      letterSpacing="0.12em"
                    >
                      OR{" "}
                    </Typography>
                  </Divider>

                  <GoogleAuthBtn onClick={handleGoogleLogin} mode="signin" />
                </Form>
              );
            }}
          </Formik>
        </Paper>
        <Box>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mt: 3 }}
          >
            New to SubTracker?{" "}
            <Link
              component={BrowserLink}
              sx={{ color: "#6366F1" }}
              to="/register"
            >
              Create an account
            </Link>
          </Typography>
        </Box>
      </Container>
    </AuthBackground>
  );
};

export default SignInPage;
