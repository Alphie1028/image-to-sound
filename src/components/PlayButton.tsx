import React, { useState, useEffect } from "react";
import * as Tone from "tone";

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
        className={`mt-4 px-4 py-2 ${isPlaying ? "bg-gray-400" : "bg-green-500"} text-white rounded-md`}
      >
        {isPlaying && !isPaused ? "Pause" : "Play"}
      </button>
      {isPlaying && (
        <button
          onClick={handleStop}
          className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Stop
        </button>
      )}
    </div>
  );
};

export default PlayButton;
