import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type Work = {
  title: string;
  categories: string[];
  year: string;
  summary: string;
  scope: string;
  image: string;
};

const works: Work[] = [
  {
    title: 'Brand Identity Concept',
    categories: ['Brand', 'Visual'],
    year: '2024',
    summary: 'A calm identity study built with restrained typography, consistent spacing, and a quiet visual system.',
    scope: 'Identity system / art direction / layout rules',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Editorial Layout',
    categories: ['Visual'],
    year: '2024',
    summary: 'An editorial composition study focused on hierarchy, image rhythm, and refined page pacing.',
    scope: 'Print layout / type hierarchy / image direction',
    image: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Digital Platform UI',
    categories: ['Web UI'],
    year: '2024',
    summary: 'A reduced interface concept for a digital commerce experience, shaped around clarity and calm navigation.',
    scope: 'Web UI / interaction flow / component rhythm',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1600&auto=format&fit=crop',
  },
];

const categories = ['All', 'Brand', 'Social Media', 'Logo', 'Web UI', 'Visual'];
const menuItems = ['Home', 'Approach', 'About', 'Work', 'Contact'];
const experienceItems = [
  ['2019-2021', 'Packaging'],
  ['2021-2022', 'Product & Visual'],
  ['2022-2024', 'Print & Brand'],
  ['2024', 'Digital & UI'],
  ['2024-Present', 'Brand, Marketing & UI'],
];

const practiceItems = [
  {
    title: 'Brand structure',
    body: 'Identity systems, visual language, usage rules, and quiet marks that can grow across formats.',
  },
  {
    title: 'Printed matter',
    body: 'Packaging, editorial pages, campaign prints, and production-aware details for physical touchpoints.',
  },
  {
    title: 'Digital experience',
    body: 'Web UI, portfolio systems, interaction rhythm, and interface layouts with clear hierarchy.',
  },
];

const principles = [
  'Whitespace is treated as structure, not decoration.',
  'Typography is used to control speed, weight, and silence.',
  'Images are paced as objects, not filler between text blocks.',
  'Every composition should feel intentional before it feels expressive.',
];

