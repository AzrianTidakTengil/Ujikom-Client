import React, { Component } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

class Dropdown extends Component {
  render() {
    const { options, label, value, onChange, ...props } = this.props;
    return (
      <FormControl fullWidth {...props}>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={onChange} label={label}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default Dropdown;
