import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MotionVideo from './components/MotionVideo'
import { ArrowRight, ArrowUpRight } from './components/Icons'
import './evensong.css'

const base = import.meta.env.BASE_URL
const asset = (name: string) => `${base}images/evensong/${name}`

export default function Evensong() {
  const [backgroundMotion, setBackgroundMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  return (
    <div className="site-shell game-shell" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header gamePage />
      <main id="main-content">
        <section className="game-hero" aria-labelledby="game-title">
          <MotionVideo name="Evensong environment slideshow" source={`${base}media/evensong-environments.mp4`} poster={asset('forest.webp')} className="game-hero__film" showControl={false} motionEnabled={backgroundMotion} onMotionChange={setBackgroundMotion} />
          <div className="game-hero__shade" />
          <div className="game-hero__copy">
            <p className="game-kicker">AN INDEPENDENT GAME BY MAX RODRIGUEZ</p>
            <h1 id="game-title">Evensong</h1>
            <p className="game-hero__line">A narrative adventure<br />in pixel art.</p>
            <p className="game-hero__description">Explore connected environments, talk with characters,<br />and make decisions that affect later encounters.</p>
            <a className="button button--light" href="#inside">Explore the game <ArrowRight /></a>
          </div>
          <div className="game-hero__bottom"><span>NARRATIVE ADVENTURE</span><span>IN DEVELOPMENT</span><span>Slideshow of in-game environments</span></div>
        </section>

        <section className="game-intro game-container" id="inside" aria-labelledby="inside-title">
          <div><span className="game-kicker">ABOUT THE GAME</span><h2 id="inside-title">Exploration<br />and story.</h2></div>
          <div>
            <p className="game-lede">Evensong is a dark pixel-art adventure I’m designing and developing in Godot.</p>
            <p>The game combines exploration with branching dialogue. It tracks player decisions so that conversations and encounters can change as the story progresses. I’m developing the story, building the game systems, and working on the environments and interface.</p>
            <div className="game-facts"><div><span>Genre</span><strong>Narrative adventure</strong></div><div><span>My role</span><strong>Designer & developer</strong></div><div><span>Technology</span><strong>Godot · C# · Ink</strong></div></div>
          </div>
        </section>

        <section className="game-gallery game-container" aria-labelledby="places-title">
          <div className="game-section-heading"><div><span className="game-kicker">ENVIRONMENTS</span><h2 id="places-title">Inside Evensong</h2></div><p>Ember Market and Glasswood, captured in the game during development.</p></div>
          <figure className="game-gallery__wide">
            <a href={asset('market.webp')} target="_blank" rel="noreferrer" aria-label="View the Ember Market capture full size"><img src={asset('market.webp')} alt="Ember Market, with orange market stalls, lanterns, and characters around the square" width="1280" height="720" loading="lazy" /></a>
            <figcaption><strong>Ember Market</strong><span>A market square with stalls, lanterns, and gathering areas.</span></figcaption>
          </figure>
          <figure className="game-gallery__wide">
            <a href={asset('forest.webp')} target="_blank" rel="noreferrer" aria-label="View the Glasswood capture full size"><img src={asset('forest.webp')} alt="Glasswood, with a character beside a lit hearth surrounded by dense blue-green woodland" width="1280" height="720" loading="lazy" /></a>
            <figcaption><strong>Glasswood</strong><span>A woodland environment centered on a lit hearth.</span></figcaption>
          </figure>
          <a className="game-download" href={`${base}media/evensong-environments.gif`} download="Evensong-Environments.gif">Download the environment slideshow <span>(GIF)</span> <ArrowUpRight size={16} /></a>
        </section>

        <section className="game-combat game-container" id="combat" aria-labelledby="combat-title">
          <div className="game-section-heading"><div><span className="game-kicker">GAMEPLAY</span><h2 id="combat-title">Warden boss fight</h2></div><p>Player movement and attack patterns in the Warden encounter. <span className="game-progress">(In progress)</span></p></div>
          <figure className="game-combat__preview">
            <MotionVideo name="Warden boss gameplay, in progress" source={`${base}media/evensong-warden.mp4`} poster={asset('warden.webp')} />
            <figcaption><span>Captured during development.</span><a className="game-download" href={`${base}media/evensong-warden.gif`} download="Evensong-Warden-In-Progress.gif">Download gameplay GIF <ArrowUpRight size={16} /></a></figcaption>
          </figure>
        </section>

        <section className="game-craft game-container" id="craft" aria-labelledby="craft-title">
          <div className="game-section-heading"><div><span className="game-kicker">MY WORK</span><h2 id="craft-title">Design and development</h2></div><p>I work across game design, writing, programming, and visual presentation.</p></div>
          <div className="game-craft__grid">
            <article><span>01 / PROGRAMMING</span><h3>Game state and progression</h3><p>I build the C# systems that track player actions, save progress, and determine how later encounters respond. The core logic runs independently of Godot, which lets me test it without launching the game.</p></article>
            <article><span>02 / WRITING & DESIGN</span><h3>Dialogue and interactions</h3><p>I write branching dialogue in Ink and connect it to character interactions and story progression. Shared game state lets conversations respond to earlier decisions.</p></article>
            <article><span>03 / VISUAL PRESENTATION</span><h3>Environments and interface</h3><p>I develop the environments, lighting, interface, and motion. This includes arranging scenes, adjusting visual effects, and making paths and interactive objects easier to identify.</p></article>
            <article><span>04 / DEVELOPMENT TOOLS</span><h3>Testing and validation</h3><p>I build automated tests for game logic and checks for connections between story scenes. Repeatable scene captures help me review visual changes as I revise the game.</p></article>
          </div>
          <p className="game-build-note">Evensong is in development. The background slideshow uses in-game environment captures, and the boss preview shows combat recorded during development.</p>
        </section>

        <section className="game-contact game-container">
          <span className="game-kicker">CONTACT</span><h2>Discuss the project</h2>
          <p>For questions about Evensong or my development work, email me.</p>
          <a className="button button--light" href="mailto:maxrod@stanford.edu?subject=Evensong">Email Max <ArrowUpRight /></a>
          <a className="game-back" href={base}>Back to the portfolio <ArrowRight /></a>
        </section>
      </main>
      <Footer><label className="game-motion-setting"><input type="checkbox" checked={backgroundMotion} onChange={event => setBackgroundMotion(event.target.checked)} />Animate background</label></Footer>
    </div>
  )
}
