import SectionLabel from './SectionLabel'
import ProjectCard from './ProjectCard'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <SectionLabel tag="Fig. 04" title="Projects" />
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
