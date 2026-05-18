import { useSearchParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  AlertTitle,
  Alert,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../../api";
import { useState } from "react";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import AuthBackground from "../../components/AppBackground/AppBackground";

const ResetPasswordPage = () => {
  const [isExpiredLink, setIsExpiredLink] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

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

        <Paper sx={{ p: 4, width: 350 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Reset your password
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Choose a new password for your account. You'll use it to sign in
            next time.
          </Typography>

          {isExpiredLink ? (
            <>
              <Alert
                severity="error"
                sx={{ mt: 2, border: "1px solid #EF4444", color: "#EF4444" }}
                icon={
                  <ErrorOutlineOutlinedIcon
                    fontSize="inherit"
                    sx={{ color: "#EF4444" }}
                  />
                }
              >
                <AlertTitle sx={{ fontWeight: 600 }}>
                  Link expired or already used
                </AlertTitle>
                Reset links are valid for 30 minutes and can only be used once.
              </Alert>
              <Button
                onClick={() => navigate("/forgot-password")}
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                disabled={isDisabled}
              >
                Request a new link
              </Button>
            </>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                disabled={isDisabled}
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
              />

              <TextField
                fullWidth
                id="confirm"
                name="confirm"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                margin="normal"
                required
                value={formik.values.confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirm && Boolean(formik.errors.confirm)}
                helperText={formik.touched.confirm && formik.errors.confirm}
                disabled={isDisabled}
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
      </Container>
    </AuthBackground>
  );
};

export default ResetPasswordPage;
