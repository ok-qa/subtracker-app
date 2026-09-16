import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import dayjs from "dayjs";

function SubscriptionDatePicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="End date"
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          onChange(
            newValue && newValue.isValid()
              ? newValue.format("YYYY-MM-DD")
              : null,
          );
        }}
        slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
        slotProps={{
          textField: {
            required: true,
            fullWidth: true,
            margin: "normal",
            sx: (theme) => ({
              "& .MuiOutlinedInput-root": {
                height: 56,
                borderRadius: "12px",
                background: "background.default",
                "& fieldset": {
                  borderColor: "text.secondary",
                  borderWidth: "1.5px",
                },
                "&:hover fieldset": { borderColor: "text.secondary" },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  borderWidth: "1.5px",
                },
                "&.Mui-focused": {
                  boxShadow: `0 0 0 4px ${theme.palette.primary.main}1A`,
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: 14,
                "&.Mui-focused": { color: "primary.main" },
              },
            }),
          },
          popper: {
            sx: (theme) => ({
              "& .MuiPaper-root": {
                borderRadius: "16px",
                border: `1px solid ${theme.palette.text.secondary}`,
                boxShadow:
                  theme.mode === "dark"
                    ? "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.4), 0 24px 48px -12px rgba(0,0,0,0.6)"
                    : "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06), 0 24px 48px -12px rgba(79,70,229,0.10)",
              },
              "& .MuiPickersDay-root": {
                fontFamily: "inherit",
                borderRadius: "9px",
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "#fff",
                  fontWeight: 700,
                  "&:hover": { backgroundColor: "primary.main" },
                },
              },
              "& .MuiPickersCalendarHeader-label": {
                fontWeight: 700,
                fontSize: 14,
              },
            }),
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default SubscriptionDatePicker;
