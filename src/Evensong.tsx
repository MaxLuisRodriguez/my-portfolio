import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MotionVideo from './components/MotionVideo'
import { ArrowRight, ArrowUpRight } from './components/Icons'
import './evensong.css'

const base = import.meta.env.BASE_URL
const asset = (name: string) => `${base}images/evensong/${name}`
const places = [
  { image: 'mountain-bridges.png', title: 'Mountain bridges', caption: 'Two crossings above a forested chasm.', alt: 'Rope bridges and stone stairs between mountain cliffs, with a waterfall and distant forest', width: 640 },
  { image: 'vestry.png', title: 'The Vestry', caption: 'A stone bridge beneath a city in the mist.', alt: 'Moth on a supported stone bridge above the void, with a distant hillside city', width: 640 },
  { image: 'pikes-span.png', title: 'Pike’s Span', caption: 'A toll crossing suspended over the void.', alt: 'Moth and the toll keeper on a timber bridge between towers in blue mist', width: 640 },
]
const fights = [
  { id: 'warden', name: 'The Warden', caption: 'Watch the sweep. Find an opening.' },
  { id: 'choir', name: 'The Choir', caption: 'Keep moving as the arena fills with attacks.' },
]

export default function Evensong() {
  const [backgroundMotion, setBackgroundMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  return (
    <div className="site-shell game-shell" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header gamePage />
      <main id="main-content">
        <section className="game-hero" aria-labelledby="game-title">
          <MotionVideo name="Evensong environment slideshow" source={`${base}media/evensong-environments.mp4`} poster={asset('mountain-bridges.png')} className="game-hero__film" showControl={false} motionEnabled={backgroundMotion} onMotionChange={setBackgroundMotion} />
          <div className="game-hero__shade" />
          <div className="game-hero__copy">
            <p className="game-kicker">AN INDEPENDENT GAME BY MAX RODRIGUEZ</p>
            <h1 id="game-title">Evensong</h1>
            <p className="game-hero__line">A dark adventure<br />in pixel art.</p>
            <p className="game-hero__description">Cross mountain towns, face strange bosses,<br />and make choices that shape later encounters.</p>
            <a className="button button--light" href="#inside">Explore the game <ArrowRight /></a>
          </div>
          <div className="game-hero__bottom"><span>NARRATIVE ADVENTURE</span><span>IN DEVELOPMENT</span><span>Slideshow of in-game environments</span></div>
        </section>

        <section className="game-intro game-container" id="inside" aria-labelledby="inside-title">
          <div><span className="game-kicker">ABOUT THE GAME</span><h2 id="inside-title">Exploration<br />and story.</h2></div>
          <div>
            <p className="game-lede">Evensong is a dark pixel-art adventure I’m designing and developing in Godot.</p>
            <p>You play as Moth, exploring connected towns and wild places. Conversations, puzzles, and boss encounters carry your choices forward. I build the story, systems, and visual world.</p>
            <div className="game-facts"><div><span>Genre</span><strong>Narrative adventure</strong></div><div><span>My role</span><strong>Designer & developer</strong></div><div><span>Technology</span><strong>Godot · C# · Ink</strong></div></div>
          </div>
        </section>

        <section className="game-gallery game-container" aria-labelledby="places-title">
          <div className="game-section-heading"><div><span className="game-kicker">ENVIRONMENTS</span><h2 id="places-title">Inside Evensong</h2></div><p>Three places from the game, captured during development.</p></div>
          {places.map(place => <figure className="game-gallery__wide" key={place.image}>
            <a href={asset(place.image)} target="_blank" rel="noreferrer" aria-label={`View ${place.title} full size`}><img src={asset(place.image)} alt={place.alt} width={place.width} height="360" loading="lazy" /></a>
            <figcaption><strong>{place.title}</strong><span>{place.caption}</span></figcaption>
          </figure>)}
          <a className="game-download" href={`${base}media/evensong-environments.gif`} download="Evensong-Environments.gif">Download scenery GIF <ArrowUpRight size={16} /></a>
        </section>

        <section className="game-combat game-container" id="combat" aria-labelledby="combat-title">
          <div className="game-section-heading"><div><span className="game-kicker">GAMEPLAY</span><h2 id="combat-title">Boss encounters</h2></div><p>Read the attack patterns and choose your moment. <span className="game-progress">Gameplay in development.</span></p></div>
          {fights.map(fight => <figure className="game-combat__preview" key={fight.id}>
            <h3>{fight.name}</h3>
            <MotionVideo name={`${fight.name} boss gameplay`} source={`${base}media/evensong-${fight.id}.mp4`} poster={asset(`${fight.id}-fight.png`)} />
            <figcaption><span>{fight.caption}</span><a className="game-download" href={`${base}media/evensong-${fight.id}.gif`} download={`Evensong-${fight.id}.gif`}>Download GIF <ArrowUpRight size={16} /></a></figcaption>
          </figure>)}
        </section>

        <section className="game-craft game-container" id="craft" aria-labelledby="craft-title">
          <div className="game-section-heading"><div><span className="game-kicker">MY WORK</span><h2 id="craft-title">Building the game</h2></div><p>From the first conversation to the saved consequences.</p></div>
          <div className="game-craft__grid">
            <article><span>01 / PROGRAMMING</span><h3>Actions with consequences</h3><p>C# systems connect combat, inventory, and player decisions across saves.</p></article>
            <article><span>02 / WRITING & DESIGN</span><h3>Characters who remember</h3><p>Branching Ink dialogue responds to what you have done and whom you have helped.</p></article>
            <article><span>03 / VISUAL PRESENTATION</span><h3>A connected world</h3><p>I shape the environments, lighting, and interface around exploration and readable encounters.</p></article>
            <article><span>04 / DEVELOPMENT TOOLS</span><h3>Testing the journey</h3><p>Automated gameplay checks help me test story routes, combat, and save continuity.</p></article>
          </div>
          <p className="game-build-note">All images and clips come from development builds. The game is still in progress.</p>
        </section>

        <section className="game-contact game-container">
          <span className="game-kicker">CONTACT</span><h2>Discuss the project</h2>
          <p>Want to talk about the game? I’d love to hear from you.</p>
          <a className="button button--light" href="mailto:maxrod@stanford.edu?subject=Evensong">Email Max <ArrowUpRight /></a>
          <a className="game-back" href={base}>Back to the portfolio <ArrowRight /></a>
        </section>
      </main>
      <Footer><label className="game-motion-setting"><input type="checkbox" checked={backgroundMotion} onChange={event => setBackgroundMotion(event.target.checked)} />Animate background</label></Footer>
    </div>
  )
}
