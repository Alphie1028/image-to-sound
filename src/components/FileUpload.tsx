import React, { useState } from "react";
import SynthChoice from "./SynthChoice";

const UploadFile: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processImage, setProcessImage] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);
    setProcessImage(false);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setProcessImage(true);
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleFileSelect} className="mb-4" />

      {selectedFile && (
        <button
          onClick={handleUpload}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Upload & Process
        </button>
      )}

      {processImage && selectedFile && <SynthChoice imageFile={selectedFile} />}
    </div>
  );
};

export default UploadFile;
