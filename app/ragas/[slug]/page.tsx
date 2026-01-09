"use client";
import { ragas } from "@/components/data/ragas";
import { notFound } from "next/navigation";
import Link from "next/link";
import SwaraPlayer from "@/components/SwaraPlayer";

export default function RagaPage({ params }: { params: { slug: string } }) {
  const raga = ragas.find((r) => r.slug === params.slug);

  if (!raga) notFound();

  return (
    <main className="min-h-screen bg-[#fcfaf7] dark:bg-carna-bg text-slate-900 dark:text-carna-text p-4 md:p-12 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb & Navigation */}
        <Link href="/" className="text-carna-accent text-sm font-bold flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Studio
        </Link>

        {/* Hero Section */}
        <section className="bg-white dark:bg-carna-card rounded-[3rem] p-10 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-[12rem] font-black text-slate-100 dark:text-white/5 pointer-events-none">
            {raga.melakarta}
          </div>
          
          <div className="relative z-10">
            <span className="text-carna-accent font-mono tracking-widest uppercase text-xs">Melakarta #{raga.melakarta}</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mt-2 dark:text-white">{raga.name}</h1>
            <p className="text-slate-500 mt-4 max-w-xl italic">Commonly associated with the compositions of {raga.composer}.</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Scales & Player */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-carna-card rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-xl">
              <h3 className="text-carna-accent text-xs tracking-[0.3em] font-bold uppercase mb-6">Scale Reference</h3>
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Arohanam</span>
                  <p className="text-3xl font-mono text-carna-accent">{raga.arohanam}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Avarohanam</span>
                  <p className="text-3xl font-mono dark:text-white">{raga.avarohanam}</p>
                </div>
              </div>
            </div>

            {/* Specialized Swara Player for this Raga */}
            <SwaraPlayer ragaContext={raga} />
          </div>

          {/* Right: Compositions */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-carna-card rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-xl h-full">
              <h3 className="text-carna-accent text-xs tracking-[0.3em] font-bold uppercase mb-6">Compositions</h3>
              <div className="space-y-4">
                {raga.compositions.map((comp, i) => (
                  <a 
                    key={i}
                    href={comp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-orange-500/10 border border-transparent hover:border-carna-accent transition-all group"
                  >
                    <p className="font-bold group-hover:text-carna-accent transition-colors">{comp.title}</p>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Listen on YouTube ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}