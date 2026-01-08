import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link as BrowserLink } from "react-router-dom";
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signIn } from "../../services/authService";
import { GoogleAuthBtn } from "../../components/GoogleAuthBtn/GoogleAuthBtn";

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
    const originState = btoa(JSON.stringify({
  frontend: window.location.origin,
}));
    window.location.href = `${apiUrl}/api/auth/get-oauth-url?state=${originState}`;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SignInFormSchema}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                label="Email Address"
                name="email"
                fullWidth
                margin="normal"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={getButtonDisabled({ errors, isSubmitting })}
                sx={{ mt: 3, mb: 2, py: 1 }}
              >
                Sign In
              </Button>
              <p>or</p>
              <GoogleAuthBtn onClick={handleGoogleLogin} />
              <Grid container>
                <Grid size={{ xs: 12 }}>
                  <Link
                    component={BrowserLink}
                    to="/forgot-password"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Link component={BrowserLink} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default SignInPage;
