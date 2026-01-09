"use client";
import { useState, useRef } from "react";
// 1. Define the props interface (optional but helpful for TypeScript)
interface SwaraPlayerProps {
  baseFreq?: number;
  ragaContext?: {
    name: string;
    arohanam: string;
    // ... other raga fields
  } | null;
}

const SWARAS = [
  { name: "Sa", ratio: 1 }, { name: "Ri", ratio: 9/8 }, { name: "Ga", ratio: 5/4 },
  { name: "Ma", ratio: 4/3 }, { name: "Pa", ratio: 3/2 }, { name: "Da", ratio: 5/3 },
  { name: "Ni", ratio: 15/8 }, { name: "Sa'", ratio: 2 }
];

const SWARA_DETAILS: Record<string, { full: string; svara: string }> = {
  "Sa": { full: "Shadjam", svara: "S" },
  "R1": { full: "Shuddha Rishabham", svara: "Ri" },
  "R2": { full: "Chatushruti Rishabham", svara: "Ri" },
  "G2": { full: "Sadharana Gandharam", svara: "Ga" },
  "G3": { full: "Antara Gandharam", svara: "Ga" },
  "M1": { full: "Shuddha Madhyamam", svara: "Ma" },
  "M2": { full: "Prati Madhyamam", svara: "Ma" },
  "Pa": { full: "Panchamam", svara: "Pa" },
  "D1": { full: "Shuddha Dhaivatam", svara: "Da" },
  "D2": { full: "Chatushruti Dhaivatam", svara: "Da" },
  "N2": { full: "Kaishiki Nishadam", svara: "Ni" },
  "N3": { full: "Kakali Nishadam", svara: "Ni" },
  "Sa'": { full: "Tara Shadjam", svara: "S" },
};

export default function SwaraPlayer({ baseFreq = 261.63, ragaContext = null }: SwaraPlayerProps) {
  const [active, setActive] = useState<string | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const [learnMode, setLearnMode] = useState(false);  

  // 3. This logic now has access to ragaContext
  const isIncluded = (swaraName: string) => {
    if (!ragaContext) return true; // If we're on the home page, show all keys
    
    // Check if the swara (e.g., "R2") exists in the Arohanam string (e.g., "S R2 G3...")
    // We use a regex or space-split to ensure "R1" doesn't match "R12"
    const notesInRaga = ragaContext.arohanam.split(" ");
    return notesInRaga.includes(swaraName) || swaraName === "Sa" || swaraName === "Sa'";
  };

  const getFrequency = (swaraKey: string) => {
    const baseMap: Record<string, number> = {
      "Sa": 1, "R1": 256/243, "R2": 9/8, "G2": 32/27, "G3": 5/4,
      "M1": 4/3, "M2": 45/32, "Pa": 3/2, "D1": 128/81, "D2": 5/3,
      "N2": 16/15, "N3": 15/8, "Sa'": 2
    };
    return baseFreq * (baseMap[swaraKey] || 1);
  };
 
  const play = (freq: number, name: string) => {
    if (!audioCtx.current) audioCtx.current = new AudioContext();
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.linearRampToValueAtTime(0.3, audioCtx.current.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.8);
    osc.connect(gain).connect(audioCtx.current.destination);
    osc.start(); osc.stop(audioCtx.current.currentTime + 0.8);
    setActive(name);
    setTimeout(() => setActive(null), 800);
  };

  return (
   <div className="bg-white dark:bg-carna-card rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-xl transition-all">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-carna-accent text-xs tracking-[0.3em] font-bold uppercase">
            {ragaContext ? `Scale: ${ragaContext.name}` : "Interactive Swara Pad"}
          </h3>
        </div>
        
        {/* Learn Mode Toggle */}
        <button 
          onClick={() => setLearnMode(!learnMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
  learnMode 
    ? "bg-carna-accent border-carna-accent text-white shadow-lg shadow-orange-500/20" 
    : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"
}`}
        >
          <div className={`w-2 h-2 rounded-full ${learnMode ? "bg-white animate-pulse" : "bg-slate-400"}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Learn Mode</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(SWARA_DETAILS).map((key) => {
          const included = isIncluded(key);
          const detail = SWARA_DETAILS[key];
          
          return (
            <button 
              key={key}
              disabled={!included}
              onMouseDown={() => included && play(getFrequency(key), key)}
              className={`group relative h-28 rounded-2xl transition-all flex flex-col items-center justify-center overflow-hidden border
  ${!included 
    ? 'opacity-10 grayscale cursor-not-allowed bg-slate-100 dark:bg-slate-800/20 border-transparent' 
    : active === key 
      ? 'bg-carna-accent border-carna-accent text-white scale-95 shadow-inner' 
      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-carna-accent shadow-sm'
  }
`}
            >
              <span className={`text-2xl font-bold transition-transform ${learnMode ? "-translate-y-2" : ""}`}>
                {key}
              </span>
              
              {/* Detailed Name Overlay */}
              <div className={`absolute bottom-3 left-0 right-0 px-2 transition-all duration-300 ${
                learnMode ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
              }`}>
                <p className="text-[8px] leading-tight uppercase font-bold tracking-tighter text-center opacity-70">
                  {detail.full}
                </p>
              </div>

              {/* Decorative "Note Strength" bar */}
              {included && (
                <div className={`absolute bottom-0 left-0 h-1 bg-carna-accent transition-all ${active === key ? "w-full" : "w-0"}`} />
              )}
            </button>
          );
        })}
      </div>
      
      {learnMode && (
        <div className="mt-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-[11px] text-slate-500 italic text-center">
          Note: In Carnatic music, swara positions (Sthanas) vary based on the Raga's grammar.
        </div>
      )}
    </div>
  );
}