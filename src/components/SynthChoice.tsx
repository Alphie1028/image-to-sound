import React, { useState } from "react";
import * as Tone from "tone";
import ImageToNotes from "./ImageToNotes";

const synthOptions = ["Synth", "FMSynth", "AMSynth", "DuoSynth", "MonoSynth"];

const SynthChoice: React.FC<{ imageFile: File }> = ({ imageFile }) => {
  const [selectedSynth, setSelectedSynth] = useState("Synth");

  const getSynth = () => {
    switch (selectedSynth) {
      case "FMSynth":
        return new Tone.FMSynth().toDestination();
      case "AMSynth":
        return new Tone.AMSynth().toDestination();
      case "DuoSynth":
        return new Tone.DuoSynth().toDestination();
      case "MonoSynth":
        return new Tone.MonoSynth().toDestination();
      default:
        return new Tone.Synth().toDestination();
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Choose a Synthesizer</h2>
      <div className="flex space-x-2">
        {synthOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedSynth(option)}
            className={`px-4 py-2 rounded-md ${
              selectedSynth === option ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <ImageToNotes imageFile={imageFile} getSynth={getSynth} />
    </div>
  );
};

export default SynthChoice;
