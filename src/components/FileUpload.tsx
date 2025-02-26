import React, { useState } from "react";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    //Allowed image types
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only image files (JPEG, PNG, GIF, WEBP) are allowed.");
      setSelectedFile(null);
      setUploadedFileName(null);
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    //Generate a unique filename
    const uniqueId = Date.now();
    const fileExtension = selectedFile.name.split(".").pop();
    const uniqueFileName = `uploaded-file-${uniqueId}.${fileExtension}`;
    setUploadedFileName(uniqueFileName);

    //Resize image
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        //Resize to 200x200 pixels
        canvas.width = 200;
        canvas.height = 200;

        ctx.drawImage(img, 0, 0, 200, 200);
        setResizedImage(canvas.toDataURL("image/png"));
      };
    };
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload an Image</h2>
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif, image/webp"
        onChange={handleFileSelect}
        className="mb-4"
      />

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={!selectedFile}
      >
        Upload
      </button>

      {resizedImage && (
        <div className="mt-4">
          <img
            src={resizedImage}
            alt="Resized Preview"
            className="border rounded-lg shadow mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
