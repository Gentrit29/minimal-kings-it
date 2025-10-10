import Link from "next/link";
import { Button } from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div className="text-foreground flex flex-col items-center justify-center space-y-6 px-5 text-center sm:px-0 md:space-y-8">
        <h1 className="text-3xl font-bold tracking-widest sm:text-4xl lg:text-6xl">
          Minimal Kings League IT
        </h1>
        <p className="text-sm font-light sm:max-w-xl sm:text-base lg:text-lg">
          Scopri rapidamente tutte le squadre della Kings League Italia, con
          informazioni essenziali e divisione per ruoli.
        </p>
        <p className="text-xs sm:text-sm">
          * Tutte le informazioni sulle squadre e giocatori sono gestite da me.
          I tempi di aggiornamento delle squadre variano in base alla mia
          disponibilità.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button asChild variant="default">
            <Link href="/teams">Squadre</Link>
          </Button>
          <Button asChild variant="default">
            <Link href="/presidents">Presidenti</Link>
          </Button>
          <Button asChild variant="default">
            <Link href="/rosters">Rosters</Link>
          </Button>
          <Button asChild variant="default">
            <Link href="/splits">Splits</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
