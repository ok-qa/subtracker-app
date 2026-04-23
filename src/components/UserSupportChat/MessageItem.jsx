import { Box, Typography } from "@mui/material";

const MessageItem = ({ data, index }) => {
  const isUser = data.type === "user";
  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <Box
        sx={{
          bgcolor: isUser ? "white" : "#d5e7f5",
          borderRadius: 2,
          width: "fit-content",
        }}
      >
        <Typography sx={{ m: 2 }}>{data.message}</Typography>
      </Box>
    </Box>
  );
};

export default MessageItem;
