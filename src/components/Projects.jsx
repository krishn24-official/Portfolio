import SectionLabel from './SectionLabel'
import ProjectCard from './ProjectCard'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="reveal-on-scroll mx-auto max-w-5xl px-6 py-20">
      <SectionLabel tag="Fig. 06" title="Projects" />
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
