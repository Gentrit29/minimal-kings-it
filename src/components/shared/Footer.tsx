export default function Footer() {
  return (
    <footer className="bg-background border-border border-t py-6">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="text-center text-sm">
          Minimal Kings IT - Sviluppato da{" "}
          <a
            href="https://github.com/Gentrit29"
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary underline-offset-4 hover:underline"
          >
            Gentrit
          </a>
        </div>
        <div className="text-muted-foreground text-center text-xs sm:text-right">
          Questo è un progetto personale e di conseguenza non è affiliato con
          Kings League. Tutti i marchi, loghi e nomi citati appartengono ai
          rispettivi proprietari. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
