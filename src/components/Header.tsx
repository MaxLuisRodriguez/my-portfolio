import { useEffect, useState } from 'react'
import { Close, Menu } from './Icons'

const navItems = [
  { id: 'publication', label: 'Thesis' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'about', label: 'About' },
]

export default function Header({ gamePage = false }: { gamePage?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const resumeUrl = `${import.meta.env.BASE_URL}resume.html`
  const sectionHref = (id: string) => `${gamePage ? import.meta.env.BASE_URL : ''}#${id}`

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.01, 0.2, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href={gamePage ? import.meta.env.BASE_URL : '#top'} onClick={closeMenu} aria-label="Max Rodriguez, portfolio home">
          <span className="wordmark__monogram" aria-hidden="true">MR</span>
          <span>Max Rodriguez</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              aria-current={activeSection === item.id ? 'location' : undefined}
              href={sectionHref(item.id)}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-evensong" aria-current={gamePage ? 'page' : undefined} href={`${import.meta.env.BASE_URL}evensong/`}>Evensong</a>
          <a className="nav-resume" href={resumeUrl}>
            Resume <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? <Close /> : <Menu />}
        </button>
      </div>

      <nav
        className={`mobile-nav${isMenuOpen ? ' mobile-nav--open' : ''}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            aria-current={activeSection === item.id ? 'location' : undefined}
            href={sectionHref(item.id)}
            onClick={closeMenu}
          >
            <span>{item.label}</span>
            <span aria-hidden="true">0{navItems.indexOf(item) + 1}</span>
          </a>
        ))}
        <a href={`${import.meta.env.BASE_URL}evensong/`} aria-current={gamePage ? 'page' : undefined} onClick={closeMenu}><span>Evensong</span><span aria-hidden="true">↗</span></a>
        <a href={resumeUrl} onClick={closeMenu}>
          <span>Resume</span>
          <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}
