import type { Project } from '../data/portfolio'

type ProjectVisualProps = {
  type: Project['visual']
}

function AgentsVisual() {
  return (
    <div className="project-visual project-visual--agents" role="img" aria-label="Diagram showing goal-aware credit assigned across an agent trajectory">
      <div className="visual-kicker">TURN-LEVEL CREDIT</div>
      <svg className="agents-map" viewBox="0 0 760 420">
        <defs>
          <linearGradient id="agent-line" x1="0" x2="1">
            <stop offset="0" stopColor="#696760" />
            <stop offset="1" stopColor="#f6f2e9" />
          </linearGradient>
        </defs>
        <path d="M82 310 C180 290 218 116 328 132 S478 310 672 84" fill="none" opacity=".38" stroke="#85817a" strokeDasharray="4 10" strokeWidth="2" />
        <path d="M82 310 C186 310 225 234 328 236 S480 202 672 84" fill="none" stroke="url(#agent-line)" strokeWidth="3" />
        {[
          [82, 310, '01', '-.08'],
          [205, 284, '02', '+.12'],
          [328, 236, '03', '+.91'],
          [470, 218, '04', '-.04'],
          [578, 150, '05', '+.68'],
          [672, 84, '06', '+1.0'],
        ].map(([x, y, step, credit], index) => (
          <g key={String(step)}>
            <circle cx={x} cy={y} fill={index === 2 || index === 5 ? '#e54b4b' : '#242321'} r={index === 2 || index === 5 ? '10' : '7'} stroke="#f6f2e9" strokeWidth="2" />
            <text fill="#9b9891" fontSize="12" x={Number(x) - 10} y={Number(y) + 33}>{step}</text>
            <text fill={index === 2 || index === 5 ? '#ff8d87' : '#d8d4cc'} fontSize="12" x={Number(x) - 15} y={Number(y) - 20}>{credit}</text>
          </g>
        ))}
        <text fill="#8e8a83" fontSize="13" letterSpacing="2" x="82" y="380">OBSERVE</text>
        <text fill="#f6f2e9" fontSize="13" letterSpacing="2" textAnchor="end" x="675" y="54">GOAL</text>
      </svg>
      <div className="visual-caption">
        <span>trajectory signal</span>
        <span className="visual-caption__accent">goal-aware signal</span>
      </div>
    </div>
  )
}

function PianoVisual() {
  return (
    <div className="project-visual project-visual--piano" role="img" aria-label="Diagram of a piano keyboard with hand-motion paths flowing into machine-learning feedback">
      <div className="visual-kicker">VIDEO → KINEMATICS → FEEDBACK</div>
      <svg className="piano-map" viewBox="0 0 760 420">
        <g className="piano-keys">
          {Array.from({ length: 16 }, (_, index) => (
            <rect key={index} fill="#f5efe4" height="128" stroke="#b7ab9e" strokeWidth="1" width="42" x={44 + index * 42} y="236" />
          ))}
          {[1, 2, 4, 5, 6, 8, 9, 11, 12, 13, 15].map((index) => (
            <rect key={index} fill="#28231f" height="78" rx="1" width="26" x={72 + index * 42} y="236" />
          ))}
        </g>
        <path d="M94 216 C168 146 223 198 296 124 S430 170 518 94" fill="none" stroke="#851522" strokeLinecap="round" strokeWidth="4" />
        <path d="M150 214 C198 166 266 242 346 154 S504 218 638 116" fill="none" opacity=".72" stroke="#d37a6f" strokeDasharray="6 8" strokeLinecap="round" strokeWidth="3" />
        {[94, 190, 296, 414, 518].map((x, index) => (
          <circle key={x} cx={x} cy={[216, 166, 124, 144, 94][index]} fill="#f7f1e7" r="7" stroke="#851522" strokeWidth="3" />
        ))}
        <g transform="translate(540 46)">
          <rect fill="#f7f1e7" height="102" rx="3" width="168" />
          <rect fill="#d8cfc1" height="6" rx="3" width="104" x="20" y="22" />
          <rect fill="#d8cfc1" height="6" rx="3" width="128" x="20" y="42" />
          <rect fill="#851522" height="6" rx="3" width="82" x="20" y="62" />
          <text fill="#695f56" fontSize="11" x="20" y="88">ACTIONABLE FEEDBACK</text>
        </g>
      </svg>
      <div className="visual-caption">
        <span>standard overhead video</span>
        <span>no specialized sensors</span>
      </div>
    </div>
  )
}

