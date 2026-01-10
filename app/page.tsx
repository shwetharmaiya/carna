"use client";
import SwaraPlayer from "@/components/SwaraPlayer";
import TalaMetronome from "@/components/TalaMetronome";
import RagaExplorer from "@/components/RagaExplorer";
import CircularChakraMap from "@/components/CircularChakraMap";
import ShrutiBox from "@/components/ShrutiBox";
import ThemeToggle from "@/components/ThemeToggle";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-slate-200 p-4 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-center 
                   bg-white dark:bg-[#1a1d23] 
                   text-slate-900 dark:text-slate-200
                   p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 
                   shadow-xl dark:shadow-2xl gap-6">
  <div>
    <h1 className="text-6xl font-serif font-bold text-orange-500 tracking-tighter">Carna</h1>
    <ThemeToggle />
  </div>
  <ShrutiBox/>
</header>

        {/* TOP ROW: EQUAL HEIGHT TOOLS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <SwaraPlayer />
          <TalaMetronome />
        </section>

        {/* MIDDLE ROW: RAGA EXPLORER */}
        <section>
          <RagaExplorer />
        </section>

        {/* BOTTOM ROW: CHAKRA MAP */}
        <section className="bg-[#1a1d23] rounded-[3rem] p-12 border border-white/5 shadow-inner flex flex-col items-center">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-light text-white">Melakarta Chakra Map</h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full" />
          </header>
          <div className="w-full flex justify-center">
            <CircularChakraMap />
          </div>
        </section>
      </div>
    </main>
  );
}