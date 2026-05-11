import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedin, FaFileAlt, FaHome } from 'react-icons/fa'
import { playHover, playClick } from '../utils/sounds'
import profilImg from '../assets/profil.jpg'
import './PortfolioPage.css'

type Lang    = 'fr' | 'en' | 'es'
type Section = 'about' | 'skills' | 'project' | 'contact'

const SECTIONS: Section[] = ['about', 'skills', 'project', 'contact']

const SKILLS: Record<string, { name: string; level: number }[]> = {
  Langages: [
    { name: 'PHP',        level: 5 },
    { name: 'Python',     level: 4 },
    { name: 'JavaScript', level: 4 },
    { name: 'Java',       level: 4 },
    { name: 'Solidity',   level: 2 },
    { name: 'C',          level: 1 },
  ],
  Frontend: [
    { name: 'HTML',  level: 5 },
    { name: 'CSS',   level: 5 },
    { name: 'React', level: 4 },
  ],
  Backend: [
    { name: 'SQL', level: 5 },
  ],
  Outils: [
    { name: 'GitHub',  level: 4 },
    { name: 'Arduino', level: 1 },
  ],
  Créatif: [
    { name: 'Montage vidéo', level: 4 },
  ],
}

const LANG_LEVELS = [5, 5, 5, 2]

type Translation = {
  subtitle: string
  nav: Record<Section, string>
  sidebar: {
    education: string
    languages: string
    hobbies: string
    hehDetail: [string, string]
    atheneeDetail: [string, string]
    hobbiesList: string[]
    langNames: string[]
    photoAlt: string
  }
  about: { title: string; p1: string; p2: string; p3: string }
  skills: { title: string; categories: Record<string, string>; creativeSkill: string }
  projects: {
    title: string
    viewProject: string
    lava:      { tag: string; title: string; sub: string; desc1: string; desc2: string; corner: string }
    homepage:  { tag: string; title: string; sub: string; desc: string; corner: string }
    melo:      { tag: string; title: string; sub: string; desc: string; corner: string }
    videoconf: { tag: string; title: string; sub: string; desc: string; corner: string }
  }
  contact: { title: string; phone: string; location: string; locationValue: string }
}

