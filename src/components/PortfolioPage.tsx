import { useState } from 'react'
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa'
import { playHover, playClick } from '../utils/sounds'
import profilImg from '../assets/profil.jpg'
import './PortfolioPage.css'

const SKILLS = [
  { name: 'HTML',       level: 5 },
  { name: 'CSS',        level: 5 },
  { name: 'SQL',        level: 5 },
  { name: 'PHP',        level: 5 },
  { name: 'Python',     level: 4 },
  { name: 'JavaScript', level: 3 },
  { name: 'Java',       level: 2 },
]

const LANGS = [
  { name: 'Français',    level: 5 },
  { name: 'Anglais',     level: 5 },
  { name: 'Espagnol',    level: 5 },
  { name: 'Néerlandais', level: 2 },
]

type Section = 'about' | 'skills' | 'project' | 'contact'

const NAV_LABELS: Record<Section, string> = {
  about:   'À propos',
  skills:  'Compétences',
  project: 'Projet',
  contact: 'Contact',
}

export function PortfolioPage() {
  const [active, setActive] = useState<Section>('about')

  function handleRootOver(e: React.MouseEvent) {
    const t = e.target as HTMLElement
    if (t.closest('a, button')) playHover()
  }

  function handleRootClick(e: React.MouseEvent) {
    const t = e.target as HTMLElement
    if (t.closest('a, button')) playClick()
  }

  return (
    <div className="pp-root" onMouseOver={handleRootOver} onClick={handleRootClick}>

      <button type="button" className="pp-back" onClick={() => window.history.back()}>← Retour</button>

      {/* ── Header ── */}
      <header className="pp-header">
        <div>
          <h1 className="pp-name">
            Francisco Homero<br />Derouck Arredondo
            <span>Étudiant en informatique · Bachelier en développement</span>
          </h1>
        </div>
        <div className="pp-header-links">
          <a href="https://github.com/spidermiriki" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub size={22} /></a>
          <a href="https://www.linkedin.com/in/derouck-homero" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin size={22} /></a>
          <a href="https://spidermiriki.github.io/CV/" target="_blank" rel="noopener noreferrer" title="Curriculum Vitæ"><FaFileAlt size={20} /></a>
        </div>
      </header>

      {/* ── Nav ── */}
      <nav className="pp-nav">
        {(Object.keys(NAV_LABELS) as Section[]).map(s => (
          <button
            type="button"
            key={s}
            className={`pp-nav-item ${active === s ? 'active' : ''}`}
            onClick={() => setActive(s)}
          >
            {NAV_LABELS[s]}
          </button>
        ))}
      </nav>

      {/* ── Body ── */}
      <div className="pp-body">

        {/* ── Sidebar ── */}
        <aside className="pp-sidebar">

          {/* ── Photo ── */}
          <div className="pp-photo-wrap">
            <img src={profilImg} alt="Photo de profil" />
          </div>

          <div>
            <div className="pp-section-title">Formation</div>
            <div className="pp-edu-item">
              <div className="pp-edu-school">HEH DST</div>
              <div className="pp-edu-detail">Bachelier en informatique<br />Mons · 2023 — Actuellement</div>
            </div>
            <div className="pp-edu-item">
              <div className="pp-edu-school">Athenée Provinciale</div>
              <div className="pp-edu-detail">CESS — Latin, Math, Sciences<br />La Louvière · 2016 — 2022</div>
            </div>
          </div>

          <div>
            <div className="pp-section-title">Langues</div>
            {LANGS.map(l => (
              <div key={l.name} className="pp-lang-row">
                <span>{l.name}</span>
                <div className="pp-lang-dots">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className={`pp-lang-dot ${i < l.level ? 'filled' : ''}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="pp-section-title">Loisirs</div>
            <ul className="pp-hobbies">
              <li>Skateboard</li>
              <li>Jeux vidéo</li>
              <li>Cinéma</li>
              <li>Montage vidéo</li>
            </ul>
          </div>
        </aside>

        {/* ── Content ── */}
        <main className="pp-content">

          {active === 'about' && (
            <section>
              <div className="pp-section-title">À propos</div>
              <p className="pp-about-text pp-drop-cap">
                Étudiant en deuxième année de bachelier en informatique à la Haute École en Hainaut, je me spécialise dans le développement logiciel. Passionné par la création d'interfaces et d'outils qui allient esthétique et fonctionnalité.
              </p>
              <p className="pp-about-text pp-mt">
                En 2025 et 2026, j'ai eu l'opportunité de participer à l'ETH Oxford à l'Université d'Oxford, où j'ai travaillé sur des projets alliant cryptographie, blockchain et expérience utilisateur.
              </p>
              <p className="pp-about-text pp-mt">
                En dehors du code, je suis passionné par le cinéma, le skateboard, et le montage vidéo.
              </p>
            </section>
          )}

          {active === 'skills' && (
            <section>
              <div className="pp-section-title">Compétences techniques</div>
              {SKILLS.map(s => (
                <div key={s.name} className="pp-skill-row">
                  <span className="pp-skill-name">{s.name}</span>
                  <div className="pp-skill-bar-bg">
                    <div
                      className="pp-skill-bar-fill"
                      style={{ width: `${s.level / 5 * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}

          {active === 'project' && (
            <section>
              <div className="pp-section-title">Projet</div>
              <div className="pp-project">
                <span className="pp-project-tag">ETH Oxford · 2025 &amp; 2026</span>
                <h2 className="pp-project-title">Système de transaction crypto</h2>
                <p className="pp-project-sub">Oxford University · Cryptographie · Blockchain · UX</p>
                <p className="pp-project-desc">
                  Développement d'un système de transaction en cryptomonnaie entièrement confidentiel et privé, conçu pour être accessible au grand public. L'objectif était de concevoir une expérience utilisateur simple et intuitive tout en garantissant un niveau de confidentialité maximal côté protocole.
                </p>
                <p className="pp-project-desc pp-project-desc--mt">
                  Projet réalisé dans le cadre d'un hackathon international regroupant des étudiants de plusieurs universités européennes.
                </p>
                <span className="pp-project-corner">Oxford University</span>
              </div>
            </section>
          )}

          {active === 'contact' && (
            <section>
              <div className="pp-section-title">Contact</div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">Email</span>
                <span className="pp-contact-value">
                  <a href="mailto:homeromiriki@gmail.com">homeromiriki@gmail.com</a>
                </span>
              </div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">Téléphone</span>
                <span className="pp-contact-value">+32 493 93 25 97</span>
              </div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">GitHub</span>
                <span className="pp-contact-value">
                  <a href="https://github.com/spidermiriki" target="_blank" rel="noopener noreferrer">github.com/spidermiriki</a>
                </span>
              </div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">LinkedIn</span>
                <span className="pp-contact-value">
                  <a href="https://www.linkedin.com/in/derouck-homero" target="_blank" rel="noopener noreferrer">linkedin.com/in/derouck-homero</a>
                </span>
              </div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">CV</span>
                <span className="pp-contact-value">
                  <a href="https://spidermiriki.github.io/CV/" target="_blank" rel="noopener noreferrer">spidermiriki.github.io/CV</a>
                </span>
              </div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">Localisation</span>
                <span className="pp-contact-value">Mons / La Louvière · Belgique</span>
              </div>
            </section>
          )}

        </main>
      </div>

    </div>
  )
}
