import React, { useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MAX_IMAGES = 5;

const ImageInput = ({ onImageSelect }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(event.target.files)
    if (images.length + files.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);
    if (onImageSelect) {
      console.log(imageUrls)
      onImageSelect(files);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Grid container spacing={2} justifyContent="center">
        {images.map((image, index) => (
          <Grid item key={index} position="relative">
            <Box position="relative" display="inline-block">
              <img
                src={image}
                alt="Preview"
                width={200}
                height={200}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  '&:hover': { backgroundColor: "rgba(255, 255, 255, 1)" }
                }}
                onClick={() => handleRemoveImage(index)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}
        {images.length < MAX_IMAGES && (
          <Grid item position="relative">
            <label htmlFor="image-upload">
              <Box
                width={200}
                height={200}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px dashed gray"
                borderRadius={8}
                sx={{ cursor: "pointer" }}
              >
                +
              </Box>
            </label>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              style={{ display: "none" }}
              onChange={handleImageChange}
              multiple
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ImageInput;
