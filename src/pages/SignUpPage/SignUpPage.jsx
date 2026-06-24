import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link as BrowserLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Paper,
  Box,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { signIn, signUp } from "../../services/authService";
import AppBackground from "../../components/AppBackground/AppBackground";
import { GoogleAuthBtn } from "../../components/GoogleAuthBtn/GoogleAuthBtn";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useState } from "react";
import AuthSubmitBtn from "../../components/AuthSubmitBtn/AuthSubmitBtn";
import LogoTitleContainer from "../../components/LogoTitleContainer/LogoTitleContainer";

const apiUrl = import.meta.env.VITE_API_URL;

const SignUpFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(30, "Too long!")
    .required("Name is required!"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),

  password: Yup.string()
    .min(6, "Must contain at least 6 characters")
    .required("Password is required!"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please, repeat your password"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const getButtonDisabled = ({ errors, isSubmitting }) => {
    return !!(isSubmitting || errors.email || errors.password);
  };

  const handleSubmit = async (values, formikHelpers) => {
    try {
      const valuesCopy = { ...values };
      delete valuesCopy.confirmPassword;
      await signUp(valuesCopy, dispatch);
      await signIn(
        { email: values.email, password: values.password },
        dispatch,
      );
      navigate("/");
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (errorMessage === "Email in use") {
        formikHelpers.setFieldError("email", errorMessage);
      }
      const invalidEmailError = error.response.data.data?.errors?.[0]?.message;
      if (errorMessage === "Bad Request" && invalidEmailError) {
        formikHelpers.setFieldError("email", invalidEmailError);
      }
      console.error("Sign Up failed: ", error);
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
    <AppBackground isAuth childrenWrapperStyles={{ p: { xs: 3, sm: 5 } }}>
      <Container
        maxWidth="xs"
        sx={{
          mb: 8,
        }}
      >
        <LogoTitleContainer />

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 1.5,
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Create your account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start tracking your subscriptions in under a minute.
          </Typography>

          <GoogleAuthBtn onClick={handleGoogleLogin} mode="signup" />

          <Divider sx={{ my: 3, width: "100%" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={11}
              fontWeight={600}
              letterSpacing="0.12em"
            >
              OR SIGN UP WITH EMAIL{" "}
            </Typography>
          </Divider>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SignUpFormSchema}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="name"
                  label="Name*"
                  fullWidth
                  margin="normal"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address*"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  name="password"
                  label="Password*"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
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
                                sx={{ color: "#64748B", fontSize: 20 }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Field
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm Password*"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showConfirmPassword
                                ? "hide the password"
                                : "display the password"
                            }
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                            sx={{ "&:focus": { outline: "none" } }}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffOutlined
                                sx={{ color: "#64748B", fontSize: 20 }}
                              />
                            ) : (
                              <VisibilityOutlined
                                sx={{ color: "#64748B", fontSize: 20 }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <AuthSubmitBtn
                  disabled={getButtonDisabled({ errors, isSubmitting })}
                  title={isSubmitting ? "Creating account…" : "Create account"}
                />
              </Form>
            )}
          </Formik>
        </Paper>
        <Box>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            Already have an account?{" "}
            <Link
              component={BrowserLink}
              to="/signin"
              sx={{ color: "#6366F1" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Container>
    </AppBackground>
  );
};

export default SignUpPage;
