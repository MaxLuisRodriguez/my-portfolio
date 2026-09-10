import Header from './components/Header'
import Footer from './components/Footer'
import MotionVideo from './components/MotionVideo'
import { ArrowRight, ArrowUpRight } from './components/Icons'
import './evensong.css'

const base = import.meta.env.BASE_URL
const asset = (name: string) => `${base}images/evensong/${name}`

export default function Evensong() {
  return (
    <div className="site-shell game-shell" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header gamePage />
      <main id="main-content">
        <section className="game-hero" aria-labelledby="game-title">
          <MotionVideo name="Evensong world study, animated in-game captures" source={`${base}media/evensong-worlds.mp4`} poster={asset('forest.webp')} className="game-hero__film" />
          <div className="game-hero__shade" />
          <div className="game-hero__copy"><p className="game-kicker">AN INDEPENDENT GAME BY MAX RODRIGUEZ</p><h1 id="game-title">Evensong</h1><p className="game-hero__line">A world that remembers<br /><em>what you leave behind.</em></p><p className="game-hero__description">Walk through a dying world. Talk to the people still in it.<br />Make choices that stay with you. Something follows.</p><a className="button button--light" href="#inside">Explore the game <ArrowRight /></a></div>
          <div className="game-hero__bottom"><span>DARK PIXEL-ART ADVENTURE</span><span>IN DEVELOPMENT</span><span>World study · animated in-game captures</span></div>
        </section>

        <section className="game-intro game-container" id="inside" aria-labelledby="inside-title">
          <div><span className="game-kicker">THE WORLD</span><h2 id="inside-title">Keep a little light.<br /><em>See what it costs.</em></h2></div>
          <div><p className="game-lede">The people you meet remember what you do. So does the world around them.</p><p>You travel through candlelit rooms, crowded markets, and quiet woodland paths. Conversations and encounters leave traces that you discover when you return. A door, a person, or a once-familiar room may have changed.</p><div className="game-facts"><div><span>Form</span><strong>Narrative adventure</strong></div><div><span>My work</span><strong>Design & development</strong></div><div><span>Built with</span><strong>Godot · C# · Ink</strong></div></div></div>
        </section>

        <section className="game-container game-moments" aria-labelledby="moments-title">
          <div className="game-section-heading"><div><span className="game-kicker">MOMENTS FROM THE GAME</span><h2 id="moments-title">Warmth. Unease. A glance back.</h2></div><p>Silent gameplay loops from the current development build.</p></div>
          <div className="game-clips">
            <figure><MotionVideo name="Evensong hearth encounter gameplay" source={`${base}media/evensong-hearth.mp4`} poster={asset('hearth.webp')} /><figcaption><span>01 / THE HEARTH</span><h3>Someone is waiting by the fire.</h3><p>An approach to the hearth and the figure standing beside it.</p></figcaption></figure>
            <figure><MotionVideo name="Evensong changed world gameplay" source={`${base}media/evensong-after.mp4`} poster={asset('after.webp')} /><figcaption><span>02 / THE AFTER</span><h3>A familiar room, changed.</h3><p>The same room in the After, with a different palette and atmosphere.</p></figcaption></figure>
          </div>
        </section>

        <section className="game-gallery game-container" aria-labelledby="places-title">
          <div className="game-section-heading"><div><span className="game-kicker">A SENSE OF PLACE</span><h2 id="places-title">A small world, closely observed.</h2></div><p>In-game environments, captured during development.</p></div>
          <figure className="game-gallery__wide"><a href={asset('market.webp')} target="_blank" rel="noreferrer" aria-label="View the Ember Market capture full size"><img src={asset('market.webp')} alt="The Ember Market: warm orange stalls, hanging lanterns, and small figures gathered around the square" width="1280" height="720" loading="lazy" /></a><figcaption><strong>Ember Market</strong><span>Small pools of light. People with somewhere to be.</span></figcaption></figure>
          <div className="game-gallery__pair"><figure><a href={asset('forest.webp')} target="_blank" rel="noreferrer" aria-label="View the Glasswood capture full size"><img src={asset('forest.webp')} alt="A lone traveler at a softly lit hearth in the green and blue Glasswood forest" width="1280" height="720" loading="lazy" /></a><figcaption><strong>Glasswood</strong><span>A clearing in the dark.</span></figcaption></figure><figure><a href={asset('water.webp')} target="_blank" rel="noreferrer" aria-label="View the Glasswood Pools capture full size"><img src={asset('water.webp')} alt="The Glasswood Pools, lantern-lit pathways and dark pools beneath a distant night sky" width="1280" height="720" loading="lazy" /></a><figcaption><strong>The Glasswood Pools</strong><span>Lantern light beneath an open sky.</span></figcaption></figure></div>
        </section>

        <section className="game-craft game-container" id="craft" aria-labelledby="craft-title">
          <div className="game-section-heading"><div><span className="game-kicker">MY WORK ON EVENSONG</span><h2 id="craft-title">Designing the game.<br /><em>Building the systems.</em></h2></div><p>My work spans the story, game logic, environments, and development tools. Each part has to stay consistent as the player changes the world.</p></div>
          <div className="game-craft__grid">
            <article><span>01 / GAME SYSTEMS</span><h3>Choices that persist.</h3><p>Game logic records player actions and carries their consequences into later encounters. The core C# systems run independently of Godot, so they can be tested without launching the game.</p></article>
            <article><span>02 / NARRATIVE & WORLD</span><h3>Characters with a memory.</h3><p>I use Ink dialogue and structured story data to connect conversations, room interactions, and campaign progression. A small gesture can change a later exchange or leave a visible mark on a place.</p></article>
            <article><span>03 / PRESENTATION</span><h3>Light, motion, and atmosphere.</h3><p>I work on the environments, lighting, interface, and motion. The goal is to make a room feel quiet or unsettling while still showing players where they can go and what they can interact with.</p></article>
            <article><span>04 / DEVELOPMENT TOOLS</span><h3>Tools for a growing game.</h3><p>Story validation checks connections between scenes. Automated tests check game logic, and repeatable captures help compare visual changes. These tools make it easier to revise one part of the game without breaking another.</p></article>
          </div>
          <p className="game-build-note">Evensong is in active development. These captures show work in progress; art, interface, and gameplay continue to evolve.</p>
          <a className="game-download" href={`${base}media/evensong-hearth.gif`} download="Evensong-Gameplay.gif">Download a short gameplay GIF <ArrowUpRight size={16} /></a>
        </section>

        <section className="game-contact game-container"><span className="game-kicker">CONTINUE THE CONVERSATION</span><h2>Curious about Evensong?</h2><p>Get in touch about the game, its development, or a collaboration.</p><a className="button button--light" href="mailto:maxrod@stanford.edu?subject=Evensong">Talk with Max <ArrowUpRight /></a><a className="game-back" href={base}>Back to the portfolio <ArrowRight /></a></section>
      </main>
      <Footer />
    </div>
  )
}
