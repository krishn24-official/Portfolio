export default function Footer({ name }) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-blueprint-line/10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 font-mono text-xs text-blueprint-slate sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {name}. Built with React, Redux Thunk &amp; Tailwind CSS.
        </p>
        <p className="text-blueprint-slate/60">Rev. drawn by hand, no templates used.</p>
      </div>
    </footer>
  )
}
