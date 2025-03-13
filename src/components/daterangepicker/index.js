import React, { Component } from "react";
import { TextField, Box, InputAdornment, Popover } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker as ReactDateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";
import { input } from "../form/theme";

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      inputRef: null,
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
    this.setState({ dateRange: [ranges.selection]});
    if (this.props.onDateChange) {
      this.props.onDateChange({
        startDate: dayjs(ranges.selection.startDate),
        endDate: dayjs(ranges.selection.endDate),
      });
    }

    if (ranges.selection.endDate) {
      this.handleClosePicker()
    }
  };

  handleOpenPicker = (event) => {
    console.log(event.currentTarget)
    this.setState({
      inputRef: event.currentTarget
    });
  };

  handleClosePicker = (event) => {
    this.setState({
      inputRef: null
    });
  };

  render() {
    const { isShow, dateRange, inputRef } = this.state;
    const formattedDate = `${dayjs(dateRange[0].startDate).format("YYYY-MM-DD")} - ${dayjs(dateRange[0].endDate).format("YYYY-MM-DD")}`;

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ position: "relative" }}>
          <TextField
            fullWidth
            size="small"
            value={formattedDate}
            onClick={this.handleOpenPicker}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonth />
                </InputAdornment>
              ),
              readOnly: true,
            }}
          />
          <Popover
            open={Boolean(inputRef)}
            anchorEl={inputRef}
            onClose={this.handleClosePicker}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
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
          </Popover>
        </Box>
      </LocalizationProvider>
    );
  }
}

export default DateRangePicker;
