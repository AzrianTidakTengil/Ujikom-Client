import React, { useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const QuantityEditor = ({ initialQuantity = 1, min = 1, max = 10, onChange, name = '' }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange && onChange(name, newQuantity);
    }
  };

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange && onChange(name, newQuantity);
    }
  };

  const handleInputChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value)) value = min;
    value = Math.max(min, Math.min(max, value));
    setQuantity(value);
    onChange && onChange(name, value);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handleDecrease} disabled={quantity <= min}>
        <Remove />
      </IconButton>
      <TextField
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={quantity}
        onChange={handleInputChange}
        inputProps={{ min, max, style: { textAlign: "center" } }}
        size="small"
        variant="outlined"
        sx={{ width: 60, mx: 1 }}
      />
      <IconButton onClick={handleIncrease} disabled={quantity >= max}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default QuantityEditor;
