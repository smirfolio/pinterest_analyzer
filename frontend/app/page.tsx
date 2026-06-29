import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center">
      <section className="mt-10 sm:mt-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/40 dark:text-primary-200">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          Multimodal AI · GPT-4o vision
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
            AI-Powered Image Analysis
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Upload your marketing creatives. Get instant scoring on attractiveness, color
          balance, selling ideas, viral potential and more — then compare them side by
          side to pick the winner.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/analyzer" className="btn-primary">
            Get started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link href="/signin" className="btn-secondary">
            Sign in
          </Link>
        </div>
      </section>

      <section className="mt-20 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Multi-criteria scoring", body: "Seven scoring axes from attractiveness to value messaging." },
          { title: "Default & custom prompts", body: "Use the curated prompt or bring your own criteria." },
          { title: "Side-by-side comparison", body: "Spot the strongest performer per criterion in one view." },
          { title: "Drag-and-drop upload", body: "Drop multiple images at once — JPG, PNG, WEBP up to 10MB." },
          { title: "Per-image deep dive", body: "Expand each card for the full recommendation and rationale." },
          { title: "Built for marketers", body: "Designed for creative teams reviewing ad variants and A/B tests." },
        ].map((f) => (
          <div key={f.title} className="card p-6 text-left">
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}