const TRANSLATIONS: Record<Lang, Translation> = {
  fr: {
    subtitle: 'Étudiant en informatique · Bachelier en développement',
    nav: { about: 'À propos', skills: 'Compétences', project: 'Projets', contact: 'Contact' },
    sidebar: {
      education:    'Formation',
      languages:    'Langues',
      hobbies:      'Loisirs',
      hehDetail:    ['Bachelier en informatique', 'Mons · 2023 — Actuellement'],
      atheneeDetail:['CESS — Latin, Math, Sciences', 'La Louvière · 2016 — 2022'],
      hobbiesList:  ['Skateboard', 'Jeux vidéo', 'Cinéma', 'Montage vidéo'],
      langNames:    ['Français', 'Anglais', 'Espagnol', 'Néerlandais'],
      photoAlt:     'Photo de profil',
    },
    about: {
      title: 'À propos',
      p1: "Étudiant en deuxième année de bachelier en informatique à la Haute École en Hainaut, je me spécialise dans le développement logiciel. Passionné par la création d'interfaces et d'outils qui allient esthétique et fonctionnalité.",
      p2: "En 2025 et 2026, j'ai eu l'opportunité de participer à l'ETH Oxford à l'Université d'Oxford, où j'ai travaillé sur des projets alliant cryptographie, blockchain et expérience utilisateur.",
      p3: "En dehors du code, je suis passionné par le cinéma, le skateboard, et le montage vidéo.",
    },
    skills: {
      title:        'Compétences techniques',
      categories:   { Langages: 'Langages', Frontend: 'Frontend', Backend: 'Backend', Outils: 'Outils', Créatif: 'Créatif' },
      creativeSkill:'Montage vidéo',
    },
    projects: {
      title: 'Projets', viewProject: 'Voir le projet →',
      lava: {
        tag: 'ETH Oxford · 2025 & 2026', title: 'Système de transaction crypto',
        sub: 'Oxford University · Cryptographie · Blockchain · UX',
        desc1: "Développement d'un système de transaction en cryptomonnaie entièrement confidentiel et privé, conçu pour être accessible au grand public. L'objectif était de concevoir une expérience utilisateur simple et intuitive tout en garantissant un niveau de confidentialité maximal côté protocole.",
        desc2: "Projet réalisé dans le cadre d'un hackathon international regroupant des étudiants de plusieurs universités européennes.",
        corner: 'Oxford University',
      },
      homepage: {
        tag: 'Personnel · 2025', title: 'Homepage',
        sub: 'React 19 · TypeScript · Vite · Effets interactifs · Cyberpunk',
        desc: "Landing page personnelle à l'esthétique cyberpunk/rétro, construite avec React 19 et TypeScript. Intègre une séquence d'intro animée, une traînée de particules suivant la souris, un fond étoilé, un hook custom de parallaxe et une vue responsive dédiée au mobile.",
        corner: 'spidermiriki.github.io',
      },
      melo: {
        tag: 'Personnel · 2025', title: "Melo's Studio",
        sub: "Letterboxd API · React · Cinéma · Reviews",
        desc: "Application web affichant mes critiques et notes personnelles de films via l'API Letterboxd. Interface pensée autour de l'esthétique cinéphile, avec navigation par film, note et date.",
        corner: 'spidermiriki.github.io',
      },
      videoconf: {
        tag: 'HEH DST · Cours React · 2025', title: 'VideoConf Hub',
        sub: 'React 19 · Firebase · YouTube Data API v3 · GitHub Actions',
        desc: 'Application web de découverte et gestion de contenus YouTube. Authentification Google via Firebase Auth, navigation de chaînes via l\'API YouTube Data v3, et liste "Watch Later" persistée par utilisateur dans Firestore. SPA entièrement côté client déployée en CI/CD via GitHub Actions.',
        corner: 'HEH · Mons',
      },
    },
    contact: { title: 'Contact', phone: 'Téléphone', location: 'Localisation', locationValue: 'Mons / La Louvière · Belgique' },
  },

  en: {
    subtitle: "Computer Science Student · Bachelor's in Development",
    nav: { about: 'About', skills: 'Skills', project: 'Projects', contact: 'Contact' },
    sidebar: {
      education:    'Education',
      languages:    'Languages',
      hobbies:      'Hobbies',
      hehDetail:    ["Bachelor's in Computer Science", 'Mons · 2023 — Present'],
      atheneeDetail:['High School Diploma — Latin, Math, Sciences', 'La Louvière · 2016 — 2022'],
      hobbiesList:  ['Skateboarding', 'Video games', 'Cinema', 'Video editing'],
      langNames:    ['French', 'English', 'Spanish', 'Dutch'],
      photoAlt:     'Profile photo',
    },
    about: {
      title: 'About',
      p1: "A second-year Computer Science student at Haute École en Hainaut, I focus on software development. I enjoy building interfaces and tools that strike the right balance between aesthetics and functionality.",
      p2: "In 2025 and 2026, I had the chance to take part in ETH Oxford at the University of Oxford, working on projects at the crossroads of cryptography, blockchain, and user experience.",
      p3: "Outside of code, I'm into cinema, skateboarding, and video editing.",
    },
    skills: {
      title:        'Technical Skills',
      categories:   { Langages: 'Languages', Frontend: 'Frontend', Backend: 'Backend', Outils: 'Tools', Créatif: 'Creative' },
      creativeSkill:'Video editing',
    },
    projects: {
      title: 'Projects', viewProject: 'View project →',
      lava: {
        tag: 'ETH Oxford · 2025 & 2026', title: 'Crypto Transaction System',
        sub: 'Oxford University · Cryptography · Blockchain · UX',
        desc1: "We built a fully private and confidential cryptocurrency payment system, designed so anyone can use it without technical knowledge. The challenge was making the experience feel effortless while keeping the protocol as private as possible under the hood.",
        desc2: "Built during an international hackathon that brought together students from across European universities.",
        corner: 'Oxford University',
      },
      homepage: {
        tag: 'Personal · 2025', title: 'Homepage',
        sub: 'React 19 · TypeScript · Vite · Interactive Effects · Cyberpunk',
        desc: "Personal landing page with a cyberpunk/retro feel, built with React 19 and TypeScript. It includes an animated intro sequence, a particle trail that follows the cursor, a starfield background, a custom parallax hook, and a dedicated mobile layout.",
        corner: 'spidermiriki.github.io',
      },
      melo: {
        tag: 'Personal · 2025', title: "Melo's Studio",
        sub: 'Letterboxd API · React · Cinema · Reviews',
        desc: "A web app that pulls my personal film reviews and ratings from the Letterboxd API. The design leans into a cinephile aesthetic, with browsing by title, score, and date.",
        corner: 'spidermiriki.github.io',
      },
      videoconf: {
        tag: 'HEH DST · React Course · 2025', title: 'VideoConf Hub',
        sub: 'React 19 · Firebase · YouTube Data API v3 · GitHub Actions',
        desc: 'A web app to browse and manage YouTube content. Sign in with Google via Firebase Auth, explore channels through the YouTube Data API v3, and save videos to a personal "Watch Later" list stored in Firestore. Fully client-side SPA, shipped via CI/CD with GitHub Actions.',
        corner: 'HEH · Mons',
      },
    },
    contact: { title: 'Contact', phone: 'Phone', location: 'Location', locationValue: 'Mons / La Louvière · Belgium' },
  },

  es: {
    subtitle: 'Estudiante de Informática · Grado en Desarrollo de Software',
    nav: { about: 'Sobre mí', skills: 'Habilidades', project: 'Proyectos', contact: 'Contacto' },
    sidebar: {
      education:    'Formación',
      languages:    'Idiomas',
      hobbies:      'Aficiones',
      hehDetail:    ['Grado en Informática', 'Mons · 2023 — Actualmente'],
      atheneeDetail:['Bachillerato — Latín, Matemáticas, Ciencias', 'La Louvière · 2016 — 2022'],
      hobbiesList:  ['Skateboard', 'Videojuegos', 'Cine', 'Edición de vídeo'],
      langNames:    ['Francés', 'Inglés', 'Español', 'Neerlandés'],
      photoAlt:     'Foto de perfil',
    },
    about: {
      title: 'Sobre mí',
      p1: "Estudiante de segundo año del Grado en Informática en la Haute École en Hainaut, me especializo en desarrollo de software. Me apasiona crear interfaces y herramientas donde la estética y la funcionalidad van de la mano.",
      p2: "En 2025 y 2026, tuve la oportunidad de participar en ETH Oxford en la Universidad de Oxford, donde trabajé en proyectos que reunían criptografía, blockchain y experiencia de usuario.",
      p3: "Fuera del código, me apasionan el cine, el skateboard y la edición de vídeo.",
    },
    skills: {
      title:        'Habilidades técnicas',
      categories:   { Langages: 'Lenguajes', Frontend: 'Frontend', Backend: 'Backend', Outils: 'Herramientas', Créatif: 'Creativo' },
      creativeSkill:'Edición de vídeo',
    },
    projects: {
      title: 'Proyectos', viewProject: 'Ver el proyecto →',
      lava: {
        tag: 'ETH Oxford · 2025 & 2026', title: 'Sistema de pagos cripto',
        sub: 'Oxford University · Criptografía · Blockchain · UX',
        desc1: "Desarrollamos un sistema de pagos en criptomoneda completamente confidencial, pensado para que cualquier persona pueda usarlo sin conocimientos técnicos. El reto fue hacer que la experiencia resultara sencilla e intuitiva sin comprometer la privacidad a nivel de protocolo.",
        desc2: "Proyecto realizado durante un hackathon internacional con estudiantes de varias universidades europeas.",
        corner: 'Oxford University',
      },
      homepage: {
        tag: 'Personal · 2025', title: 'Homepage',
        sub: 'React 19 · TypeScript · Vite · Efectos interactivos · Cyberpunk',
        desc: "Página de inicio personal con estética cyberpunk/retro, construida con React 19 y TypeScript. Incluye una secuencia de intro animada, un rastro de partículas que sigue el cursor, un fondo estrellado, un hook personalizado de paralaje y una vista adaptada al móvil.",
        corner: 'spidermiriki.github.io',
      },
      melo: {
        tag: 'Personal · 2025', title: "Melo's Studio",
        sub: 'Letterboxd API · React · Cine · Reviews',
        desc: "Aplicación web que recoge mis críticas y puntuaciones de películas a través de la API de Letterboxd. El diseño gira en torno a la estética cinéfila, con navegación por título, puntuación y fecha.",
        corner: 'spidermiriki.github.io',
      },
      videoconf: {
        tag: 'HEH DST · Curso React · 2025', title: 'VideoConf Hub',
        sub: 'React 19 · Firebase · YouTube Data API v3 · GitHub Actions',
        desc: 'Aplicación web para explorar y gestionar contenidos de YouTube. Inicio de sesión con Google mediante Firebase Auth, navegación de canales con la API YouTube Data v3, y una lista "Ver más tarde" guardada por usuario en Firestore. SPA completamente en cliente, desplegada en CI/CD con GitHub Actions.',
        corner: 'HEH · Mons',
      },
    },
    contact: { title: 'Contacto', phone: 'Teléfono', location: 'Ubicación', locationValue: 'Mons / La Louvière · Bélgica' },
  },
}

