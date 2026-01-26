import Image from "next/image";
import { useEffect, useRef } from "react";

interface PixelatedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  pixelationLevel: number; // 1 = no pixelation, higher = more pixelated
  className?: string;
  canvasSize?: number;
}

export const PixelatedImage = ({
  src,
  alt,
  width = 100,
  height = 100,
  pixelationLevel,
  className = "",
  canvasSize = 64,
}: PixelatedImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const calculateAverageColor = (
    imageData: ImageData,
    startX: number,
    startY: number,
    blockSize: number
  ) => {
    let redSum = 0;
    let greenSum = 0;
    let blueSum = 0;
    let pixelCount = 0;

    for (let x = startX; x < startX + blockSize && x < imageData.width; x++) {
      for (
        let y = startY;
        y < startY + blockSize && y < imageData.height;
        y++
      ) {
        const index = (y * imageData.width + x) * 4;
        redSum += imageData.data[index];
        greenSum += imageData.data[index + 1];
        blueSum += imageData.data[index + 2];
        pixelCount++;
      }
    }

    return {
      red: Math.round(redSum / pixelCount),
      green: Math.round(greenSum / pixelCount),
      blue: Math.round(blueSum / pixelCount),
    };
  };

  const pixelateImage = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear canvas first
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Calculate aspect ratio and fit image within canvas
    const imageAspectRatio = image.naturalWidth / image.naturalHeight;
    const canvasAspectRatio = canvasSize / canvasSize; // 1:1

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imageAspectRatio > canvasAspectRatio) {
      // Image is wider than canvas
      drawWidth = canvasSize;
      drawHeight = canvasSize / imageAspectRatio;
      offsetX = 0;
      offsetY = (canvasSize - drawHeight) / 2;
    } else {
      // Image is taller than canvas or square
      drawWidth = canvasSize * imageAspectRatio;
      drawHeight = canvasSize;
      offsetX = (canvasSize - drawWidth) / 2;
      offsetY = 0;
    }

    // Draw original image with proper aspect ratio
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

    // If pixelation level is 1 or less, show original image
    if (pixelationLevel <= 1) return;

    // Get image data for pixelation (only the area where image is drawn)
    const imageData = ctx.getImageData(offsetX, offsetY, drawWidth, drawHeight);

    // Clear the image area only
    ctx.clearRect(offsetX, offsetY, drawWidth, drawHeight);

    // Create pixelated version with current pixelation level
    for (let y = 0; y < drawHeight; y += pixelationLevel) {
      for (let x = 0; x < drawWidth; x += pixelationLevel) {
        const avgColor = calculateAverageColor(
          imageData,
          x,
          y,
          pixelationLevel
        );
        ctx.fillStyle = `rgb(${avgColor.red}, ${avgColor.green}, ${avgColor.blue})`;

        const blockWidth = Math.min(pixelationLevel, drawWidth - x);
        const blockHeight = Math.min(pixelationLevel, drawHeight - y);
        ctx.fillRect(offsetX + x, offsetY + y, blockWidth, blockHeight);
      }
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleImageLoad = () => {
      pixelateImage();
    };

    if (image.complete) {
      handleImageLoad();
    } else {
      image.onload = handleImageLoad;
    }
  }, [pixelationLevel, src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Hidden image for processing */}
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="absolute opacity-0 object-cover"
        style={{ imageRendering: "pixelated" }}
        priority
      />

      {/* Canvas for pixelated effect */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
};
