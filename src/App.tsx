import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Clock, Menu, X } from 'lucide-react';
import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from 'shaders/react';

const navLinks = ['Projects', 'Studio', 'Journal', 'Connect'];

const smallImage = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85';
const largeImage = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85';

function useLondonTime() {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    [],
  );
  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => setTime(formatter.format(new Date())), 1000);
    return () => window.clearInterval(interval);
  }, [formatter]);

  return time;
}

function TextRoll({ children }: { children: string }) {
  return (
    <span className="relative block h-[20px] overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
        <span className="h-[20px] leading-[20px]">{children}</span>
        <span className="h-[20px] leading-[20px]">{children}</span>
      </span>
    </span>
  );
}

function PartnerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-5 w-5 fill-current text-[#E8704E] sm:h-6 sm:w-6" aria-hidden="true">
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ShaderBackground() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <Shader className="h-full w-full" style={{ width: '100%', height: '100%' }}>
        <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
        <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} opacity={0.52} />
        <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} opacity={0.38} />
        <FilmGrain strength={0.05} opacity={0.55} />
      </Shader>
    </div>
  );
}

function PillButton({ children, variant = 'dark' }: { children: string; variant?: 'dark' | 'orange' }) {
  const isOrange = variant === 'orange';
  return (
    <a
      href="#connect"
      className={`group inline-flex items-center rounded-full py-2 pl-5 pr-2 text-[13px] font-medium leading-[14px] transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:pl-6 ${
        isOrange ? 'bg-[#F26522] text-white hover:bg-[#e05a1a]' : 'bg-gray-900 text-white hover:bg-gray-800'
      }`}
    >
      <TextRoll>{children}</TextRoll>
      <span className="ml-3 grid h-7 w-7 place-items-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8">
        <ArrowRight size={15} className={isOrange ? 'text-[#F26522]' : 'text-gray-900'} />
      </span>
    </a>
  );
}

