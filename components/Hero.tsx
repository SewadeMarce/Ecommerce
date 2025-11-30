import { Sparkles } from "lucide-react";
import Link from "next/link";

// ---------- Hero ----------
export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-10 md:p-16 shadow-xl">
      <div className="max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
          <Sparkles className="w-4 h-4" /> Collection Été 2025
        </div>
        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
          Style, confort et performance réunis
        </h1>
        <p className="mt-3 md:mt-4 text-white/80">
          Découvrez des essentiels modernes conçus pour durer — livraison gratuite dès 150$ et retours 30 jours.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={'/catalog'} 
           className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-semibold shadow">
            Voir le catalogue
          </Link>
          <Link href={'catalog'} className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-white/10 font-semibold">
            Nouveautés
          </Link>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 opacity-20 text-[240px] leading-none select-none">
        AETHER
      </div>
    </section>
  );
}