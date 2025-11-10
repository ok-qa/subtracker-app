import { useSearchParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  AlertTitle,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../../api";
import { useState } from "react";
import { CheckCircleRounded } from "@mui/icons-material";

const ResetPasswordPage = () => {
  const [isExpiredLink, setIsExpiredLink] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: { password: "", confirm: "" },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        const encodedToken = encodeURIComponent(token);

        await changePassword({
          token: encodedToken,
          password: values.password,
        });
        formikHelpers.setStatus({ success: true });
        navigate("/signin");
      } catch (error) {
        const errorMessage = error.response.data.message;
        console.error(error);
        if (errorMessage === "jwt expired") {
          setIsExpiredLink(true);
        }
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  const isDisabled = formik.isSubmitting || formik.status?.success;

  if (!token) return <Typography>Invalid or missing reset link.</Typography>;

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
        <Typography variant="h5" mb={3}>
          Reset Password
        </Typography>

        {isExpiredLink ? (
          <Alert
            icon={<CheckCircleRounded fontSize="inherit" />}
            severity="error"
            sx={{ mt: 2 }}
          >
            <AlertTitle>Sorry</AlertTitle>
            The link is expired.
          </Alert>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="New Password"
              type="password"
              margin="normal"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={isDisabled}
            />

            <TextField
              fullWidth
              id="confirm"
              name="confirm"
              label="Confirm Password"
              type="password"
              margin="normal"
              required
              value={formik.values.confirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirm && Boolean(formik.errors.confirm)}
              helperText={formik.touched.confirm && formik.errors.confirm}
              disabled={isDisabled}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              disabled={isDisabled}
            >
              {formik.isSubmitting
                ? "Resetting..."
                : formik.status?.success
                ? "Done"
                : "Reset Password"}
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage;
