"use client";
import Link from "next/link";
// Assuming you have your ragas data
const ragas = [
  { name: "Mayamalavagowla", slug: "mayamalavagowla", arohanam: "S R1 G3 M1 P D1 N3 S" },
  { name: "Kalyani", slug: "kalyani", arohanam: "S R1 G2 M1 P D1 N2 S" },
  { name: "Shankarabharanam", slug: "shankarabharanam", arohanam: "S R2 G3 M1 P D2 N3 S" },
];

export default function RagaExplorer() {
  return (
    <div className="bg-[#1a1d23] rounded-[2.5rem] p-8 border border-white/5">
      <h3 className="text-orange-500 text-xs tracking-[0.3em] font-bold uppercase mb-6">Raga Explorer</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ragas.map(r => (
          <Link key={r.slug} href={`/ragas/${r.slug}`} className="group p-6 rounded-2xl bg-white/5 hover:bg-orange-500 transition-all">
            <h4 className="text-xl font-bold group-hover:text-white">{r.name}</h4>
            <p className="text-xs text-slate-500 group-hover:text-orange-100 mt-2 font-mono uppercase tracking-tighter">{r.arohanam}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}