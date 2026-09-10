import { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { ArrowRight, ArrowUpRight } from './components/Icons'
import ProjectCard from './components/ProjectCard'
import Publication from './components/Publication'
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
                <span>Max Rodriguez / Engineer, researcher & pianist</span>
              </div>

              <h1 id="hero-title">
                AI engineering,<br />
                applied research,
                <em>and music.</em>
              </h1>

              <p className="hero__lede">
                I’m Max, a Stanford CS master’s student and Symbolic Systems honors graduate.
                I build LLM agents, conduct applied machine learning research, and am developing
                a dark pixel-art adventure game, Evensong.
              </p>

              <div className="hero__actions">
                <a className="button button--primary" href="#work">
                  Explore my work
                  <ArrowRight />
                </a>
                <a className="button button--quiet" href={resumeUrl}>
                  View resume
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
                  width="484"
                  height="640"
                  fetchPriority="high"
                />
                <div className="portrait-stamp" aria-hidden="true">
                  <span>Stanford</span>
                  <strong>’26</strong>
                </div>
              </div>
              <figcaption>
                <span>Stanford University</span>
                <strong>B.S. with Honors ’26 · M.S. Computer Science ’27</strong>
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
              <span>Published research</span>
              <a href="#publication"><strong>FiMo-Klavier · Stanford SDR ↗</strong></a>
            </div>
            <div>
              <span>Recommender systems</span>
              <strong>0.834 holdout AUC</strong>
            </div>
          </div>
        </section>

        <Publication />

        <section className="section section--work" id="work" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <div>
              <span className="section-index">02 / SELECTED RESEARCH</span>
              <h2 id="work-title">Selected research.</h2>
            </div>
            <p>
              My research covers credit assignment for LLM agents, social feed ranking,
              and mathematical reasoning in small language models.
            </p>
          </div>

          <div className="projects-grid">
            {projects.filter((project) => project.id !== 'fimo-klavier').map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={index === 0}
              />
            ))}
          </div>
        </section>

        <section className="evensong-teaser" aria-labelledby="evensong-teaser-title">
          <a className="evensong-teaser__image" href={`${import.meta.env.BASE_URL}evensong/`} aria-label="Explore Evensong, Max’s game development project">
            <img src={`${import.meta.env.BASE_URL}images/evensong/market.webp`} width="1280" height="720" alt="Lantern-lit market stalls and travelers in Evensong’s pixel-art world" loading="lazy" />
          </a>
          <div className="evensong-teaser__copy"><span className="section-index">INDEPENDENT GAME / IN DEVELOPMENT</span><h2 id="evensong-teaser-title">Evensong</h2><p>A narrative adventure<br />in pixel art.</p><p className="evensong-teaser__description">I’m designing and developing a game about exploration, branching dialogue, and decisions that affect later encounters. See the environments and my work on the story, C# game systems, and visual presentation.</p><a className="button button--light" href={`${import.meta.env.BASE_URL}evensong/`}>Explore Evensong <ArrowRight /></a></div>
        </section>

        <section className="section section--experience" id="experience" aria-labelledby="experience-title">
          <div className="section-heading section-heading--light" data-reveal>
            <div>
              <span className="section-index">03 / EXPERIENCE</span>
              <h2 id="experience-title">Engineering experience.</h2>
            </div>
            <p>
              I’ve built AI tools at Bonterra, ordering and fulfillment software at WAW Life,
              document-verification pipelines at E3 Group, and tools for academic research.
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
            <p>Stanford CS + Social Good Fellow · CURIS Fellow</p>
            <a href={resumeUrl}>
              Full experience in resume
              <ArrowUpRight />
            </a>
          </div>
        </section>

        <section className="section section--research" id="research" aria-labelledby="research-title">
          <div className="section-heading" data-reveal>
            <div>
              <span className="section-index">04 / RESEARCH ARCHIVE</span>
              <h2 id="research-title">More experiments, prototypes, and papers.</h2>
            </div>
            <p>
              Earlier work in voice interfaces, computer vision, piano technique, and audio research.
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
                alt="Max Rodriguez in cap and gown at Stanford’s Main Quad arcade on graduation day"
                width="2400"
                height="1600"
                loading="lazy"
              />
              <span>Stanford, California</span>
            </div>

            <div className="about-copy" data-reveal>
              <span className="section-index">05 / ABOUT</span>
              <h2 id="about-title">Music and computing.</h2>
              <p className="about-copy__lead">
                I grew up on Whidbey Island, Washington, where limited access to advanced instruction
                taught me to learn independently. Piano eventually became the subject of my
                honors research at Stanford.
              </p>
              <p>
                My thesis grew out of a question I knew from practice: how do you improve your
                technique without an expert beside you? I used video and machine learning to
                study how feedback could help pianists practice independently.
              </p>
              <p>
                At Stanford, I completed a B.S. with Honors in Symbolic Systems with an AI
                concentration, plus minors in Music and German Studies. I’m continuing as a
                Computer Science M.S. student focused on artificial intelligence, graduating in 2027.
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
              <h3>What I work with.</h3>
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
              <span className="section-index">06 / CONTACT</span>
            <h2 id="contact-title">Get in touch.</h2>
            <p>
              Get in touch about engineering roles, applied research, music technology,
              or Evensong. Expected M.S. graduation: June 2027.
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
