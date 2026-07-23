import { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { ArrowRight, ArrowUpRight } from './components/Icons'
import ProjectCard from './components/ProjectCard'
import { archive, capabilities, experience, projects, socialLinks } from './data/portfolio'

function resolveHref(href: string) {
  if (href.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${href.slice(1)}`
  }
  return href
}

function App() {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.html`
  const headshotUrl = `${import.meta.env.BASE_URL}images/headshot.jpg`
  const stanfordPhotoUrl = `${import.meta.env.BASE_URL}images/stanford-photo.jpg`

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__grid">
            <div className="hero__content">
              <div className="hero__eyebrow">
                <span className="status-dot" aria-hidden="true" />
                <span>Machine learning engineer · AI researcher · pianist</span>
              </div>

              <h1 id="hero-title">
                Building intelligent systems around how people
                <em> learn, decide, and create.</em>
              </h1>

              <p className="hero__lede">
                Stanford CS master’s student and Symbolic Systems honors graduate working across
                LLM agents, recommender systems, and human-centered AI.
              </p>

              <div className="hero__actions">
                <a className="button button--primary" href="#work">
                  Explore selected work
                  <ArrowRight />
                </a>
                <a className="button button--quiet" href={resumeUrl}>
                  View résumé
                  <ArrowUpRight />
                </a>
              </div>

              <div className="hero__socials" aria-label="Social links">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {link.label}
                    {link.href.startsWith('http') && <ArrowUpRight size={13} />}
                  </a>
                ))}
              </div>
            </div>

            <figure className="hero-portrait">
              <div className="hero-portrait__frame">
                <img
                  src={headshotUrl}
                  alt="Portrait of Max Rodriguez"
                  width="1170"
                  height="986"
                  fetchPriority="high"
                />
                <div className="portrait-stamp" aria-hidden="true">
                  <span>Stanford</span>
                  <strong>’26</strong>
                </div>
              </div>
              <figcaption>
                <span>Currently</span>
                <strong>Building commercial AI workflows at Bonterra</strong>
              </figcaption>
            </figure>
          </div>

          <div className="proof-bar" aria-label="Selected credentials and results">
            <div>
              <span>Education</span>
              <strong>B.S. Symbolic Systems, Honors</strong>
            </div>
            <div>
              <span>Agent research</span>
              <strong>91.3% WebShop success</strong>
            </div>
            <div>
              <span>Multimodal research</span>
              <strong>1M+ motion windows</strong>
            </div>
            <div>
              <span>Recommender systems</span>
              <strong>0.834 holdout AUC</strong>
            </div>
          </div>
        </section>

        <section className="section section--work" id="work" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <div>
              <span className="section-index">01 / SELECTED WORK</span>
              <h2 id="work-title">Research that ships ideas, not just models.</h2>
            </div>
            <p>
              Selected systems spanning agentic reinforcement learning, multimodal feedback,
              scalable recommendation, and compact-model reasoning.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={index < 2}
                reverse={index === 1}
              />
            ))}
          </div>
        </section>

        <section className="section section--experience" id="experience" aria-labelledby="experience-title">
          <div className="section-heading section-heading--light" data-reveal>
            <div>
              <span className="section-index">02 / EXPERIENCE</span>
              <h2 id="experience-title">Across research labs, product teams, and early-stage companies.</h2>
            </div>
            <p>
              I work best where model quality, system constraints, and the lived reality of a user
              all matter at once.
            </p>
          </div>

          <ol className="experience-list">
            {experience.map((item, index) => (
              <li key={`${item.organization}-${item.role}`} data-reveal>
                <div className="experience-list__index">0{index + 1}</div>
                <div className="experience-list__period">{item.period}</div>
                <div className="experience-list__content">
                  <div className="experience-list__title">
                    <h3>{item.role}</h3>
                    <p>{item.organization}</p>
                  </div>
                  <p className="experience-list__summary">{item.summary}</p>
                  <ul>
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                {item.location && <div className="experience-list__location">{item.location}</div>}
              </li>
            ))}
          </ol>

          <div className="experience-cta" data-reveal>
            <p>Earlier: research at Stanford’s Hoover Institution and teaching piano at Stanford Music.</p>
            <a href={resumeUrl}>
              Full experience in résumé
              <ArrowUpRight />
            </a>
          </div>
        </section>

        <section className="section section--research" id="research" aria-labelledby="research-title">
          <div className="section-heading" data-reveal>
            <div>
              <span className="section-index">03 / RESEARCH ARCHIVE</span>
              <h2 id="research-title">More experiments, prototypes, and papers.</h2>
            </div>
            <p>
              The through-line is consistent: build technically rigorous tools that make difficult
              human skills more understandable and accessible.
            </p>
          </div>

          <div className="archive-list">
            {archive.map((item, index) => {
              const href = item.href ? resolveHref(item.href) : undefined
              return (
                <article key={item.title} data-reveal>
                  <div className="archive-list__number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="archive-list__year">{item.year}</div>
                  <div className="archive-list__content">
                    <p>{item.type}</p>
                    <h3>{item.title}</h3>
                    <span>{item.description}</span>
                  </div>
                  {href && (
                    <a href={href} target="_blank" rel="noreferrer" aria-label={`${item.label}: ${item.title}`}>
                      <span>{item.label}</span>
                      <ArrowUpRight />
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <section className="section section--about" id="about" aria-labelledby="about-title">
          <div className="about-grid">
            <div className="about-photo" data-reveal>
              <img
                src={stanfordPhotoUrl}
                alt="Max Rodriguez standing in Stanford’s Main Quad"
                width="3021"
                height="1932"
                loading="lazy"
              />
              <span>Stanford, California</span>
            </div>

            <div className="about-copy" data-reveal>
              <span className="section-index">04 / ABOUT</span>
              <h2 id="about-title">An engineer shaped by music.</h2>
              <p className="about-copy__lead">
                I grew up on Whidbey Island, Washington, where limited access to advanced instruction
                made self-directed learning a necessity—not a slogan.
              </p>
              <p>
                Classical piano taught me to treat progress as a systems problem: observe carefully,
                isolate the failure, test a change, and listen again. That loop now informs the way I
                build machine-learning products—especially tools for learning, creative practice,
                and high-stakes human decisions.
              </p>
              <p>
                At Stanford, I completed a B.S. with Honors in Symbolic Systems with an AI
                concentration, plus minors in Music and German Studies. I’m continuing as a
                Computer Science M.S. student focused on artificial intelligence.
              </p>

              <div className="education-note">
                <span>Stanford University · 2026</span>
                <strong>B.S. Symbolic Systems with Honors</strong>
                <p>Artificial Intelligence concentration · Music and German Studies minors</p>
              </div>
            </div>
          </div>

          <div className="capabilities" data-reveal>
            <div className="capabilities__intro">
              <span className="section-index">WORKING SET</span>
              <h3>Tools are only useful in service of a clear problem.</h3>
            </div>
            {capabilities.map((group) => (
              <div className="capability-group" key={group.label}>
                <h4>{group.label}</h4>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-section__content" data-reveal>
            <span className="section-index">05 / LET’S TALK</span>
            <h2 id="contact-title">Building something where AI has to earn its place?</h2>
            <p>
              I’m always interested in thoughtful engineering work, applied research, and
              collaborations at the intersection of intelligent systems and human learning.
            </p>
            <a className="contact-link" href="mailto:maxrod@stanford.edu">
              maxrod@stanford.edu
              <ArrowUpRight />
            </a>
          </div>
          <div className="contact-orbit" aria-hidden="true">
            <span>RESEARCH</span>
            <span>ENGINEERING</span>
            <span>MUSIC</span>
            <div>MR</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
