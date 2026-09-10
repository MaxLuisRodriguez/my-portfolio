import type { Project, ProjectLink } from '../data/portfolio'
import { ArrowUpRight, Code, ExternalLink, FileText } from './Icons'
import ProjectVisual from './ProjectVisual'

type ProjectCardProps = {
  project: Project
  featured?: boolean
  reverse?: boolean
}

function resolveHref(href: string) {
  if (href.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${href.slice(1)}`
  }
  return href
}

function LinkIcon({ kind }: Pick<ProjectLink, 'kind'>) {
  if (kind === 'paper') return <FileText />
  if (kind === 'code') return <Code />
  return <ExternalLink />
}

export default function ProjectCard({ project, featured = false, reverse = false }: ProjectCardProps) {
  return (
    <article
      className={[
        'project-card',
        featured ? 'project-card--featured' : '',
        reverse ? 'project-card--reverse' : '',
      ].filter(Boolean).join(' ')}
      id={project.id}
      data-reveal
    >
      <div className="project-card__visual">
        <ProjectVisual type={project.visual} />
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-number">{project.number}</span>
          <span>{project.context}</span>
          <span>{project.period}</span>
        </div>

        <h3>{project.title}</h3>
        <p className="project-role">{project.role}</p>
        <p className="project-card__summary">{project.summary}</p>

        <dl className="project-metrics" aria-label={`${project.shortTitle} results`}>
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </div>
          ))}
        </dl>

        <details className="project-disclosure">
        <summary>Explore the method & findings</summary>
        <div className="project-narrative">
          <div>
            <h4>Problem</h4>
            <p>{project.challenge}</p>
          </div>
          <div>
            <h4>System</h4>
            <p>{project.approach}</p>
          </div>
          <div>
            <h4>Outcome</h4>
            <p>{project.result}</p>
          </div>
        </div>
        </details>

        <div className="project-card__footer">
          <ul className="technology-list" aria-label="Technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>

          <div className="project-links">
            {project.links.map((link) => {
              const href = resolveHref(link.href)
              return (
                <a
                  key={link.label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon kind={link.kind} />
                  <span>{link.label}</span>
                  <ArrowUpRight className="project-link__arrow" size={16} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </article>
  )
}
