export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blueprint-bg">
      <div className="flex flex-col items-center gap-4 font-mono text-sm text-blueprint-slate">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blueprint-line/20 border-t-blueprint-accent" />
        <p>loading portfolio data…</p>
      </div>
    </div>
  )
}
