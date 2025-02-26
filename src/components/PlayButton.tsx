import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import "../../styles/PlayButton.css";

type PlayButtonProps = {
  notes: string[];
  getSynth: () => Tone.Synth | Tone.FMSynth | Tone.AMSynth | Tone.DuoSynth | Tone.MonoSynth;
};

const PlayButton: React.FC<PlayButtonProps> = ({ notes, getSynth }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [part, setPart] = useState<Tone.Part | null>(null);

  useEffect(() => {
    if (notes.length > 0) {
      const synth = getSynth();
      const newPart = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note, "8n", time);
      }, notes.map((note, index) => [index * 0.5, note]));

      newPart.loop = false;
      setPart(newPart);
    }
  }, [notes, getSynth]);

  const handlePlayPause = async () => {
    await Tone.start();
    if (!isPlaying) {
      Tone.Transport.start();
      part?.start(0);
      setIsPlaying(true);
      setIsPaused(false);
    } else if (isPaused) {
      Tone.Transport.start();
      setIsPaused(false);
    } else {
      Tone.Transport.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    Tone.Transport.stop();
    part?.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div>
      <button
        onClick={handlePlayPause}
        className={`play-button ${isPlaying ? "active" : ""}`}
      >
        {isPlaying && !isPaused ? "Pause" : "Play"}
      </button>
      {isPlaying && (
        <button
          onClick={handleStop}
          className={`stop-button ${isPlaying ? "active" : ""}`}
        >
          Stop
        </button>
      )}
    </div>
  );
};

export default PlayButton;
