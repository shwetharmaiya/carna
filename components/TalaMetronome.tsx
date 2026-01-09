"use client";
import { useRef, useState, useEffect } from "react";

const TALAS = { "Adi": 8, "Rupaka": 3, "Misra Chapu": 7 };

export default function TalaMetronome() {
  const [tala, setTala] = useState<keyof typeof TALAS>("Adi");
  const [bpm, setBpm] = useState(80);
  const [beat, setBeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const click = (isSamam: boolean) => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.frequency.value = isSamam ? 1000 : 600;
    const gain = ctx.createGain();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.1);
  };

  const toggle = () => {
    if (isPlaying) { clearInterval(timer.current!); setIsPlaying(false); setBeat(0); } 
    else {
      setIsPlaying(true);
      let b = 0; click(true);
      timer.current = setInterval(() => {
        b = (b + 1) % TALAS[tala]; setBeat(b); click(b === 0);
      }, 60000/bpm);
    }
  };

  return (
    <div className="bg-[#1a1d23] rounded-[2.5rem] p-8 border border-white/5 h-full flex flex-col justify-between shadow-xl">
      <h3 className="text-orange-500 text-xs tracking-[0.3em] font-bold uppercase mb-8">Tāla Metronome</h3>
      <div className="flex justify-center gap-3 mb-8">
        {Array.from({ length: TALAS[tala] }).map((_, i) => (
          <div key={i} className={`w-3 h-12 rounded-full transition-all ${i === beat ? "bg-orange-500 scale-y-125 shadow-[0_0_15px_orange]" : "bg-slate-800"}`} />
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <select className="bg-slate-800 p-2 rounded-lg text-sm" onChange={e => setTala(e.target.value as any)}>
            {Object.keys(TALAS).map(t => <option key={t}>{t}</option>)}
          </select>
          <span className="text-3xl font-mono font-bold">{bpm} <span className="text-xs text-slate-500">BPM</span></span>
        </div>
        <input type="range" min="40" max="200" value={bpm} onChange={e => setBpm(+e.target.value)} className="w-full accent-orange-500" />
        <button onClick={toggle} className={`w-full py-4 rounded-xl font-bold ${isPlaying ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-orange-500 text-white"}`}>
          {isPlaying ? "STOP" : "START"}
        </button>
      </div>
    </div>
  );
}