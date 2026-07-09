const links = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ name }) {
  return (
    <header className="sticky top-0 z-50 border-b border-blueprint-line/10 bg-blueprint-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-sm tracking-wide text-blueprint-line hover:text-blueprint-accent"
        >
          {name.split(' ').map((n) => n[0]).join('')}
          <span className="text-blueprint-accent">.</span>
        </a>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-wide text-blueprint-slate transition-colors hover:text-blueprint-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
