import React, { Component } from "react";
import { Chip, Stack } from "@mui/material";

class SelectChip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultValue || 0,
    };
  }

  handleSelect = (val) => {
    this.setState({ selected: val });
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  };

  render() {
    const { options, defaultValue } = this.props;
    const { selected } = this.state;

    return (
      <Stack direction="row" spacing={1}>
        {options.map((option, index) => (
          <Chip
            key={index}
            label={option.name}
            clickable
            color={selected === option.id ? "primary" : "default"}
            onClick={() => this.handleSelect(option.id)}
          />
        ))}
      </Stack>
    );
  }
}

export default SelectChip;