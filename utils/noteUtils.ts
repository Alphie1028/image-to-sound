export const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

export const mapColorToNote = (r: number): string => {
  const index = Math.floor((r / 255) * (notes.length - 1));
  return notes[index];
};
