import { CircularProgress, Box } from "@mui/material";
import React, { useState, useRef, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const CropImage = ({ imageSrc }) => {
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const onImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const aspect = 1; // Fixed aspect ratio (1:1)
    const defaultCrop = centerCrop(
      makeAspectCrop(
        { unit: "%", width: 50 },
        aspect,
        naturalWidth,
        naturalHeight
      ),
      naturalWidth,
      naturalHeight
    );
    setCrop(defaultCrop);
  };

  const handleCropComplete = useCallback((crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const image = imgRef.current;
      const canvas = canvasRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");
      const pixelRatio = window.devicePixelRatio;

      canvas.width = Math.floor(crop.width * scaleX);
      canvas.height = Math.floor(crop.height * scaleY);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  }, []);

  return (
    <div>
        {imageSrc ? (
            <ReactCrop
            src={imageSrc}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={handleCropComplete}
            aspect={1} // Fixed aspect ratio
            >
            <img ref={imgRef} src={imageSrc} alt="Source" onLoad={onImageLoad} />
            </ReactCrop>
        ) : (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <CircularProgress/>
            </Box>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CropImage;
