import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type Work = {
  title: string;
  category: string;
  year: string;
  image: string;
};

const works: Work[] = [
  {
    title: 'Quiet Brand System',
    category: 'Brand / Logo',
    year: '2026',
    image: 'https://picsum.photos/seed/hin-quiet-brand/1400/1800',
  },
  {
    title: 'Archive Social Study',
    category: 'Social Media',
    year: '2025',
    image: 'https://picsum.photos/seed/hin-social-study/1400/1800',
  },
  {
    title: 'Editorial Web Interface',
    category: 'Web UI',
    year: '2025',
    image: 'https://picsum.photos/seed/hin-web-interface/1400/1800',
  },
];

const menuItems = ['Home', 'About', 'Work', 'Contact'];

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      root.classList.add('is-ready');
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', {
        y: 32,
        opacity: 0,
        filter: 'blur(10px)',
      });
      gsap.set('[data-image-reveal]', {
        clipPath: 'inset(0 0 100% 0)',
        scale: 1.08,
      });
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(root, { opacity: 1, duration: 0.1 })
        .to('[data-reveal]', {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.15,
          stagger: 0.12,
        })
        .to(
          '[data-image-reveal]',
          {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.45,
            stagger: 0.1,
          },
          0.3,
        )
        .add(() => root.classList.add('is-ready'));
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  return (
    <div className="site-shell" ref={rootRef}>
      <div className="ambient-noise" aria-hidden="true" />
      <header className="site-header" data-reveal>
        <a className="brand-mark" href="#home" aria-label="H. in Design home">
          H.
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-dot" aria-hidden="true" />
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </header>

      <main className="gallery-track" id="home">
        <section className="panel hero-panel" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="vertical-line" data-reveal>
              静けさの中に、構造を置く。
            </p>
            <h1 id="hero-title" className="hero-title" data-reveal>
              H. IN DESIGN
            </h1>
            <p className="hero-body" data-reveal>
              以簡約與秩序定義品牌辨識，用結構與細節塑造視覺識別。
            </p>
          </div>
          <figure className="hero-strip" data-image-reveal>
            <img
              src="https://picsum.photos/seed/hin-water-entrance/900/1500"
              alt="Narrow water texture used as an entrance image"
            />
          </figure>
        </section>

        <section className="panel image-panel" aria-label="Atmosphere study">
          <figure className="wide-image" data-image-reveal>
            <img
              src="https://picsum.photos/seed/hin-surface-study/1800/1200"
              alt="Soft monochrome surface study"
            />
          </figure>
        </section>

        <section className="panel about-panel" id="about" aria-labelledby="about-title">
          <div className="section-index" data-reveal>
            <span>About</span>
          </div>
          <div className="about-content">
            <h2 id="about-title" data-reveal>
              Quiet systems for visual identity.
            </h2>
            <p data-reveal>
              I shape brand, editorial and interface work through proportion, typography and rhythm. The direction is calm, but the structure is intentional.
            </p>
            <p data-reveal>
              This prototype explores a slower portfolio language: fewer buttons, stronger image pauses, and motion that behaves like a gallery transition.
            </p>
          </div>
        </section>

        <section className="panel work-panel" id="work" aria-labelledby="work-title">
          <div className="section-index" data-reveal>
            <span>Work</span>
          </div>
          <div className="work-list">
            <h2 id="work-title" className="sr-only">
              Selected work
            </h2>
            {works.map((work) => (
              <article className="work-item" key={work.title} data-reveal>
                <a href="#contact" aria-label={`${work.title} project preview`}>
                  <figure data-image-reveal>
                    <img src={work.image} alt={`${work.title} preview`} />
                  </figure>
                  <div className="work-meta">
                    <span>{work.year}</span>
                    <span>{work.category}</span>
                  </div>
                  <h3>{work.title}</h3>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="panel contact-panel" id="contact" aria-labelledby="contact-title">
          <div className="contact-inner">
            <p className="vertical-line" data-reveal>
              余白、構成、視線の速度。
            </p>
            <div>
              <h2 id="contact-title" data-reveal>
                For identity, print and web projects.
              </h2>
              <a className="contact-link" href="mailto:g5660778995@gmail.com" data-reveal>
                g5660778995@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

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
