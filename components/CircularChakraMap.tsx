"use client";
import { useState } from "react";

const RADIUS = 150;
const CENTER = 200;
const CHAKRAS = [
  { name: "Indu", numbers: [1,2,3,4,5,6] }, { name: "Netra", numbers: [7,8,9,10,11,12] },
  { name: "Agni", numbers: [13,14,15,16,17,18] }, { name: "Veda", numbers: [19,20,21,22,23,24] },
  { name: "Bana", numbers: [25,26,27,28,29,30] }, { name: "Ritu", numbers: [31,32,33,34,35,36] },
  { name: "Rishi", numbers: [37,38,39,40,41,42] }, { name: "Vasu", numbers: [43,44,45,46,47,48] },
  { name: "Brahma", numbers: [49,50,51,52,53,54] }, { name: "Disi", numbers: [55,56,57,58,59,60] },
  { name: "Rudra", numbers: [61,62,63,64,65,66] }, { name: "Aditya", numbers: [67,68,69,70,71,72] }
];

export default function CircularChakraMap() {
  const [active, setActive] = useState<number | null>(null);

  const describeArc = (startAngle: number, endAngle: number) => {
    const start = { x: CENTER + RADIUS * Math.cos((endAngle - 90) * Math.PI / 180), y: CENTER + RADIUS * Math.sin((endAngle - 90) * Math.PI / 180) };
    const end = { x: CENTER + RADIUS * Math.cos((startAngle - 90) * Math.PI / 180), y: CENTER + RADIUS * Math.sin((startAngle - 90) * Math.PI / 180) };
    return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 0 ${end.x} ${end.y} Z`;
  };

  return (
    <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-2xl overflow-visible">
      {CHAKRAS.map((c, i) => (
        <path 
          key={c.name} d={describeArc(i * 30, (i + 1) * 30)} 
          fill={active === i ? "#f97316" : "#1e293b"} 
          stroke="#0f1115" strokeWidth="2" 
          onClick={() => setActive(i)}
          className="cursor-pointer transition-all duration-300 hover:fill-orange-400"
        />
      ))}
      <circle cx="200" cy="200" r="70" fill="#0f1115" />
      {active !== null && (
        <g>
          <text x="200" y="195" textAnchor="middle" fill="white" className="text-xl font-bold uppercase">{CHAKRAS[active].name}</text>
          <text x="200" y="215" textAnchor="middle" fill="#f97316" className="text-xs font-mono">{CHAKRAS[active].numbers.join(", ")}</text>
        </g>
      )}
    </svg>
  );
}