export function PortfolioPage() {
  const [active,   setActive  ] = useState<Section>('about')
  const [lang,     setLang    ] = useState<Lang>('fr')
  const [langOpen, setLangOpen] = useState(false)
  const contentRef = useRef<HTMLElement>(null)
  const langRef    = useRef<HTMLDivElement>(null)

  const t = TRANSLATIONS[lang]

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (!langOpen) return
    function onClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [langOpen])

  function handleNav(s: Section) {
    setActive(s)
    if (window.innerWidth <= 600) {
      setTimeout(() => {
        const el = contentRef.current
        if (!el) return
        const start    = window.scrollY
        const target   = el.getBoundingClientRect().top + window.scrollY - 8
        const distance = target - start
        const duration = 520
        let startTime: number | null = null
        function step(now: number) {
          if (!startTime) startTime = now
          const elapsed = now - startTime
          const time    = Math.min(elapsed / duration, 1)
          const ease    = 1 - Math.pow(1 - time, 4)
          window.scrollTo(0, start + distance * ease)
          if (time < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }, 0)
    }
  }

  function handleRootOver(e: React.MouseEvent) {
    const target = e.target as HTMLElement
    if (target.closest('a, button')) playHover()
  }

  function handleRootClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement
    if (target.closest('a, button')) playClick()
  }

  return (
    <div className="pp-root" onMouseOver={handleRootOver} onClick={handleRootClick}>

      {/* ── Header ── */}
      <header className="pp-header">
        <div>
          <h1 className="pp-name">
            Francisco Homero<br />Derouck Arredondo
            <span>{t.subtitle}</span>
          </h1>
        </div>
        <div className="pp-header-links">
          <a href="https://spidermiriki.github.io/Homepage/" target="_blank" rel="noopener noreferrer" title="Homepage"><FaHome size={26} /></a>
          <a href="https://github.com/spidermiriki" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub size={26} /></a>
          <a href="https://www.linkedin.com/in/derouck-homero" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin size={26} /></a>
          <a href="https://spidermiriki.github.io/CV/" target="_blank" rel="noopener noreferrer" title="Curriculum Vitæ" className="pp-cv-link">
            <span className="pp-cv-label">cv</span>
            <svg className="pp-cv-arrow" width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 2,1 C 0,8 20,12 13,25" stroke="#5a3e1b" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M 9,21 L 13,25 L 17,21" stroke="#5a3e1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <FaFileAlt size={26} />
          </a>
        </div>
      </header>

      {/* ── Nav ── */}
      <nav className="pp-nav">
        {SECTIONS.map(s => (
          <button
            type="button"
            key={s}
            className={`pp-nav-item ${active === s ? 'active' : ''}`}
            onClick={() => handleNav(s)}
          >
            {t.nav[s]}
          </button>
        ))}
      </nav>

      {/* ── Body ── */}
      <div className="pp-body">

        {/* ── Sidebar ── */}
        <aside className="pp-sidebar">

          {/* ── Photo ── */}
          <div className="pp-photo-wrap">
            <img src={profilImg} alt={t.sidebar.photoAlt} />
          </div>

          <div>
            <div className="pp-section-title">{t.sidebar.education}</div>
            <div className="pp-edu-item">
              <div className="pp-edu-school">HEH DST</div>
              <div className="pp-edu-detail">{t.sidebar.hehDetail[0]}<br />{t.sidebar.hehDetail[1]}</div>
            </div>
            <div className="pp-edu-item">
              <div className="pp-edu-school">Athenée Provinciale</div>
              <div className="pp-edu-detail">{t.sidebar.atheneeDetail[0]}<br />{t.sidebar.atheneeDetail[1]}</div>
            </div>
          </div>

          <div>
            <div className="pp-section-title">{t.sidebar.languages}</div>
            {LANG_LEVELS.map((level, i) => (
              <div key={i} className="pp-lang-row">
                <span>{t.sidebar.langNames[i]}</span>
                <div className="pp-lang-dots">
                  {Array.from({ length: 5 }, (_, j) => (
                    <div key={j} className={`pp-lang-dot ${j < level ? 'filled' : ''}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="pp-section-title">{t.sidebar.hobbies}</div>
            <ul className="pp-hobbies">
              {t.sidebar.hobbiesList.map(h => <li key={h}>{h}</li>)}
            </ul>
          </div>
        </aside>

        {/* ── Content ── */}
        <main className="pp-content" ref={contentRef}>

          {active === 'about' && (
            <section>
              <div className="pp-section-title">{t.about.title}</div>
              <p className="pp-about-text pp-drop-cap">{t.about.p1}</p>
              <p className="pp-about-text pp-mt">{t.about.p2}</p>
              <p className="pp-about-text pp-mt">{t.about.p3}</p>
            </section>
          )}

          {active === 'skills' && (
            <section>
              <div className="pp-section-title">{t.skills.title}</div>
              {Object.entries(SKILLS).map(([category, items]) => (
                <div key={category} className="pp-skill-category">
                  <div className="pp-skill-category-label">
                    {t.skills.categories[category] ?? category}
                  </div>
                  {items.map(s => (
                    <div key={s.name} className="pp-skill-row">
                      <span className="pp-skill-name">
                        {s.name === 'Montage vidéo' ? t.skills.creativeSkill : s.name}
                      </span>
                      <div className="pp-skill-bar-bg">
                        <div className="pp-skill-bar-fill" data-level={s.level} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          )}

          {active === 'project' && (
            <section>
              <div className="pp-section-title">{t.projects.title}</div>
              <div className="pp-project">
                <span className="pp-project-tag">{t.projects.lava.tag}</span>
                <h2 className="pp-project-title">{t.projects.lava.title}</h2>
                <p className="pp-project-sub">{t.projects.lava.sub}</p>
                <p className="pp-project-desc">{t.projects.lava.desc1}</p>
                <p className="pp-project-desc pp-project-desc--mt">{t.projects.lava.desc2}</p>
                <div className="pp-project-links">
                  <a href="https://hugodvrs4.github.io/Lava-Payments" target="_blank" rel="noopener noreferrer" className="pp-project-link">{t.projects.viewProject}</a>
                  <a href="https://github.com/hugodvrs4/Lava-Payments" target="_blank" rel="noopener noreferrer" className="pp-project-link">GitHub →</a>
                </div>
                <span className="pp-project-corner">{t.projects.lava.corner}</span>
              </div>

              <div className="pp-project pp-project--mt">
                <span className="pp-project-tag">{t.projects.homepage.tag}</span>
                <h2 className="pp-project-title">{t.projects.homepage.title}</h2>
                <p className="pp-project-sub">{t.projects.homepage.sub}</p>
                <p className="pp-project-desc">{t.projects.homepage.desc}</p>
                <div className="pp-project-links">
                  <a href="https://spidermiriki.github.io/Homepage/" target="_blank" rel="noopener noreferrer" className="pp-project-link">{t.projects.viewProject}</a>
                  <a href="https://github.com/spidermiriki/Homepage" target="_blank" rel="noopener noreferrer" className="pp-project-link">GitHub →</a>
                </div>
                <span className="pp-project-corner">{t.projects.homepage.corner}</span>
              </div>

              <div className="pp-project pp-project--mt">
                <span className="pp-project-tag">{t.projects.melo.tag}</span>
                <h2 className="pp-project-title">{t.projects.melo.title}</h2>
                <p className="pp-project-sub">{t.projects.melo.sub}</p>
                <p className="pp-project-desc">{t.projects.melo.desc}</p>
                <div className="pp-project-links">
                  <a href="https://spidermiriki.github.io/Melo-s-Studio/" target="_blank" rel="noopener noreferrer" className="pp-project-link">{t.projects.viewProject}</a>
                  <a href="https://github.com/spidermiriki/Melo-s-Studio" target="_blank" rel="noopener noreferrer" className="pp-project-link">GitHub →</a>
                </div>
                <span className="pp-project-corner">{t.projects.melo.corner}</span>
              </div>

              <div className="pp-project pp-project--mt">
                <span className="pp-project-tag">{t.projects.videoconf.tag}</span>
                <h2 className="pp-project-title">{t.projects.videoconf.title}</h2>
                <p className="pp-project-sub">{t.projects.videoconf.sub}</p>
                <p className="pp-project-desc">{t.projects.videoconf.desc}</p>
                <div className="pp-project-links">
                  <a href="https://spidermiriki.github.io/VideoConf-Hub/" target="_blank" rel="noopener noreferrer" className="pp-project-link">{t.projects.viewProject}</a>
                  <a href="https://github.com/spidermiriki/VideoConf-Hub" target="_blank" rel="noopener noreferrer" className="pp-project-link">GitHub →</a>
                </div>
                <span className="pp-project-corner">{t.projects.videoconf.corner}</span>
              </div>
            </section>
          )}

          {active === 'contact' && (
            <section>
              <div className="pp-section-title">{t.contact.title}</div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">Email</span>
                <span className="pp-contact-value">
                  <a href="mailto:homeromiriki@gmail.com">homeromiriki@gmail.com</a>
                </span>
              </div>
              <div className="pp-contact-row">
                <span className="pp-contact-label">{t.contact.phone}</span>
                <span className="pp-contact-value">
                  <a href="tel:+32493932597">+32 493 93 25 97</a>
                </span>
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
                <span className="pp-contact-label">{t.contact.location}</span>
                <span className="pp-contact-value">{t.contact.locationValue}</span>
              </div>
            </section>
          )}

        </main>
      </div>

      {/* ── Language selector (corner) ── */}
      <div className="pp-lang-selector" ref={langRef}>
        <button
          type="button"
          className={`pp-lang-current${langOpen ? ' open' : ''}`}
          onClick={() => setLangOpen(v => !v)}
        >
          <svg className="pp-lang-border-svg" viewBox="0 0 54 30" aria-hidden="true">
            <path className="pp-lang-border-path" d="M 5,5 C 18,3 36,4 49,5 C 52,5 52,24 49,25 C 36,27 18,26 5,25 C 2,24 2,6 5,5" />
          </svg>
          <span className="pp-lang-text">{lang.toUpperCase()}</span>
          <svg className="pp-lang-caret" viewBox="0 0 10 6" aria-hidden="true">
            <path d="M 1,1 L 5,5 L 9,1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {langOpen && (
          <div className="pp-lang-dropdown">
            {(['fr', 'en', 'es'] as Lang[])
              .filter(l => l !== lang)
              .map(l => (
                <button
                  key={l}
                  type="button"
                  className="pp-lang-option"
                  onClick={() => { setLang(l); setLangOpen(false) }}
                >
                  <svg className="pp-lang-border-svg" viewBox="0 0 54 30" aria-hidden="true">
                    <path className="pp-lang-border-path pp-lang-border-animated" d="M 4,4 C 17,2 37,3 50,4 C 53,4 53,25 50,26 C 37,28 17,27 4,26 C 1,25 1,5 4,4" />
                  </svg>
                  <span className="pp-lang-text">{l.toUpperCase()}</span>
                </button>
              ))
            }
          </div>
        )}
      </div>

    </div>
  )
}
