import React, { useState } from "react";
import * as Tone from "tone";
import ImageToNotes from "./ImageToNotes";
import "../../styles/SynthChoice.css";

const synthOptions = ["Synth", "FM_Synth", "AM_Synth", "Duo_Synth", "Mono_Synth"];

const SynthChoice: React.FC<{ imageFile: File | null }> = ({ imageFile }) => {
  const [selectedSynth, setSelectedSynth] = useState("Synth");

  const getSynth = () => {
    switch (selectedSynth) {
      case "FM_Synth": return new Tone.FMSynth().toDestination();
      case "AM_Synth": return new Tone.AMSynth().toDestination();
      case "Duo_Synth": return new Tone.DuoSynth().toDestination();
      case "Mono_Synth": return new Tone.MonoSynth().toDestination();
      default: return new Tone.Synth().toDestination();
    }
  };

  return (
    <div className="synth-choice">
      <div className="synth-container">
        <div className="left-panel">
          <h3>Choose a Synth</h3>
          <div className="synth-buttons">
            {synthOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedSynth(option)}
                className={`synth-button ${selectedSynth === option ? "active" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="right-panel">
          {imageFile ? (
            <ImageToNotes imageFile={imageFile} getSynth={getSynth} />
          ) : (
            <div className="image-placeholder">No Image Uploaded</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SynthChoice;
