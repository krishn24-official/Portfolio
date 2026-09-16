export default function TitleBlock({ name, role, location, availability = 'Immediate' }) {
  return (
    <div
      className="w-full max-w-xs border border-blueprint-line/30 font-mono text-xs text-blueprint-slate"
      aria-label="Title block"
    >
      <div className="grid grid-cols-2 border-b border-blueprint-line/30">
        <div className="border-r border-blueprint-line/30 px-3 py-2">
          <p className="uppercase tracking-wide text-[10px] text-blueprint-slate/70">Drawn by</p>
          <p className="text-blueprint-line">{name}</p>
        </div>
        <div className="px-3 py-2">
          <p className="uppercase tracking-wide text-[10px] text-blueprint-slate/70">Discipline</p>
          <p className="text-blueprint-line">{role}</p>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="border-r border-blueprint-line/30 px-3 py-2">
          <p className="uppercase tracking-wide text-[10px] text-blueprint-slate/70">Location</p>
          <p className="text-blueprint-line">{location}</p>
        </div>
        <div className="px-3 py-2">
          <p className="uppercase tracking-wide text-[10px] text-blueprint-slate/70">Availability</p>
          <p className="text-blueprint-line">{availability}</p>
        </div>
      </div>
    </div>
  )
}
