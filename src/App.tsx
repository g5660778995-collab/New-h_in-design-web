import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type Work = {
  title: string;
  categories: string;
  year: string;
  summary: string;
  image: string;
};

const works: Work[] = [
  {
    title: 'Brand Identity Concept',
    categories: 'Brand．Visual',
    year: '2024',
    summary: 'A refined brand identity concept built around minimal typography and a calm visual system.',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Editorial Layout',
    categories: 'Visual',
    year: '2024',
    summary: 'An editorial layout study exploring spacious grids, refined hierarchy, and quiet image pacing.',
    image: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?q=80&w=1400&auto=format&fit=crop',
  },
  {
    title: 'Digital Platform UI',
    categories: 'Web UI',
    year: '2024',
    summary: 'A clean and airy interface concept for a modern digital commerce experience.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1400&auto=format&fit=crop',
  },
];

const categories = ['All', 'Brand', 'Social Media', 'Logo', 'Web UI', 'Visual'];
const menuItems = ['Home', 'About', 'Work', 'Contact'];
const experienceItems = [
  ['2019-2021', 'Packaging'],
  ['2021-2022', 'Product & Visual'],
  ['2022-2024', 'Print & Brand'],
  ['2024', 'Digital & UI'],
  ['2024-Present', 'Brand, Marketing & UI'],
];

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLElement>(null);
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
      gsap.set('[data-reveal]', { y: 28, opacity: 0, filter: 'blur(9px)' });
      gsap.set('[data-image-reveal]', { clipPath: 'inset(0 0 100% 0)', scale: 1.07 });
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(root, { opacity: 1, duration: 0.08 })
        .to('[data-reveal]', {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.075,
        })
        .to(
          '[data-image-reveal]',
          {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.35,
            stagger: 0.08,
          },
          0.22,
        )
        .add(() => root.classList.add('is-ready'));
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (event: WheelEvent) => {
      if (!window.matchMedia('(min-width: 1024px)').matches) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY * 1.12;
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => track.removeEventListener('wheel', handleWheel);
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

      <main className="gallery-track" id="home" ref={trackRef}>
        <section className="panel hero-panel" aria-labelledby="hero-title">
          <div className="hero-grid">
            <p className="vertical-line hero-jp" data-reveal>
              簡約と秩序で、静かな識別をつくる。
            </p>
            <div className="hero-statement" data-reveal>
              <p>以簡約與秩序定義品牌辨識，</p>
              <p>用結構與細節塑造視覺識別。</p>
              <p>Define brand recognition through simplicity and order, shape visual identity through structure and detail.</p>
            </div>
            <h1 id="hero-title" className="hero-title" data-reveal>
              H. IN DESIGN
            </h1>
          </div>
          <figure className="hero-strip" data-image-reveal>
            <img
              src="https://picsum.photos/seed/hin-quiet-water/900/1500"
              alt="Quiet monochrome water texture"
            />
          </figure>
        </section>

        <section className="panel atmosphere-panel" aria-label="Atmosphere image">
          <figure className="atmosphere-image" data-image-reveal>
            <img
              src="https://picsum.photos/seed/hin-archive-atmosphere/1900/1200"
              alt="Monochrome atmosphere study"
            />
          </figure>
        </section>

        <section className="panel about-panel" id="about" aria-labelledby="about-title">
          <aside className="panel-label" data-reveal>
            About
          </aside>
          <div className="about-writing">
            <h2 id="about-title" data-reveal>
              方謙鴻 Chris Fang
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
          <figure className="portrait-frame" data-image-reveal>
            <img src="https://raw.githubusercontent.com/g5660778995-collab/H.-In-Design/main/public/images/profile-photo.webp" alt="Chien Hung Fang portrait" />
          </figure>
        </section>

        <section className="panel experience-panel" aria-labelledby="experience-title">
          <aside className="panel-label" data-reveal>
            Experience
          </aside>
          <div className="experience-list" id="experience-title">
            {experienceItems.map(([year, role]) => (
              <div className="experience-row" key={`${year}-${role}`} data-reveal>
                <span>{year}</span>
                <span>{role}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel work-panel" id="work" aria-labelledby="work-title">
          <aside className="panel-label" data-reveal>
            Work
          </aside>
          <div className="category-rail" aria-label="Work categories" data-reveal>
            {categories.map((category) => (
              <button key={category} type="button">
                {category}
              </button>
            ))}
          </div>
          <div className="work-stage">
            <h2 id="work-title" className="sr-only">
              Selected work
            </h2>
            {works.map((work, index) => (
              <article className="work-item" key={work.title} data-reveal>
                <a href="#contact" aria-label={`${work.title} project preview`}>
                  <span className="work-number">0{index + 1}</span>
                  <figure data-image-reveal>
                    <img src={work.image} alt={`${work.title} preview`} />
                  </figure>
                  <div className="work-copy">
                    <p>{work.year} {work.categories}</p>
                    <h3>{work.title}</h3>
                    <span>{work.summary}</span>
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
            <h2 id="contact-title" data-reveal>
              For identity, print and web projects.
            </h2>
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