function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLElement | null>(null);
  const targetScrollRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredWorks =
    selectedCategory === 'All'
      ? works
      : works.filter((work) => work.categories.includes(selectedCategory));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      root.classList.add('is-ready');
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', { y: 34, opacity: 0, filter: 'blur(10px)' });
      gsap.set('[data-image-reveal]', { clipPath: 'inset(0 0 100% 0)', scale: 1.06 });
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(root, { opacity: 1, duration: 0.08 })
        .to('[data-reveal]', {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.05,
          stagger: 0.055,
        })
        .to(
          '[data-image-reveal]',
          {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.28,
            stagger: 0.06,
          },
          0.18,
        )
        .add(() => root.classList.add('is-ready'));
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    targetScrollRef.current = track.scrollLeft;

    const handleWheel = (event: WheelEvent) => {
      const isDesktop = window.matchMedia('(min-width: 1181px) and (hover: hover) and (pointer: fine)').matches;
      if (!isDesktop) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      event.preventDefault();
      const maxScroll = track.scrollWidth - track.clientWidth;
      const next = Math.max(0, Math.min(maxScroll, targetScrollRef.current + event.deltaY * 1.18));
      targetScrollRef.current = next;

      gsap.to(track, {
        scrollLeft: next,
        duration: 0.72,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => track.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <div className="site-shell" ref={rootRef}>
      <div className="ambient-noise" aria-hidden="true" />
      <header className="site-header" data-reveal>
        <a className="brand-wordmark" href="#home" aria-label="H. in Design home">
          H. IN DESIGN
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="menu-line" aria-hidden="true" />
        </button>
      </header>

      <main className="gallery-track" id="home" ref={trackRef}>
        <section className="panel hero-panel" aria-labelledby="hero-title">
          <div className="hero-composition">
            <p className="vertical-line hero-jp" data-reveal>
              簡約と秩序で、静かな識別をつくる。
            </p>
            <div className="hero-kicker" data-reveal>
              Graphic design / identity / digital experience
            </div>
            <h1 id="hero-title" className="hero-title" data-reveal>
              Quiet form for clear recognition.
            </h1>
            <div className="hero-statement" data-reveal>
              <p>以簡約與秩序定義品牌辨識，</p>
              <p>用結構與細節塑造視覺識別。</p>
              <p>Define brand recognition through simplicity and order, shape visual identity through structure and detail.</p>
            </div>
          </div>
          <figure className="hero-media" data-image-reveal>
            <img
              src="https://picsum.photos/seed/hin-paper-light/1000/1400"
              alt="Soft monochrome texture study"
            />
          </figure>
        </section>

        <section className="panel approach-panel" id="approach" aria-labelledby="approach-title">
          <div className="panel-index" data-reveal>Approach</div>
          <div className="approach-writing">
            <h2 id="approach-title" data-reveal>
              A portfolio shaped like a quiet sequence.
            </h2>
            <p data-reveal>
              The site is treated as a slow walk through identity, print, and interface work. Each section keeps one clear role, so the viewer can read the work without visual noise.
            </p>
          </div>
          <ul className="principle-list" aria-label="Design principles">
            {principles.map((principle) => (
              <li key={principle} data-reveal>{principle}</li>
            ))}
          </ul>
        </section>

        <section className="panel image-panel" aria-label="Visual atmosphere">
          <figure className="atmosphere-image" data-image-reveal>
            <img
              src="https://picsum.photos/seed/hin-archive-atmosphere/1800/1200"
              alt="Quiet archive-like monochrome composition"
            />
          </figure>
          <p className="image-note" data-reveal>
            Visual rhythm is held by contrast, negative space, and the distance between objects.
          </p>
        </section>

        <section className="panel about-panel" id="about" aria-labelledby="about-title">
          <div className="panel-index" data-reveal>About</div>
          <figure className="portrait-frame" data-image-reveal>
            <img
              src="https://raw.githubusercontent.com/g5660778995-collab/H.-In-Design/main/public/images/profile-photo.webp"
              alt="Chien Hung Fang portrait"
            />
          </figure>
          <div className="about-writing">
            <h2 id="about-title" data-reveal>
              Chien Hung Fang
            </h2>
            <div className="copy-columns">
              <div data-reveal>
                <p>
                  來自台南，現居台中，專注於平面設計，並逐步延伸至 UI 與數位體驗領域。
                </p>
                <p>
                  在視覺之外，我更關注資訊的結構、字體的細節與版面的節奏，讓內容在簡約之中，維持清晰且有層次的表達。
                </p>
                <p>
                  偏好日式簡約的設計語言，透過留白、比例與秩序，建立穩定而自然的視覺關係。
                </p>
              </div>
              <div data-reveal>
                <p>
                  I come from Tainan and currently live in Taichung.
                </p>
                <p>
                  My experience includes brand identity, packaging, print production, and web interface design. I work by translating abstract concepts into tangible visual forms.
                </p>
                <p>
                  I am drawn to a Japanese minimalist approach, using whitespace, proportion, and order to create a quiet and balanced visual relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel practice-panel" aria-labelledby="practice-title">
          <div className="panel-index" data-reveal>Practice</div>
          <h2 id="practice-title" data-reveal>
            Work is organized through structure before style.
          </h2>
          <div className="practice-grid">
            {practiceItems.map((item) => (
              <article className="practice-item" key={item.title} data-reveal>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel experience-panel" aria-labelledby="experience-title">
          <div className="panel-index" data-reveal>Experience</div>
          <div className="experience-wrap">
            <h2 id="experience-title" data-reveal>
              From print production to digital interface systems.
            </h2>
            <div className="experience-list">
              {experienceItems.map(([year, role]) => (
                <div className="experience-row" key={`${year}-${role}`} data-reveal>
                  <span>{year}</span>
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel work-panel" id="work" aria-labelledby="work-title">
          <div className="panel-index" data-reveal>Work</div>
          <div className="work-intro">
            <h2 id="work-title" data-reveal>
              Selected studies in identity, print, and web UI.
            </h2>
            <div className="category-rail" aria-label="Work categories" data-reveal>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={selectedCategory === category ? 'is-active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="work-stage" aria-live="polite">
            {filteredWorks.map((work, index) => (
              <article className="work-item" key={work.title} data-reveal>
                <a href="#contact" aria-label={`${work.title} project preview`}>
                  <figure data-image-reveal>
                    <img src={work.image} alt={`${work.title} preview`} />
                  </figure>
                  <div className="work-copy">
                    <p>{work.year} {work.categories.join('．')}</p>
                    <h3>{work.title}</h3>
                    <span>{work.summary}</span>
                    <small>{String(index + 1).padStart(2, '0')} / {work.scope}</small>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="panel contact-panel" id="contact" aria-labelledby="contact-title">
          <p className="vertical-line contact-jp" data-reveal>
            余白、構成、視線の速度。
          </p>
          <div className="contact-copy">
            <div className="panel-index" data-reveal>Contact</div>
            <h2 id="contact-title" data-reveal>
              For identity, print, and web projects.
            </h2>
            <p data-reveal>
              If the project needs calm hierarchy, careful spacing, and visual systems that can last across formats, let us begin with a conversation.
            </p>
            <dl data-reveal>
              <div>
                <dt>Phone</dt>
                <dd><a href="tel:+886968960780">+886 968 960 780</a></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:g5660778995@gmail.com">g5660778995@gmail.com</a></dd>
              </div>
              <div>
                <dt>Social</dt>
                <dd>
                  <a href="#">Instagram</a>
                  <a href="https://line.me/ti/p/9Z8KIFe2Qe" target="_blank" rel="noreferrer">LINE</a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <p className="site-credit" data-reveal>© H. in Design</p>

      <aside className="site-menu" id="site-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Primary navigation">
          {menuItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default App;
