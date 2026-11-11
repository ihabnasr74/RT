import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_CONTENT, computeScrollProgress } from './data/portfolioContent';
import { ThreeWorldCanvas } from './components/ThreeWorldCanvas';
import {
  IconCompanyProfile,
  IconDiamond,
  IconGears,
  IconTransactions,
  IconTranslationProcessDoc,
  IconTarget,
  IconShieldLock,
  IconClock,
  IconStepHexagon,
  IconContactChannel,
  WideWorldParallaxBackdrop,
  EarthVeilAndLightBeam,
} from './components/TranslationIcons3D';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [reducedMotion, setReducedMotion] = useState(false);

  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const topbarBgRef = useRef<HTMLDivElement | null>(null);
  const dockingLogoRef = useRef<HTMLDivElement | null>(null);
  const heroTitleCardRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // GSAP + ScrollTrigger Master Choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        if (dockingLogoRef.current) {
          gsap.set(dockingLogoRef.current, { y: 0, scale: 0.44, opacity: 1 });
        }
        if (topbarBgRef.current) {
          gsap.set(topbarBgRef.current, { opacity: 1 });
        }
        return;
      }

      // 1. Dedicated Logo Intro Animation on Page Load + First Portfolio Text
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      introTl
        .fromTo(
          '.gsap-logo-frame',
          { opacity: 0, scale: 0.72, y: 28 },
          { opacity: 1, scale: 1, y: 0, duration: 1.15 }
        )
        .fromTo(
          '.gsap-hero-line',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.15 },
          '-=0.55'
        );

      // 2. Scroll-Scrubbed Logo Docking into Fixed Top Bar + Progress Bar + Continuous Background Parallax
      const bgParallaxEls = gsap.utils.toArray<HTMLElement>('[data-gsap-bg-parallax]');

      const syncScrollMotion = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const globalP = computeScrollProgress(scrollY, maxScroll);
        scrollProgressRef.current = globalP;

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${globalP.toFixed(4)})`;
        }

        // Logo smoothly shrinks and docks from y=46px (scale=1) into top bar y=0px (scale=0.45)
        const dockP = Math.min(Math.max(scrollY / 240, 0), 1);
        const easedDock = 1 - Math.pow(1 - dockP, 3);
        if (topbarBgRef.current) {
          topbarBgRef.current.style.opacity = String(easedDock.toFixed(3));
        }
        if (dockingLogoRef.current) {
          const yVal = (1 - easedDock) * 46;
          const scaleVal = 1 - easedDock * 0.55;
          dockingLogoRef.current.style.transform = `translate3d(0, ${yVal.toFixed(2)}px, 0) scale(${scaleVal.toFixed(4)})`;
        }

        // Continuous Wide-World Backdrop Parallax from top (0%) to bottom (100%)
        const isMobile = window.innerWidth < 768;
        const factor = isMobile ? 0.4 : 1;
        bgParallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.gsapBgParallax || '0') * factor;
          const rot = parseFloat(el.dataset.gsapBgRotate || '0') * factor;
          const py = globalP * speed * 2.2;
          const rz = globalP * rot * 2.5;
          el.style.transform = `translate3d(0, ${py.toFixed(1)}px, 0) rotate(${rz.toFixed(1)}deg)`;
        });
      };

      syncScrollMotion();
      window.addEventListener('scroll', syncScrollMotion, { passive: true });
      window.addEventListener('resize', syncScrollMotion, { passive: true });
      ScrollTrigger.addEventListener('refresh', syncScrollMotion);

      // 3. Multi-Speed Section Floating 3D Icons Parallax (GSAP ScrollTrigger scrub)
      const isMobile = window.innerWidth < 768;
      const parallaxMultiplier = isMobile ? 0.4 : 1;

      gsap.utils.toArray<HTMLElement>('[data-gsap-parallax]').forEach((el) => {
        const speedY = parseFloat(el.dataset.gsapParallax || '-120') * parallaxMultiplier;
        const rotZ = parseFloat(el.dataset.gsapRotate || '18') * parallaxMultiplier;
        gsap.fromTo(
          el,
          { y: -speedY * 0.5, rotation: -rotZ * 0.5 },
          {
            y: speedY,
            rotation: rotZ,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });

      // 4. Section Headings Line-by-Line 3D Reveal
      gsap.utils.toArray<HTMLElement>('[data-gsap-heading]').forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 38, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 5. Varied Section Card Entrances
      // Section 1: Company Profile Symmetrical Dual Panels
      gsap.utils.toArray<HTMLElement>('.gsap-profile-panel').forEach((panel, i) => {
        gsap.fromTo(
          panel,
          {
            opacity: 0,
            x: i === 0 ? 64 * parallaxMultiplier : -64 * parallaxMultiplier,
            rotationY: i === 0 ? -10 : 10,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Section 2: Core Values Staggered 3D Scale
      gsap.fromTo(
        '.gsap-value-card',
        { opacity: 0, y: 52, scale: 0.88, rotationX: 14 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.85,
          stagger: 0.13,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: '#section-core-values',
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Section 3: Specialized Services Staggered Slide Cards
      gsap.utils.toArray<HTMLElement>('.gsap-service-group').forEach((group) => {
        const items = group.querySelectorAll('.gsap-service-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 28, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Section 5: Service Request Process 5 Hexagonal 3D Cards Cascade
      gsap.fromTo(
        '.gsap-step-card',
        { opacity: 0, y: 64, scale: 0.86, rotationY: -15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#section-process',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Section 6: Communication Channels 3D Cards Entrance
      gsap.fromTo(
        '.gsap-contact-card',
        { opacity: 0, y: 44, scale: 0.9, rotationX: 12 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '#section-contact',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 6. Count-Up Numbers triggered by ScrollTrigger
      gsap.utils.toArray<HTMLElement>('[data-gsap-countup]').forEach((numEl) => {
        const targetVal = parseInt(numEl.dataset.gsapCountup || '0', 10);
        if (!targetVal) return;
        const counterObj = { val: 0 };
        ScrollTrigger.create({
          trigger: numEl,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.to(counterObj, {
              val: targetVal,
              duration: 1.0,
              ease: 'power2.out',
              onUpdate: () => {
                numEl.textContent = String(Math.round(counterObj.val));
              },
              onComplete: () => {
                numEl.textContent = String(targetVal);
              },
            });
          },
        });
      });

      return () => {
        window.removeEventListener('scroll', syncScrollMotion);
        window.removeEventListener('resize', syncScrollMotion);
        ScrollTrigger.removeEventListener('refresh', syncScrollMotion);
      };
    }, mainWrapperRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Interactive 3D Mouse Tilt on Cards
  const handleCardPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: relX * 9,
      rotationX: -relY * 9,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleCardPointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion) return;
    gsap.to(e.currentTarget, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const coreValueIcons = [
    <IconTarget key="target" className="w-10 h-10 shrink-0" />,
    <IconShieldLock key="shield" className="w-10 h-10 shrink-0" />,
    <IconClock key="clock" className="w-10 h-10 shrink-0" />,
    <IconDiamond key="diamond" className="w-10 h-10 shrink-0" />,
  ];

  return (
    <div
      ref={mainWrapperRef}
      className="min-h-screen w-full max-w-[100vw] overflow-x-hidden text-white relative selection:bg-[#26b5be] selection:text-[#03191f]"
    >
      {/* Layer 1 (z-0): Deep Turquoise Wide-World & Translation Symbols SVG Parallax Backdrop */}
      <WideWorldParallaxBackdrop />

      {/* Layer 2 (z-[1]): Full-Viewport 3D Wide-World Earth Globe & Floating 3D Translation Monuments */}
      <ThreeWorldCanvas scrollProgressRef={scrollProgressRef} reducedMotion={reducedMotion} />

      {/* Layer 3 (z-[2]): Semi-Transparent Veil directly over the 3D Earth + Central Volumetric Light Beam + Subtle Dust Motes */}
      <EarthVeilAndLightBeam />

      {/* Thin Scroll Progress Bar at top */}
      <div className="scroll-progress-track" aria-hidden="true">
        <div ref={progressBarRef} className="scroll-progress-bar" />
      </div>

      {/* Fixed Top Bar + Large Transparent Docking Logo (NO Gray Box!) */}
      <header className="fixed top-0 left-0 right-0 z-50 h-22 pointer-events-none flex items-center justify-center overflow-visible">
        <div
          ref={topbarBgRef}
          className="absolute inset-0 bg-gradient-to-r from-[#09424b]/95 via-[#137482]/95 to-[#09424b]/95 border-b-2 border-[#26b5be]/60 shadow-xl"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />
        <div
          ref={dockingLogoRef}
          data-testid="docking-logo-wrapper"
          className="relative z-10 pointer-events-auto origin-center will-change-transform max-w-[92vw]"
          style={{ transform: 'translate3d(0, 46px, 0) scale(1)' }}
        >
          <div className="gsap-logo-frame relative px-4 sm:px-6 py-3">
            <div
              className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(13,92,104,0.32)_0%,rgba(24,164,173,0.12)_52%,transparent_76%)] pointer-events-none"
              aria-hidden="true"
            />
            <img
              src={PORTFOLIO_CONTENT.logoPath}
              alt={PORTFOLIO_CONTENT.logoAlt}
              className="transparent-logo-img relative z-10 block w-[270px] sm:w-[450px] md:w-[540px] h-auto object-contain mx-auto"
            />
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* =====================================================================
            HERO / 3D WIDE-WORLD HEADER BANNER (Portfolio Image 1 Top)
            Generous spacing between large transparent logo and title box below
           ===================================================================== */}
        <section
          data-section-id="hero"
          className="relative pt-76 sm:pt-88 md:pt-96 pb-20 px-4 sm:px-8"
        >
          {/* Floating 3D Parallax Translation Icons around Hero */}
          <div
            data-gsap-parallax="-150"
            data-gsap-rotate="24"
            aria-hidden="true"
            className="floating-3d-icon absolute top-44 left-[5%] hidden md:block"
          >
            <IconStepHexagon stepNumber={4} className="w-22 h-22" />
          </div>
          <div
            data-gsap-parallax="130"
            data-gsap-rotate="-20"
            aria-hidden="true"
            className="floating-3d-icon absolute bottom-12 right-[6%] hidden md:block"
          >
            <IconStepHexagon stepNumber={1} className="w-22 h-22" />
          </div>

          <div className="max-w-5xl w-full mx-auto text-center relative z-10">
            <div
              ref={heroTitleCardRef}
              onPointerMove={handleCardPointerMove}
              onPointerLeave={handleCardPointerLeave}
              className="hero-metallic-box inline-block max-w-4xl w-full mx-auto px-6 py-10 sm:px-14 sm:py-12 rounded-3xl"
            >
              {/* Arabic Heading — Matched in size, weight, and style with English below */}
              <div className="overflow-hidden mb-5">
                <h1
                  dir="rtl"
                  lang="ar"
                  className="gsap-hero-line font-heading text-3xl sm:text-5xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
                >
                  {PORTFOLIO_CONTENT.header.ar}
                </h1>
              </div>

              <div
                className="gsap-hero-line w-40 h-1 bg-gradient-to-r from-transparent via-[#a5f3fc] to-transparent mx-auto my-5 rounded-full"
                aria-hidden="true"
              />

              {/* English Heading — Exact same font size, weight, and color as Arabic */}
              <div dir="ltr" lang="en" className="space-y-2">
                <div className="overflow-hidden">
                  <p className="gsap-hero-line font-heading text-3xl sm:text-5xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    {PORTFOLIO_CONTENT.header.enLine1}
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p className="gsap-hero-line font-heading text-3xl sm:text-5xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    {PORTFOLIO_CONTENT.header.enLine2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            PORTFOLIO IMAGE 1 — SECTION 1: COMPANY PROFILE / الملف التعريفي
           ===================================================================== */}
        <section
          id="section-company-profile"
          data-section-id="company-profile"
          className="relative py-20 md:py-28 px-4 sm:px-8"
        >
          {/* Floating Parallax Translation Icons */}
          <div
            data-gsap-parallax="-170"
            data-gsap-rotate="28"
            aria-hidden="true"
            className="floating-3d-icon absolute top-14 left-[4%] hidden lg:block"
          >
            <IconCompanyProfile className="w-16 h-16" />
          </div>
          <div
            data-gsap-parallax="140"
            data-gsap-rotate="-22"
            aria-hidden="true"
            className="floating-3d-icon absolute bottom-10 right-[4%] hidden lg:block"
          >
            <IconGears className="w-16 h-16" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Symmetrical Bilingual Section Header */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12">
              <div
                data-gsap-heading
                dir="rtl"
                lang="ar"
                className="metallic-section-badge min-w-[260px] sm:min-w-[300px] h-16 sm:h-18 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.companyProfile.heading.ar}
                </h2>
                <IconCompanyProfile className="w-9 h-9 shrink-0" />
              </div>

              <div
                className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-[#0d5c68]/50 via-[#18a4ad]/25 to-[#0d5c68]/50 mx-4"
                aria-hidden="true"
              />

              <div
                data-gsap-heading
                dir="ltr"
                lang="en"
                className="metallic-section-badge min-w-[260px] sm:min-w-[300px] h-16 sm:h-18 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <IconCompanyProfile className="w-9 h-9 shrink-0" />
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.companyProfile.heading.en}
                </h2>
              </div>
            </div>

            {/* Symmetrical Dual 3D Panels (Matched Arabic & English size and shape) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {/* Arabic Column (RTL) */}
              <div
                dir="rtl"
                lang="ar"
                onPointerMove={handleCardPointerMove}
                onPointerLeave={handleCardPointerLeave}
                className="gsap-profile-panel luminous-card rounded-3xl p-7 sm:p-10 flex flex-col justify-between gap-6 text-right h-full"
              >
                {PORTFOLIO_CONTENT.companyProfile.paragraphsAr.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-lg sm:text-xl leading-relaxed text-white font-bold"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* English Column (LTR) — Matched font size, weight, and height */}
              <div
                dir="ltr"
                lang="en"
                onPointerMove={handleCardPointerMove}
                onPointerLeave={handleCardPointerLeave}
                className="gsap-profile-panel luminous-card rounded-3xl p-7 sm:p-10 flex flex-col justify-between gap-6 text-left h-full"
              >
                {PORTFOLIO_CONTENT.companyProfile.paragraphsEn.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-lg sm:text-xl leading-relaxed text-[#e2f9fc] font-bold"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            PORTFOLIO IMAGE 1 — SECTION 2: OUR CORE VALUES / قيَمنا الجوهرية
           ===================================================================== */}
        <section
          id="section-core-values"
          data-section-id="core-values"
          className="relative py-20 md:py-28 px-4 sm:px-8"
        >
          <div
            data-gsap-parallax="-160"
            data-gsap-rotate="-25"
            aria-hidden="true"
            className="floating-3d-icon absolute top-16 right-[4%] hidden lg:block"
          >
            <IconDiamond className="w-18 h-18" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Symmetrical Bilingual Section Header */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12">
              <div
                data-gsap-heading
                dir="rtl"
                lang="ar"
                className="metallic-section-badge min-w-[260px] sm:min-w-[300px] h-16 sm:h-18 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.coreValues.heading.ar}
                </h2>
                <IconDiamond className="w-9 h-9 shrink-0" />
              </div>

              <div
                className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-[#0d5c68]/50 via-[#18a4ad]/25 to-[#0d5c68]/50 mx-4"
                aria-hidden="true"
              />

              <div
                data-gsap-heading
                dir="ltr"
                lang="en"
                className="metallic-section-badge min-w-[260px] sm:min-w-[300px] h-16 sm:h-18 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <IconDiamond className="w-9 h-9 shrink-0" />
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.coreValues.heading.en}
                </h2>
              </div>
            </div>

            {/* 4 Core Values Symmetrical 3D Cards (Matched Arabic & English size and shape) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {PORTFOLIO_CONTENT.coreValues.items.map((item, idx) => (
                <article
                  key={idx}
                  onPointerMove={handleCardPointerMove}
                  onPointerLeave={handleCardPointerLeave}
                  className="gsap-value-card luminous-card rounded-3xl p-7 sm:p-9 flex flex-col justify-between gap-5 h-full"
                >
                  <div dir="rtl" lang="ar" className="flex items-center gap-4 text-right">
                    <div
                      data-gsap-parallax="-30"
                      className="p-2.5 rounded-2xl bg-[#0d5c68] text-white border border-[#67e8f9]/60 shrink-0 shadow-md"
                    >
                      {coreValueIcons[idx]}
                    </div>
                    <p className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-snug">
                      {item.ar}
                    </p>
                  </div>

                  <div className="w-full h-0.5 bg-[#67e8f9]/25" aria-hidden="true" />

                  <div dir="ltr" lang="en" className="flex items-center gap-4 text-left">
                    <div className="p-2.5 rounded-2xl bg-[#0d5c68] text-white border border-[#67e8f9]/60 shrink-0 shadow-md">
                      {coreValueIcons[idx]}
                    </div>
                    <p className="font-heading text-xl sm:text-2xl font-extrabold text-[#a5f3fc] leading-snug">
                      {item.en}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            PORTFOLIO IMAGE 1 — SECTION 3: OUR SPECIALIZED SERVICES / خدماتنا المتخصصة
           ===================================================================== */}
        <section
          id="section-specialized-services"
          data-section-id="specialized-services"
          className="relative py-20 md:py-28 px-4 sm:px-8"
        >
          <div
            data-gsap-parallax="-180"
            data-gsap-rotate="35"
            aria-hidden="true"
            className="floating-3d-icon absolute top-24 left-[3%] hidden lg:block"
          >
            <IconGears className="w-20 h-20" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Symmetrical Bilingual Section Header */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12">
              <div
                data-gsap-heading
                dir="rtl"
                lang="ar"
                className="metallic-section-badge min-w-[260px] sm:min-w-[300px] h-16 sm:h-18 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.specializedServices.heading.ar}
                </h2>
                <IconGears className="w-9 h-9 shrink-0" />
              </div>

              <div
                className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-[#0d5c68]/50 via-[#18a4ad]/25 to-[#0d5c68]/50 mx-4"
                aria-hidden="true"
              />

              <div
                data-gsap-heading
                dir="ltr"
                lang="en"
                className="metallic-section-badge min-w-[260px] sm:min-w-[300px] h-16 sm:h-18 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <IconGears className="w-9 h-9 shrink-0" />
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.specializedServices.heading.en}
                </h2>
              </div>
            </div>

            {/* Category 1: Translation Services / خدمات الترجمة (Matched Rows) */}
            <div className="gsap-service-group luminous-card rounded-3xl p-6 sm:p-10 mb-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-[#67e8f9]/30">
                <div dir="rtl" lang="ar" className="flex items-center gap-4">
                  <span
                    data-gsap-countup={PORTFOLIO_CONTENT.specializedServices.group1.number}
                    className="w-12 h-12 rounded-xl bg-[#18a4ad] text-white border border-[#a5f3fc] font-heading text-2xl font-extrabold inline-flex items-center justify-center shadow-md tabular-nums"
                  >
                    {PORTFOLIO_CONTENT.specializedServices.group1.number}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                    {PORTFOLIO_CONTENT.specializedServices.group1.titleAr}
                  </h3>
                </div>

                <div dir="ltr" lang="en" className="flex items-center gap-4 self-end sm:self-auto">
                  <span
                    data-gsap-countup={PORTFOLIO_CONTENT.specializedServices.group1.number}
                    className="w-12 h-12 rounded-xl bg-[#18a4ad] text-white border border-[#a5f3fc] font-heading text-2xl font-extrabold inline-flex items-center justify-center shadow-md tabular-nums"
                  >
                    {PORTFOLIO_CONTENT.specializedServices.group1.number}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#a5f3fc]">
                    {PORTFOLIO_CONTENT.specializedServices.group1.titleEn}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {PORTFOLIO_CONTENT.specializedServices.group1.itemsAr.map((itemAr, idx) => {
                  const itemEn = PORTFOLIO_CONTENT.specializedServices.group1.itemsEn[idx];
                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-stretch"
                    >
                      <div
                        dir="rtl"
                        lang="ar"
                        className="gsap-service-item luminous-subcard p-5 rounded-2xl text-right font-heading text-lg sm:text-xl font-bold text-white leading-relaxed flex items-center"
                      >
                        {itemAr}
                      </div>
                      <div
                        dir="ltr"
                        lang="en"
                        className="gsap-service-item luminous-subcard p-5 rounded-2xl text-left font-heading text-lg sm:text-xl font-bold text-[#e2f9fc] leading-relaxed flex items-center"
                      >
                        {itemEn}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category 2: Other Services / خدماتنا الأخرى (Matched 10 Paired Rows) */}
            <div className="gsap-service-group luminous-card rounded-3xl p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-[#67e8f9]/30">
                <div dir="rtl" lang="ar" className="flex items-center gap-4">
                  <span
                    data-gsap-countup={PORTFOLIO_CONTENT.specializedServices.group2.number}
                    className="w-12 h-12 rounded-xl bg-[#18a4ad] text-white border border-[#a5f3fc] font-heading text-2xl font-extrabold inline-flex items-center justify-center shadow-md tabular-nums"
                  >
                    {PORTFOLIO_CONTENT.specializedServices.group2.number}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                    {PORTFOLIO_CONTENT.specializedServices.group2.titleAr}
                  </h3>
                </div>

                <div dir="ltr" lang="en" className="flex items-center gap-4 self-end sm:self-auto">
                  <span
                    data-gsap-countup={PORTFOLIO_CONTENT.specializedServices.group2.number}
                    className="w-12 h-12 rounded-xl bg-[#18a4ad] text-white border border-[#a5f3fc] font-heading text-2xl font-extrabold inline-flex items-center justify-center shadow-md tabular-nums"
                  >
                    {PORTFOLIO_CONTENT.specializedServices.group2.number}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#a5f3fc]">
                    {PORTFOLIO_CONTENT.specializedServices.group2.titleEn}
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5">
                {PORTFOLIO_CONTENT.specializedServices.group2.itemsAr.map((itemAr, idx) => {
                  const itemEn = PORTFOLIO_CONTENT.specializedServices.group2.itemsEn[idx];
                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-stretch"
                    >
                      <div
                        dir="rtl"
                        lang="ar"
                        className="gsap-service-item luminous-subcard p-4 sm:p-5 rounded-xl text-right font-heading text-lg sm:text-xl font-bold text-white flex items-center"
                      >
                        {itemAr}
                      </div>
                      <div
                        dir="ltr"
                        lang="en"
                        className="gsap-service-item luminous-subcard p-4 sm:p-5 rounded-xl text-left font-heading text-lg sm:text-xl font-bold text-[#e2f9fc] flex items-center"
                      >
                        {itemEn}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            PORTFOLIO IMAGE 2 — SECTION 4: TRANSACTIONS PROCESSING / تخليص المعاملات
           ===================================================================== */}
        <section
          id="section-transactions"
          data-section-id="transactions-processing"
          className="relative py-14 md:py-18 px-4 sm:px-8"
        >
          <div className="max-w-6xl mx-auto relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
            <div
              data-gsap-heading
              dir="rtl"
              lang="ar"
              className="metallic-section-badge min-w-[260px] sm:min-w-[320px] h-18 sm:h-20 px-8 rounded-2xl text-white inline-flex items-center justify-between gap-4"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                {PORTFOLIO_CONTENT.transactionsProcessing.heading.ar}
              </h2>
              <IconTransactions className="w-10 h-10 shrink-0" />
            </div>

            <div
              className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-[#0d5c68] via-[#18a4ad] to-[#0d5c68] mx-6"
              aria-hidden="true"
            />

            <div
              data-gsap-heading
              dir="ltr"
              lang="en"
              className="metallic-section-badge min-w-[260px] sm:min-w-[320px] h-18 sm:h-20 px-8 rounded-2xl text-white inline-flex items-center justify-between gap-4"
            >
              <IconTransactions className="w-10 h-10 shrink-0" />
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                {PORTFOLIO_CONTENT.transactionsProcessing.heading.en}
              </h2>
            </div>
          </div>
        </section>

        {/* =====================================================================
            PORTFOLIO IMAGE 2 — SECTION 5: TRANSLATION REQUEST PROCESS / إجراءات طلب الترجمة
           ===================================================================== */}
        <section
          id="section-process"
          data-section-id="translation-request-process"
          className="relative py-20 md:py-28 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Symmetrical Bilingual Section Header matching Reference Image */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-16 max-w-6xl mx-auto">
              <div
                data-gsap-heading
                dir="rtl"
                lang="ar"
                className="metallic-section-badge min-w-[270px] sm:min-w-[320px] h-18 sm:h-20 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.serviceRequestProcess.heading.ar}
                </h2>
                <IconTranslationProcessDoc className="w-10 h-10 shrink-0" />
              </div>

              <div
                className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-[#26b5be]/60 via-[#67e8f9]/40 to-[#26b5be]/60 mx-4"
                aria-hidden="true"
              />

              <div
                data-gsap-heading
                dir="ltr"
                lang="en"
                className="metallic-section-badge min-w-[270px] sm:min-w-[340px] h-18 sm:h-20 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <IconTranslationProcessDoc className="w-10 h-10 shrink-0" />
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.serviceRequestProcess.heading.en}
                </h2>
              </div>
            </div>

            {/* 6-Step Horizontal Ribbon & Cards matching Uploaded Reference Image */}
            <div dir="ltr" className="relative py-4">
              {/* Continuous Horizontal Metallic Teal Ribbon Bar across the middle */}
              <div
                className="process-ribbon-bar hidden xl:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 h-24 z-0 items-center justify-end pr-2 rounded-2xl"
                aria-hidden="true"
              >
                {/* Closing right-end white arrow triangle */}
                <svg viewBox="0 0 16 28" className="w-3.5 h-6 fill-white opacity-95">
                  <polygon points="0,0 16,14 0,28" />
                </svg>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 xl:gap-5 px-2 xl:px-7 items-stretch">
                {PORTFOLIO_CONTENT.serviceRequestProcess.steps.map((step) => (
                  <article
                    key={step.number}
                    onPointerMove={handleCardPointerMove}
                    onPointerLeave={handleCardPointerLeave}
                    className="gsap-step-card luminous-card rounded-2xl p-5 pt-7 pb-7 flex flex-col justify-between relative min-h-[290px] text-center"
                  >
                    {/* Step Number Circle + Directional Arrow on Left Edge (Matching Reference) */}
                    <div
                      className="flex items-center gap-1.5 xl:absolute xl:-left-5 xl:top-1/2 xl:-translate-y-1/2 z-20 mb-3 xl:mb-0 justify-center"
                    >
                      <svg
                        viewBox="0 0 14 24"
                        className="w-3 h-5 fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] hidden xl:block"
                        aria-hidden="true"
                      >
                        <polygon points="0,0 14,12 0,24" />
                      </svg>
                      <div
                        data-gsap-countup={step.number}
                        className="process-step-circle w-10 h-10 rounded-full text-[#084c59] font-heading text-lg font-extrabold flex items-center justify-center tabular-nums shrink-0"
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Top Half: Verbatim Arabic Step Text */}
                    <div
                      dir="rtl"
                      lang="ar"
                      className="flex-1 flex items-center justify-center px-1"
                    >
                      <p className="font-heading text-sm sm:text-base font-extrabold text-white leading-relaxed text-center">
                        {step.bodyAr}
                      </p>
                    </div>

                    {/* Center Divider Bar */}
                    <div className="my-4 flex items-center justify-center" aria-hidden="true">
                      <span className="w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-[#67e8f9] to-transparent opacity-80" />
                    </div>

                    {/* Bottom Half: Verbatim English Step Text */}
                    <div
                      dir="ltr"
                      lang="en"
                      className="flex-1 flex items-center justify-center px-1"
                    >
                      <p className="font-heading text-sm sm:text-base font-bold text-[#a5f3fc] leading-relaxed text-center">
                        {step.bodyEn}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            PORTFOLIO IMAGE 2 — SECTION 6: COMMUNICATION CHANNELS / قنوات التواصل
           ===================================================================== */}
        <section
          id="section-contact"
          data-section-id="communication-channels"
          className="relative pt-20 pb-28 px-4 sm:px-8"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Symmetrical Bilingual Section Header */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
              <div
                data-gsap-heading
                dir="rtl"
                lang="ar"
                className="metallic-section-badge min-w-[260px] sm:min-w-[300px] h-16 sm:h-18 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.communicationChannels.heading.ar}
                </h2>
                <IconContactChannel type="Whatsapp" className="w-9 h-9 shrink-0" />
              </div>

              <div
                className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-[#26b5be]/60 via-[#67e8f9]/40 to-[#26b5be]/60 mx-4"
                aria-hidden="true"
              />

              <div
                data-gsap-heading
                dir="ltr"
                lang="en"
                className="metallic-section-badge min-w-[260px] sm:min-w-[300px] h-16 sm:h-18 text-white px-7 rounded-2xl inline-flex items-center justify-between gap-4"
              >
                <IconContactChannel type="Email" className="w-9 h-9 shrink-0" />
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
                  {PORTFOLIO_CONTENT.communicationChannels.heading.en}
                </h2>
              </div>
            </div>

            {/* Lead-in Bilingual Lines — Matched Size & Shape */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 items-stretch">
              <div className="luminous-subcard rounded-2xl p-5 flex items-center justify-end">
                <p
                  data-gsap-heading
                  dir="rtl"
                  lang="ar"
                  className="font-heading text-xl sm:text-2xl font-extrabold text-white text-right"
                >
                  {PORTFOLIO_CONTENT.communicationChannels.leadAr}
                </p>
              </div>
              <div className="luminous-subcard rounded-2xl p-5 flex items-center justify-start">
                <p
                  data-gsap-heading
                  dir="ltr"
                  lang="en"
                  className="font-heading text-xl sm:text-2xl font-extrabold text-[#a5f3fc] text-left"
                >
                  {PORTFOLIO_CONTENT.communicationChannels.leadEn}
                </p>
              </div>
            </div>

            {/* 3 Contact Cards */}
            <div dir="ltr" lang="en" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PORTFOLIO_CONTENT.communicationChannels.channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  onPointerMove={handleCardPointerMove}
                  onPointerLeave={handleCardPointerLeave}
                  className="gsap-contact-card luminous-card group flex items-center gap-5 rounded-3xl p-7 focus-visible:outline-2 focus-visible:outline-[#67e8f9]"
                >
                  <div className="p-3.5 rounded-2xl bg-[#0d5c68] text-white border border-[#67e8f9]/60 shrink-0 shadow-md">
                    <IconContactChannel
                      type={channel.label as 'Email' | 'Whatsapp' | 'Hotline'}
                      className="w-11 h-11"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-2xl font-extrabold text-[#67e8f9] mb-1">
                      {channel.label}
                    </h3>
                    <p className="font-heading text-base sm:text-lg font-extrabold text-white whitespace-nowrap tabular-nums">
                      {channel.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Closing Footer Banner with Transparent Large Logo */}
      <footer className="relative z-10 bg-gradient-to-r from-[#09424b] via-[#137482] to-[#09424b] border-t-4 border-[#26b5be] py-12 px-4 text-center">
        <div className="max-w-md mx-auto px-4">
          <img
            src={PORTFOLIO_CONTENT.logoPath}
            alt={PORTFOLIO_CONTENT.logoAlt}
            className="transparent-logo-img w-full h-auto block object-contain mx-auto"
          />
        </div>
      </footer>
    </div>
  );
}
