import React, { useState, useEffect } from "react";
import { mapColorToNote } from "../../utils/noteUtils";
import PlayButton from "./PlayButton";
import * as Tone from "tone";
import "../../styles/ImageToNotes.css";

const ImageToNotes: React.FC<{ imageFile: File; getSynth: () => Tone.Synth | Tone.FMSynth | Tone.AMSynth | Tone.DuoSynth | Tone.MonoSynth }> = ({ imageFile, getSynth }) => {
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [generatedNotes, setGeneratedNotes] = useState<string[]>([]);

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 200;
        canvas.height = 200;
        ctx.drawImage(img, 0, 0, 200, 200);
        setResizedImage(canvas.toDataURL("image/png"));

        //Extract RGBA pixel data
        const imageData = ctx.getImageData(0, 0, 200, 200);
        const pixels = imageData.data;

        //Convert to musical notes
        const notesArray: string[] = [];
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const note = mapColorToNote(r);
          notesArray.push(note);
        }

        setGeneratedNotes(notesArray);
      };
    };
  }, [imageFile]);

  return (
    <div className="right-panel">
      <div className="image-container">
        {resizedImage && <img src={resizedImage} alt="Resized" className="image-preview" />}
      </div>
      <div className="controls-container">
        {generatedNotes.length > 0 && <PlayButton notes={generatedNotes} getSynth={getSynth} />}
      </div>
    </div>
  );


};

export default ImageToNotes;
