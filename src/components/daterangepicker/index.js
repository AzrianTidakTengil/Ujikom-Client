import React, { Component } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker as ReactDateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      dateRange: [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ],
    };
  }

  handleDateChange = (ranges) => {
    this.setState({ dateRange: [ranges.selection], isShow: false });
    if (this.props.onDateChange) {
      this.props.onDateChange({
        startDate: dayjs(ranges.selection.startDate),
        endDate: dayjs(ranges.selection.endDate),
      });
    }
  };

  togglePicker = () => {
    this.setState((prevState) => ({ isShow: !prevState.isShow }));
  };

  render() {
    const { isShow, dateRange } = this.state;
    const formattedDate = `${dayjs(dateRange[0].startDate).format("YYYY-MM-DD")} - ${dayjs(dateRange[0].endDate).format("YYYY-MM-DD")}`;

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ position: "relative" }}>
          <TextField
            fullWidth
            size="small"
            value={formattedDate}
            onClick={this.togglePicker}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonth />
                </InputAdornment>
              ),
              readOnly: true,
            }}
          />
          {isShow && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                zIndex: 2500,
                background: "white",
                boxShadow: 3,
              }}
            >
              <ReactDateRangePicker
                ranges={dateRange}
                onChange={this.handleDateChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                direction="horizontal"
              />
            </Box>
          )}
        </Box>
      </LocalizationProvider>
    );
  }
}

export default DateRangePicker;
