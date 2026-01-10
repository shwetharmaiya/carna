"use client";
import { useState } from "react";

const RADIUS = 150;
const CENTER = 200;

// Updated data with the 6 Ragas associated with each Chakra
const CHAKRAS = [
  { name: "Indu", numbers: [1, 2, 3, 4, 5, 6], ragas: ["Kanakangi", "Ratnangi", "Ganamurti", "Vanaspati", "Manavati", "Tanarupi"] },
  { name: "Netra", numbers: [7, 8, 9, 10, 11, 12], ragas: ["Senavati", "Hanumatodi", "Dhenuka", "Natakapriya", "Kokilapriya", "Rupavati"] },
  { name: "Agni", numbers: [13, 14, 15, 16, 17, 18], ragas: ["Gayakapriya", "Vakulabharanam", "Mayamalavagowla", "Chakravakam", "Suryakantam", "Hatakambari"] },
  { name: "Veda", numbers: [19, 20, 21, 22, 23, 24], ragas: ["Jhankaradhwani", "Natabhairavi", "Keeravani", "Kharaharapriya", "Gourimanohari", "Varunapriya"] },
  { name: "Bana", numbers: [25, 26, 27, 28, 29, 30], ragas: ["Mararanjani", "Charukesi", "Sarasangi", "Harikambhoji", "Dheerasankarabharanam", "Naganandini"] },
  { name: "Ritu", numbers: [31, 32, 33, 34, 35, 36], ragas: ["Yagapriya", "Ragavardhini", "Gangeyabhushani", "Vagadheeswari", "Shulini", "Chalanata"] },
  { name: "Rishi", numbers: [37, 38, 39, 40, 41, 42], ragas: ["Salagam", "Jalarnavam", "Jhalavarali", "Navaneetam", "Pavani", "Raghupriya"] },
  { name: "Vasu", numbers: [43, 44, 45, 46, 47, 48], ragas: ["Gavambhodhi", "Bhavapriya", "Shubhapantuvavali", "Shadvidhamargini", "Suvarnangi", "Divyamani"] },
  { name: "Brahma", numbers: [49, 50, 51, 52, 53, 54], ragas: ["Dhavalambari", "Namanarayani", "Kamavardhini", "Ramapriya", "Gamanashrama", "Vishwambari"] },
  { name: "Disi", numbers: [55, 56, 57, 58, 59, 60], ragas: ["Shyamalangi", "Shanmukhapriya", "Simhendramadhyamam", "Hemavati", "Dharmavati", "Neetimati"] },
  { name: "Rudra", numbers: [61, 62, 63, 64, 65, 66], ragas: ["Kantamani", "Rishabhapriya", "Latangi", "Vachaspati", "Mechakalyani", "Chitrambari"] },
  { name: "Aditya", numbers: [67, 68, 69, 70, 71, 72], ragas: ["Sucharitra", "Jyotiswarupini", "Dhatuvardhani", "Nasikabhushani", "Kosalam", "Rasikapriya"] }
];

export default function CircularChakraMap() {
  const [active, setActive] = useState<number | null>(null);

  const describeArc = (startAngle: number, endAngle: number) => {
    const start = { 
      x: CENTER + RADIUS * Math.cos((endAngle - 90) * Math.PI / 180), 
      y: CENTER + RADIUS * Math.sin((endAngle - 90) * Math.PI / 180) 
    };
    const end = { 
      x: CENTER + RADIUS * Math.cos((startAngle - 90) * Math.PI / 180), 
      y: CENTER + RADIUS * Math.sin((startAngle - 90) * Math.PI / 180) 
    };
    return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 0 ${end.x} ${end.y} Z`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-12 p-8 bg-slate-950 rounded-xl">
      {/* SVG Container */}
      <div className="relative">
        <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-2xl overflow-visible">
          {CHAKRAS.map((c, i) => (
            <path 
              key={c.name} 
              d={describeArc(i * 30, (i + 1) * 30)} 
              fill={active === i ? "#f97316" : "#1e293b"} 
              stroke="#0f1115" 
              strokeWidth="2" 
              onClick={() => setActive(i)}
              className="cursor-pointer transition-all duration-300 hover:fill-orange-500"
            />
          ))}
          {/* Inner Circle Hub */}
          <circle cx="200" cy="200" r="70" fill="#0f1115" />
          
          {/* Central Chakra Name */}
          {active !== null && (
            <text x="200" y="205" textAnchor="middle" fill="white" className="text-xl font-bold uppercase pointer-events-none">
              {CHAKRAS[active].name}
            </text>
          )}
        </svg>
      </div>

      {/* Raga Details Panel */}
      <div className="min-w-[280px] h-[400px] flex flex-col justify-center border-l border-slate-800 pl-8">
        {active !== null ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-orange-500 text-sm font-mono tracking-widest uppercase mb-1">
              Chakra {active + 1}
            </h2>
            <h1 className="text-white text-3xl font-bold mb-6">
              {CHAKRAS[active].name} <span className="text-slate-500">Chakra</span>
            </h1>
            
            <ul className="space-y-3">
              {CHAKRAS[active].ragas.map((raga, idx) => (
                <li key={raga} className="flex items-center gap-4 group">
                  <span className="text-slate-600 text-xs font-mono w-4">
                    {CHAKRAS[active].numbers[idx]}
                  </span>
                  <span className="text-slate-200 group-hover:text-orange-400 transition-colors">
                    {raga}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-slate-500 italic">Select a chakra to view its Melakarta ragas</p>
        )}
      </div>
    </div>
  );
}