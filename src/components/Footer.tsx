import type { ReactNode } from 'react'
import { socialLinks } from '../data/portfolio'
import { ArrowUpRight } from './Icons'

export default function Footer({ children }: { children?: ReactNode }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <a className="wordmark wordmark--footer" href="#top" aria-label="Max Rodriguez, back to top">
          <span className="wordmark__monogram" aria-hidden="true">MR</span>
          <span>Max Rodriguez</span>
        </a>

        <div className="footer-links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {link.label}
              {link.href.startsWith('http') && <ArrowUpRight size={14} />}
            </a>
          ))}
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Max Rodriguez</p>
        <p>Stanford, California</p>
        {children}
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
