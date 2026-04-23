import { useEffect, useRef, useState } from "react";
import {
  Box,
  Fab,
  Drawer,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MessageItem from "./MessageItem";

const UserChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const wsRef = useRef(null);

  useEffect(() => {
    console.log("Start working with webSocket");
    try {
      const socket = new WebSocket(
        "ws://localhost:3000/api/subscriptions/messaging",
      );
      wsRef.current = socket;
      socket.onopen = () => {
        console.log("Connected!");
      };
      socket.onerror = (e) => {
        console.error(e);
      };
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log("parsedData: ", parsedData);
        setMessages((prev) => {
          return [...prev, parsedData];
        });
      };
      return () => {
        socket.close();
      };
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setUserInput(value);
  };

  const handleSubmit = () => {
    wsRef.current?.send(userInput);
    setMessages((prev) => {
      return [...prev, { type: "user", message: userInput }];
    });
    setUserInput("");
  };

  console.log("messages", messages);

  return (
    <>
      {!open && (
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 60,
            right: 20,
            zIndex: 1300,
          }}
        >
          <ChatIcon />
        </Fab>
      )}

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 320,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#e8f4fd",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography variant="h6">Chat</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
            }}
          >
            {messages.map((item, index) => (
              //   <Typography variant="body2" key={`${index + " " + item.message}`}>
              //     {item.message}
              //   </Typography>
              <MessageItem
                key={`${index + " " + item.message}`}
                data={item}
                index={index}
              />
            ))}
            {/* <Typography variant="body2">Hello! How can I help you?</Typography> */}
          </Box>

          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #ddd",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              sx={{ bgcolor: "white" }}
              value={userInput}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && userInput.trim()) {
                  handleSubmit();
                }
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="send message"
                        onClick={handleSubmit}
                        disabled={!userInput.trim()}
                        edge="end"
                        color="primary"
                        disableRipple
                        sx={{ "&:focus": { outline: "none" } }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default UserChat;
