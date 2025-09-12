import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-4 mt-10 sm:mt-20">
      <div className="absolute inset-0 flex justify-center">
        <div className="h-full w-full rounded-full bg-yellow-500/20 blur-3xl"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 py-40 text-center md:space-y-8">
        <h1 className="text-3xl font-bold tracking-widest sm:text-4xl lg:text-6xl">
          Minimal Kings League IT
        </h1>
        <p className="text-sm font-light sm:max-w-xl sm:text-base lg:text-lg">
          Scopri rapidamente tutte le squadre della Kings League Italia, con
          informazioni essenziali e divisione per ruoli.
        </p>
        <p className="text-xs text-neutral-300 sm:text-sm">
          * Tutte le informazioni sulle squadre e giocatori sono inserite da me.
          I tempi di aggiornamento delle squadre variano in base alla mia
          disponibilità.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/teams"
            className="rounded-lg border border-neutral-400 px-4 py-2 text-base transition-transform duration-300 hover:scale-105 focus:ring-2 focus:ring-neutral-500 focus:outline-none sm:text-lg"
          >
            Squadre
          </Link>
          <Link
            href="/players"
            className="rounded-lg bg-yellow-500 px-4 py-2 text-base transition-transform duration-300 hover:scale-105 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none sm:text-lg"
          >
            Giocatori
          </Link>
        </div>
      </div>
    </section>
  );
}
