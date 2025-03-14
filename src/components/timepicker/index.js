import React, { useState } from "react";
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const TimePick = ({ label = "Select Time", value, onChange }) => {
  const [selectedTime, setSelectedTime] = useState(value || dayjs());

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    if (onChange) {
      onChange(newTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={selectedTime}
        onChange={handleTimeChange}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};

export default TimePick;
