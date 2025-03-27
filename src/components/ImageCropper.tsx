import React, { useState } from "react";
import Cropper from "react-easy-crop";

export const getCroppedImg = async (imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }): Promise<string> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context is not available");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `${Date.now().toString()}`, { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg");
  });
};

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  onClose: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const handleCropComplete = (_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropImage = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-3xl flex flex-col items-center">
        <div className="relative w-full h-[400px]">
          <Cropper image={imageSrc} crop={crop} zoom={zoom} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={handleCropComplete} />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="button" onClick={handleCropImage} className="px-6 py-3 bg-blue-500 text-white rounded-md">
            Crop & Save
          </button>
          <button onClick={onClose} className="px-6 py-3 bg-gray-400 text-white rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
