import React, { useState, useRef } from 'react';

const SHRUTHI_DATA = [
  { name: "S", ratio: 1, label: "Sa" },
  { name: "R1", ratio: 256/243, label: "Ri 1" },
  { name: "R2", ratio: 9/8, label: "Ri 2 / Ga 1" }, // Overlap
  { name: "R3", ratio: 32/27, label: "Ri 3 / Ga 2" }, // Overlap
  { name: "G3", ratio: 81/64, label: "Ga 3" },
  { name: "M1", ratio: 4/3, label: "Ma 1" },
  { name: "M2", ratio: 729/512, label: "Ma 2" },
  { name: "P", ratio: 3/2, label: "Pa" },
  { name: "D1", ratio: 128/81, label: "Da 1" },
  { name: "D2", ratio: 27/16, label: "Da 2 / Ni 1" }, // Overlap
  { name: "D3", ratio: 16/9, label: "Da 3 / Ni 2" }, // Overlap
  { name: "N3", ratio: 243/128, label: "Ni 3" },
];

export default function ShruthiBox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeRatio, setActiveRatio] = useState(1);
  const audioCtx = useRef(null);
  const nodes = useRef([]);

  const startDrone = (ratio) => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    stopDrone();

    const baseFreq = 130.81; // Base C3
    const freq = baseFreq * ratio;

    // Create a rich drone using Sa, Pa, and high Sa
    [1, 1.5, 2].forEach((mult, i) => {
      const osc = audioCtx.current.createOscillator();
      const gain = audioCtx.current.createGain();
      
      osc.type = i === 1 ? 'sawtooth' : 'triangle'; // Mix waves for texture
      osc.frequency.value = freq * mult;
      
      // Volume: lower for Sa' and Pa to avoid clipping
      const vol = i === 0 ? 0.1 : 0.05;

      gain.gain.setValueAtTime(0, audioCtx.current.currentTime);
      gain.gain.linearRampToValueAtTime(vol, audioCtx.current.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(audioCtx.current.destination);
      osc.start();
      nodes.current.push({ osc, gain });
    });
    setIsPlaying(true);
  };

  const stopDrone = () => {
    nodes.current.forEach(({ osc, gain }) => {
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.current.currentTime + 0.1);
      osc.stop(audioCtx.current.currentTime + 0.2);
    });
    nodes.current = [];
    setIsPlaying(false);
  };

  const handleNoteClick = (ratio) => {
    setActiveRatio(ratio);
    if (isPlaying) startDrone(ratio);
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-700 max-w-md mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-orange-400 tracking-widest">SHRUTHI BOX</h2>
        <button 
          onClick={isPlaying ? stopDrone : () => startDrone(activeRatio)}
          className={`px-6 py-2 rounded-full font-bold transition-all ${
            isPlaying 
            ? "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
            : "bg-emerald-500 hover:bg-emerald-600 text-white"
          }`}
        >
          {isPlaying ? "OFF" : "ON"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {SHRUTHI_DATA.map((note) => (
          <button
            key={note.name}
            onClick={() => handleNoteClick(note.ratio)}
            className={`p-3 rounded-lg border text-xs font-medium transition-all duration-200 ${
              activeRatio === note.ratio
                ? "bg-orange-500/20 border-orange-500 text-orange-400 shadow-inner"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
            }`}
          >
            <div className="text-[10px] opacity-60 mb-1">{note.name}</div>
            <div className="font-bold text-sm">{note.label}</div>
          </button>
        ))}
      </div>
      
      <p className="text-[10px] text-slate-500 mt-4 text-center italic">
        * R2/G1, R3/G2, D2/N1, D3/N2 share frequencies in the 12-tone scale.
      </p>
    </div>
  );
}