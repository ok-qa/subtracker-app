import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { signUp } from "../../services/authService";

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

  const getButtonDisabled = ({ errors, isSubmitting }) => {
    return !!(isSubmitting || errors.email || errors.password);
  };

  const handleSubmit = async (values, formikHelpers) => {
    try {
      const valuesCopy = { ...values };
      delete valuesCopy.confirmPassword;
      await signUp(valuesCopy, dispatch);
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonAddAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SignUpFormSchema}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  required
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address"
                  required
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Field
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  fullWidth
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={getButtonDisabled({ errors, isSubmitting })}
                sx={{ mt: 3, mb: 2, py: 1 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
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

export default SignUpPage;