function MobileMenu({ open, onClose, londonTime }: { open: boolean; onClose: () => void; londonTime: string }) {
  return (
    <div className={`fixed inset-0 z-50 md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute inset-x-0 bottom-0 mx-3 mb-3 rounded-2xl bg-white p-5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-[13px] text-gray-600">
          <Clock size={14} />
          {londonTime} in London
        </div>
        <nav className="mb-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={onClose} className="text-[28px] font-medium leading-[32px] tracking-[-0.02em] text-gray-900">
              {link}
            </a>
          ))}
        </nav>
        <a href="#connect" onClick={onClose} className="flex items-center justify-between rounded-full bg-gray-900 py-2 pl-5 pr-2 text-[13px] font-medium text-white">
          Start a project
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-gray-900">
            <ArrowRight size={15} />
          </span>
        </a>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const londonTime = useLondonTime();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <main className="min-h-screen bg-[#EFEFEF] font-sans text-gray-900 antialiased">
      <section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#EFEFEF]">
        <ShaderBackground />

        <header className="relative z-20 mx-auto w-full max-w-[1440px] p-2 sm:p-3">
          <nav className="flex items-center justify-between rounded-full bg-white p-[5px] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-6">
              <a href="#" className="grid h-9 w-9 place-items-center rounded-full bg-gray-900 text-[10px] font-bold leading-[11px] tracking-tight text-white sm:h-10 sm:w-10">
                AX
              </a>
              <div className="hidden items-center gap-6 md:flex">
                {navLinks.map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden items-center gap-5 md:flex">
              <p className="hidden text-[13px] text-gray-600 lg:block">Taking on projects for Q1 2026</p>
              <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                <Clock size={14} />
                {londonTime} in London
              </div>
              <PillButton>Book a strategy call</PillButton>
            </div>

            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full bg-gray-900 text-white md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </header>

        <div className="relative z-20 flex flex-1 flex-col">
          <div className="flex-1" />
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
            <p className="mb-5 text-[13px] leading-[14px] tracking-wide text-gray-900 sm:mb-8">Axion Studio</p>
            <h1 className="max-w-[1080px] text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
              We craft digital experiences<span className="sm:hidden"> </span><br className="hidden sm:block" />
              for brands ready to dominate<span className="sm:hidden"> </span><br className="hidden sm:block" />
              their category online.
            </h1>
            <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">
              <PillButton variant="orange">Start a project</PillButton>
              <a href="#projects" className="group inline-flex w-fit items-center gap-3 rounded-[4px] bg-white px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:px-5 sm:py-3.5">
                <PartnerIcon />
                <span className="text-[13px] font-medium leading-[14px] text-gray-900">Certified Partner</span>
                <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] leading-[11px] text-white sm:px-2">Featured</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="overflow-hidden bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gray-900 text-[11px] font-semibold leading-[12px] text-white sm:h-7 sm:w-7">1</span>
            <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium leading-[13px] text-gray-900 sm:px-4 sm:py-1.5">Introducing Axion</span>
          </div>

          <h2 className="mb-12 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 sm:px-8 lg:mb-28 lg:px-12">
            Strategy-led creatives, delivering<span className="sm:hidden"> </span><br className="hidden sm:block" />
            results in digital and beyond.
          </h2>

          <div className="px-5 sm:px-8 lg:hidden">
            <div className="mb-8 max-w-xl">
              <p className="mb-6 text-[15px] font-medium leading-[1.6] text-gray-900">
                Through research, creative thinking and iteration we help growing brands realize their digital full potential.
              </p>
              <PillButton variant="orange">About our studio</PillButton>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <img src={smallImage} alt="Axion studio creative review" className="aspect-[438/346] rounded-xl object-cover sm:w-[45%] sm:rounded-2xl" />
              <img src={largeImage} alt="Axion studio production table" className="aspect-[900/600] rounded-xl object-cover sm:w-[55%] sm:rounded-2xl" />
            </div>
          </div>

          <div className="hidden grid-cols-[26%_1fr_48%] items-end gap-6 px-12 lg:grid xl:gap-8">
            <div className="self-end">
              <img src={smallImage} alt="Axion studio creative review" className="aspect-[438/346] w-full rounded-2xl object-cover" />
            </div>
            <div className="flex self-start justify-end">
              <div>
                <p className="mb-6 whitespace-nowrap text-[16px] leading-[1.65] text-gray-900">
                  Through research, creative thinking and iteration<br />
                  we help growing brands realize their digital full potential.
                </p>
                <PillButton variant="orange">About our studio</PillButton>
              </div>
            </div>
            <div className="self-end">
              <img src={largeImage} alt="Axion studio production table" className="aspect-[3/2] w-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gray-900 text-[11px] font-semibold leading-[12px] text-white sm:h-7 sm:w-7">2</span>
            <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium leading-[13px] text-gray-900 sm:px-4 sm:py-1.5">Featured client work</span>
          </div>

          <h2 className="mb-10 px-5 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:px-8 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16 lg:px-12">
            Our projects
          </h2>

          <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:gap-7 lg:px-12">
            <article>
              <div className="group relative aspect-[329/246] cursor-pointer overflow-hidden rounded-2xl bg-[#1a1d2e]">
                <video src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4" autoPlay muted loop playsInline className="h-full w-full object-cover" />
                <button type="button" className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-end overflow-hidden rounded-full bg-white px-3 text-gray-900 transition-all duration-300 ease-in-out group-hover:w-[148px]">
                  <span className="mr-3 whitespace-nowrap text-[13px] font-medium opacity-0 transition-opacity delay-100 duration-200 group-hover:opacity-100">Learn more</span>
                  <span className="shrink-0 -rotate-45 transition-transform duration-300 group-hover:rotate-0"><LinkIcon /></span>
                </button>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-gray-600">Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement</p>
              <h3 className="mt-1 text-[14px] font-semibold leading-[15px] text-gray-900">Narrativ</h3>
            </article>

            <article>
              <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-[#6b6b6b]">
                <video src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4" autoPlay muted loop playsInline className="h-full w-full object-cover" />
                <button type="button" className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-end overflow-hidden rounded-full bg-gray-900 px-3 text-white transition-all duration-300 ease-in-out group-hover:w-[168px]">
                  <span className="mr-3 whitespace-nowrap text-[13px] font-medium opacity-0 transition-opacity delay-100 duration-200 group-hover:opacity-100">View case study</span>
                  <ArrowRight size={14} className="shrink-0 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                </button>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-gray-600">Transforming a dated platform into a conversion-focused brand experience</p>
              <h3 className="mt-1 text-[14px] font-semibold leading-[15px] text-gray-900">Luminar</h3>
            </article>
          </div>
        </div>
      </section>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} londonTime={londonTime} />
    </main>
  );
}

export default App;
