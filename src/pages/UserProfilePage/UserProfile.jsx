import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getMyProfile, updateProfile } from "../../api";
import { setUser } from "../../store/slices/app";

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

const UserProfile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.app);

  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile();
        dispatch(setUser(response.data.data));
        setName(response.data.data.name || "");
      } catch (error) {
        setError(error?.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, [dispatch]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const handleUpload = async (evt) => {
    const file = evt.target.files[0];
    if (!file) return;

    setUploadError("");

    if (!allowedTypes.includes(file.type)) {
      setUploadError("Allowed formats: JPG, JPEG, PNG, GIF");
      return;
    }

    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError("Image size must be under 3 MB.");
      return;
    }

    setAvatarFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      if (!preview) {
        const { data } = await updateProfile({ name });
        dispatch(setUser({ ...user, name: data.name }));
      } else {
        const { data } = await updateProfile({ name, avatar: avatarFile });
        dispatch(setUser({ ...user, name: data.name, avatar: data.avatar }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5">Profile</Typography>

        <Avatar
          src={preview || user?.avatar}
          sx={{ width: 120, height: 120, mx: "auto", mt: 3 }}
        />
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "grey.500", fontSize: "0.8rem" }}
        >
          Max file size: 3 MB
          <br />
          Allowed formats: JPG, JPEG, PNG, GIF
        </Typography>

        {uploadError && (
          <Typography color="error" sx={{ mt: 1, fontSize: "0.85rem" }}>
            {uploadError}
          </Typography>
        )}
        {/* <Typography
  variant="body2"
  sx={{ mt: 1, color: "text.secondary", fontSize: "0.85rem" }}
>
  Maximum avatar size: 3MB
</Typography> */}

        <Button variant="contained" component="label" sx={{ mt: 3 }}>
          Upload Avatar
          <input
            type="file"
            hidden
            accept={allowedTypes.join(",")}
            onChange={handleUpload}
          />
        </Button>

        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 3 }}
          required
          error={!name}
          helperText={!name && "Username is required."}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSave}
          disabled={isSaving || !name || uploadError}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </Paper>
    </Box>
  );
};

export default UserProfile;
