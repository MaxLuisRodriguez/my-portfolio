import { ArrowUpRight } from './Icons'

const thesisTitle = 'FiMo-Klavier: A Multi-Stage Machine Learning System for Fine-Motor Feedback in Self-Regulated Piano Practice'
const thesisUrl = 'https://purl.stanford.edu/vk447bc1950'

export default function Publication() {
  return (
    <section className="publication section" id="publication" aria-labelledby="publication-title">
      <div className="publication__heading" id="fimo-klavier">
        <span className="section-index">01 / PUBLISHED HONORS THESIS</span>
        <a href={thesisUrl} target="_blank" rel="noreferrer">Stanford Digital Repository <ArrowUpRight size={16} /></a>
      </div>
      <div className="publication__grid">
        <div className="publication__copy">
          <p className="publication__eyebrow">Machine learning × music education</p>
          <h2 id="publication-title">FiMo-Klavier<span>A closer look at<br /><em>how we play.</em></span></h2>
          <p className="publication__lede">Can ordinary video help a pianist understand their technique?</p>
          <p>For my Stanford honors thesis, I built a system that analyzes video of a pianist’s hands and generates feedback on technique. It models motion over time, identifies specific patterns, and uses those findings to suggest what to adjust during practice.</p>
          <div className="publication__actions">
            <a className="button button--primary" href={thesisUrl} target="_blank" rel="noreferrer">Read the published thesis <ArrowUpRight /></a>
            <a className="text-link" href={`${import.meta.env.BASE_URL}research/fimo-klavier-honors-thesis.pdf`}>Download PDF <ArrowUpRight size={16} /></a>
          </div>
          <p className="publication__byline">Max Luis Rodriguez · B.S. with Honors, 2026<br />Advisor: Chris Chafe · Second reader: Marie-Louise Catsalis</p>
        </div>
        <figure className="publication__figure">
          <img src={`${import.meta.env.BASE_URL}images/fimo-hand-landmarks.webp`} width="1425" height="736" alt="Piano hand landmarks with finger-joint and cross-hand connections, a figure from FiMo-Klavier" loading="lazy" />
          <figcaption><span>FROM THE THESIS</span> Hand landmarks used to represent piano technique.</figcaption>
          <dl className="publication__stats">
            <div><dt>137<span> hours</span></dt><dd>of piano video</dd></div>
            <div><dt>1.02<span> million</span></dt><dd>motion windows</dd></div>
            <div><dt>114<span> HMMs</span></dt><dd>interpretable evidence models</dd></div>
          </dl>
        </figure>
      </div>
      <div className="publication__method">
        <h3>From observation to instruction</h3>
        <ol>
          <li><span>01</span><strong>Observe</strong><p>Extract and normalize hand landmarks from overhead video.</p></li>
          <li><span>02</span><strong>Model</strong><p>Use a BiLSTM–Transformer to identify unusual motion sequences.</p></li>
          <li><span>03</span><strong>Interpret</strong><p>Use hidden Markov models to identify specific strengths and weaknesses.</p></li>
          <li><span>04</span><strong>Guide</strong><p>Turn those findings into feedback on what to adjust or keep doing.</p></li>
        </ol>
      </div>
      <details className="publication__details">
        <summary>Research findings, scope & citation <span aria-hidden="true">+</span></summary>
        <div className="publication__details-grid">
          <div><h3>What the study found</h3><p>The detector separated motion patterns associated with advanced and lower-level playing. LLM-as-a-judge comparisons found semantic overlap with human-annotated feedback in broad technical categories, including finger curvature and wrist mechanics.</p><p>The study evaluates detection and feedback quality. It does not establish long-term learning gains or replace expert piano instruction.</p></div>
          <div><h3>Cite this work</h3><p>Rodriguez, Max Luis. (2026). <cite>{thesisTitle}</cite>. Stanford University. Undergraduate honors thesis.</p><a className="text-link" href="https://doi.org/10.25740/vk447bc1950">doi.org/10.25740/vk447bc1950 <ArrowUpRight size={16} /></a><p className="publication__license">Publicly available · CC0 1.0</p></div>
        </div>
      </details>
    </section>
  )
}
