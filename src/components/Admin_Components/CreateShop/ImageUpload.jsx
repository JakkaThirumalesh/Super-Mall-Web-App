import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ImageUpload({
  onImageUpload,
  label,
  imageNumber,
  preview,
}) {
  const [previewSrc, setPreviewSrc] = useState(preview);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64Image = await imageCompression.getDataUrlFromFile(
        compressedFile
      );
      return base64Image;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressedImage = await compressImage(file);
      setPreviewSrc(compressedImage);
      onImageUpload(compressedImage);
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  return (
    <div className="mt-4">
      <label
        htmlFor={`shopImage${imageNumber}`}
        className="block text-sm font-medium text-zinc-200"
      >
        {label}
      </label>
      <input
        type="file"
        id={`shopImage${imageNumber}`}
        accept="image/*"
        onChange={handleFileChange}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {previewSrc && (
        <img
          src={previewSrc || "/placeholder.svg"}
          alt={`Shop preview ${imageNumber}`}
          className="mt-4 w-48 h-48 object-cover rounded"
        />
      )}
    </div>
  );
}
