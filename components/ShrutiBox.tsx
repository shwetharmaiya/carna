"use client"
import { useRef, useState } from "react"

export default function ShrutiBox() {
  const [pitch, setPitch] = useState("C");
  const [isOn, setIsOn] = useState(false);
  const oscs = useRef<OscillatorNode[]>([]);
  const ctx = useRef<AudioContext | null>(null);

  const toggle = () => {
    if (isOn) { oscs.current.forEach(o => o.stop()); setIsOn(false); } 
    else {
      ctx.current = new AudioContext();
      [1, 1.5, 2].forEach(m => {
        const o = ctx.current!.createOscillator();
        o.frequency.value = 261.63 * m; // Basic logic simplified for length
        o.connect(ctx.current!.destination);
        o.start(); oscs.current.push(o);
      });
      setIsOn(true);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-black/20 p-2 pl-4 rounded-full border border-white/5">
      <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">Master Shruti</span>
      <button onClick={toggle} className={`px-6 py-2 rounded-full font-bold transition-all ${isOn ? "bg-orange-500 shadow-[0_0_15px_orange]" : "bg-slate-700"}`}>
        {isOn ? "DRONE ON" : "DRONE OFF"}
      </button>
    </div>
  );
}