function RankingVisual() {
  return (
    <div className="project-visual project-visual--ranking" role="img" aria-label="Diagram showing user and post embeddings entering a two-tower ranking model">
      <div className="visual-kicker">EARLY + LATE INTERACTION</div>
      <svg className="ranking-map" viewBox="0 0 760 420">
        <g opacity=".72">
          {[76, 140, 204, 268].map((y, index) => (
            <g key={y}>
              <circle cx="82" cy={y} fill="#ede8de" r="16" />
              <text fill="#514f4a" fontSize="11" textAnchor="middle" x="82" y={y + 4}>U{index + 1}</text>
            </g>
          ))}
          {[68, 122, 176, 230, 284].map((y, index) => (
            <g key={y}>
              <rect fill="#d9d2c5" height="31" rx="3" width="42" x="630" y={y - 15} />
              <text fill="#514f4a" fontSize="11" textAnchor="middle" x="651" y={y + 4}>P{index + 1}</text>
            </g>
          ))}
        </g>
        {[76, 140, 204, 268].map((y, index) => (
          <path key={y} d={`M98 ${y} C190 ${y}, 186 ${110 + index * 34}, 272 ${130 + index * 22}`} fill="none" opacity={0.35 + index * 0.12} stroke="#8d8982" strokeWidth="2" />
        ))}
        {[68, 122, 176, 230, 284].map((y, index) => (
          <path key={y} d={`M488 ${132 + index * 30} C548 ${132 + index * 30}, 558 ${y}, 630 ${y}`} fill="none" opacity={0.4 + index * 0.09} stroke="#8d8982" strokeWidth="2" />
        ))}
        <g>
          <rect fill="#242321" height="208" rx="5" width="96" x="248" y="86" />
          <rect fill="#242321" height="208" rx="5" width="96" x="416" y="86" />
          <text fill="#f4f0e8" fontSize="12" letterSpacing="2" textAnchor="middle" x="296" y="116">USER</text>
          <text fill="#f4f0e8" fontSize="12" letterSpacing="2" textAnchor="middle" x="464" y="116">POST</text>
          {[146, 174, 202, 230, 258].map((y, index) => (
            <g key={y}>
              <rect fill={index === 2 ? '#b1040e' : '#77736c'} height="8" rx="4" width={32 + index * 7} x="270" y={y} />
              <rect fill={index === 2 ? '#b1040e' : '#77736c'} height="8" rx="4" width={62 - index * 5} x="438" y={y} />
            </g>
          ))}
          <path d="M344 188h72" stroke="#b1040e" strokeDasharray="5 6" strokeWidth="3" />
          <circle cx="380" cy="188" fill="#f4f0e8" r="13" stroke="#b1040e" strokeWidth="3" />
        </g>
        <text fill="#66635d" fontSize="12" letterSpacing="1.5" x="54" y="342">HISTORY</text>
        <text fill="#66635d" fontSize="12" letterSpacing="1.5" textAnchor="end" x="692" y="342">CANDIDATES</text>
      </svg>
      <div className="visual-caption">
        <span>candidate generation</span>
        <span className="visual-caption__accent">0.834 holdout AUC</span>
      </div>
    </div>
  )
}

function ReasoningVisual() {
  return (
    <div className="project-visual project-visual--reasoning" role="img" aria-label="Diagram showing supervised fine-tuning, GRPO exploration, and DAPO repair stages">
      <div className="visual-kicker">TEACHER-FREE REASONING</div>
      <div className="reasoning-pipeline">
        <div className="reasoning-step">
          <span className="reasoning-step__number">01</span>
          <strong>SFT</strong>
          <small>Warm start</small>
        </div>
        <span className="reasoning-arrow" aria-hidden="true">→</span>
        <div className="reasoning-step reasoning-step--active">
          <span className="reasoning-step__number">02</span>
          <strong>GRPO</strong>
          <small>Explore</small>
        </div>
        <span className="reasoning-arrow" aria-hidden="true">→</span>
        <div className="reasoning-step">
          <span className="reasoning-step__number">03</span>
          <strong>DAPO</strong>
          <small>Repair</small>
        </div>
      </div>
      <div className="reasoning-result">
        <div>
          <span>0.5B parameters</span>
          <strong>20.8%</strong>
          <small>overall MATH algebra accuracy</small>
        </div>
        <svg viewBox="0 0 200 90" aria-hidden="true">
          <path d="M4 76 C28 73 42 70 60 62 S92 59 106 42 S139 39 152 23 S177 22 196 7" fill="none" stroke="#b1040e" strokeWidth="3" />
          <path d="M4 82h192" opacity=".4" stroke="#8c8478" strokeDasharray="3 6" />
        </svg>
      </div>
      <div className="visual-caption">
        <span>verifiable rewards</span>
        <span>targeted failure replay</span>
      </div>
    </div>
  )
}

export default function ProjectVisual({ type }: ProjectVisualProps) {
  if (type === 'agents') return <AgentsVisual />
  if (type === 'piano') return <PianoVisual />
  if (type === 'ranking') return <RankingVisual />
  return <ReasoningVisual />
}
