import React, { useState } from "react";
import SynthChoice from "./SynthChoice";
import "../../styles/FileUpload.css";

const UploadFile: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image</h2>
      <div className="upload-buttons">
        <input
          id="file-upload"
          type="file"
          className="file-input"
          onChange={handleFileSelect}
        />
        <label htmlFor="file-upload" className="upload-button" onClick={() => setSelectedFile(selectedFile)}>
          Choose File
        </label>
      </div>
      <SynthChoice imageFile={selectedFile} />
    </div>
  );
};

export default UploadFile;
