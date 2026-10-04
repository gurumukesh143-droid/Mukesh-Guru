import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  Star,
  Maximize2,
  MessageCircle,
  Camera,
  RotateCcw,
} from 'lucide-react';
import {
  STUDIO_IMAGES,
  CONTACT_INFO,
  SERVICES,
  PROJECTS,
  PROCESS_STEPS,
  WHY_CHOOSE_FEATURES,
  CLIENT_REVIEWS,
  ProjectItem,
  ServiceItem,
  InstagramPostItem,
} from './data/studioData';
import {
  StudioImage,
  getStoredArtistPhoto,
  setStoredArtistPhoto,
} from './components/StudioImage';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ProjectLightboxModal, ServiceDetailModal } from './components/StudioModals';
import { ContactSection } from './components/ContactSection';
import { InstagramLiveFeed } from './components/InstagramLiveFeed';

const PROJECT_CATEGORIES = [
  'All',
  'Wall Murals',
  'Home Art',
  'Portraits',
  'Canvas Painting',
  'Commercial Projects',
  'Traditional Art',
] as const;

type CategoryFilter = (typeof PROJECT_CATEGORIES)[number];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Lightbox & Service Modal State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Pre-fill state for Quote Form when user clicks from Service or Lightbox
  const [preselectedService, setPreselectedService] = useState<string>('Wall Painting');
  const [preselectedProjectNote, setPreselectedProjectNote] = useState<string>('');

  // Main Artist Photo state (defaults to STUDIO_IMAGES.artistAtWork and syncs globally across all sections)
  const [artistPhotoUrl, setArtistPhotoUrl] = useState<string>(
    () => getStoredArtistPhoto() || STUDIO_IMAGES.artistAtWork
  );
  const [isCustomArtistPhoto, setIsCustomArtistPhoto] = useState<boolean>(() =>
    Boolean(getStoredArtistPhoto())
  );
  const artistFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleArtistPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setArtistPhotoUrl(reader.result);
        setIsCustomArtistPhoto(true);
        setStoredArtistPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetArtistPhoto = () => {
    setArtistPhotoUrl(STUDIO_IMAGES.artistAtWork);
    setIsCustomArtistPhoto(false);
    setStoredArtistPhoto(null);
    if (artistFileInputRef.current) {
      artistFileInputRef.current.value = '';
    }
  };

  const handleInquireFromInstagramPost = (post: InstagramPostItem) => {
    const categoryMap: Record<InstagramPostItem['category'], string> = {
      'Wall Murals': 'Wall Painting',
      'Reels & Process': 'Custom Artwork',
      'Portraits & Canvas': 'Portrait & Sketching',
      'Commercial Art': 'Commercial Art',
    };
    setPreselectedService(categoryMap[post.category] || 'Wall Painting');
    setPreselectedProjectNote(
      `Saw your Instagram post (${post.category} — "${post.caption.slice(
        0,
        70
      )}...") on @guruart_odisha and would like a free quote for a similar piece.`
    );
    scrollToSection('contact');
  };

  const filteredProjects = useMemo(() => {
    const list =
      activeCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory);
    if (activeCategory === 'All' && !showAllProjects) {
      return list.slice(0, 6);
    }
    return list;
  }, [activeCategory, showAllProjects]);

  const activeLightboxProject: ProjectItem | null =
    lightboxIndex !== null && filteredProjects[lightboxIndex]
      ? filteredProjects[lightboxIndex]
      : null;

  const handleOpenProjectLightbox = (project: ProjectItem) => {
    const idx = filteredProjects.findIndex((p) => p.id === project.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredProjects.length);
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setSelectedService(null);
    setPreselectedService(serviceTitle);
    scrollToSection('contact');
  };

  const handleRequestSimilarProject = (project: ProjectItem) => {
    setLightboxIndex(null);
    const categoryToServiceMap: Record<ProjectItem['category'], string> = {
      'Wall Murals': 'Wall Painting',
      'Home Art': 'Home Painting',
      Portraits: 'Portrait & Sketching',
      'Canvas Painting': 'Custom Artwork',
      'Commercial Projects': 'Commercial Art',
      'Traditional Art': 'Commission Artwork',
    };
    setPreselectedService(categoryToServiceMap[project.category] || 'Wall Painting');
    setPreselectedProjectNote(
      `Inspired by "${project.title}" (${project.category}, ${project.dimensions}). I would like to discuss a custom design for my space.`
    );
    scrollToSection('contact');
  };

  return (
    <div id="home" className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#141413]">
      {/* Sticky Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 h-14 md:h-16 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-black/8">
        <div className="max-w-[1240px] mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <a
            href="#home"
            className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-[#141413]"
          >
            GURUART
          </a>

          {/* Zone 2: Clean Typography Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#44403C]"
          >
            <a
              href="#about"
              className="hover:text-[#141413] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-[#141413] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="#projects"
              className="hover:text-[#141413] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Projects
            </a>
            <a
              href="#process"
              className="hover:text-[#141413] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Process
            </a>
            <a
              href="#reviews"
              className="hover:text-[#141413] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Reviews
            </a>
            <a
              href="#instagram-gallery"
              className="hidden xl:inline hover:text-[#141413] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Gallery
            </a>
            <a
              href="#contact"
              className="hover:text-[#141413] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-lg bg-[#141413] hover:bg-[#D97706] text-[#F7F5F0] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Get a Free Quote
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-10 h-10 rounded-lg border border-black/15 flex items-center justify-center text-[#141413] hover:bg-black/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F7F5F0] border-b border-black/15 px-5 py-4 shadow-xl">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-[#141413]">
              <button
                type="button"
                onClick={() => scrollToSection('home')}
                className="text-left py-1.5 hover:text-[#D97706]"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="text-left py-1.5 hover:text-[#D97706]"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="text-left py-1.5 hover:text-[#D97706]"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="text-left py-1.5 hover:text-[#D97706]"
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('instagram-gallery')}
                className="text-left py-1.5 hover:text-[#D97706]"
              >
                Gallery
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('process')}
                className="text-left py-1.5 hover:text-[#D97706]"
              >
                Process
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('reviews')}
                className="text-left py-1.5 hover:text-[#D97706]"
              >
                Reviews
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="text-left py-1.5 text-[#B45309] font-semibold"
              >
                Contact &amp; Free Quote
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative min-h-[600px] lg:min-h-[720px] flex items-end overflow-hidden bg-[#141413]">
          {/* Full-width Hero Mural Photography */}
          <StudioImage
            src={STUDIO_IMAGES.heroMural}
            alt="Hand-painted botanical and gold-leaf wall mural in a modern Indian living room by GURUART"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
          />

          {/* Measured Contrast Scrim for guaranteed WCAG AA legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />

          <div className="relative z-10 max-w-[1240px] mx-auto w-full px-5 sm:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl">
              {/* Quiet Unboxed Regional & Studio Identity Line */}
              <p className="text-xs sm:text-sm font-medium text-[#F59E0B] tracking-wide mb-4">
                GURUART Creative Studio · Junagarh, Odisha · By Mukesh Guru
              </p>

              {/* Hero Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-[68px] font-semibold text-[#F7F5F0] leading-[1.06] tracking-tight">
                Turning Empty Walls Into Beautiful Stories.
              </h1>

              {/* Hero Subheadline */}
              <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#E7E5E4] max-w-2xl leading-relaxed font-normal">
                Creative wall paintings, custom artwork and handcrafted designs made especially for
                your space.
              </p>

              {/* Hero Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-lg"
                >
                  <span>View Our Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-xs text-[#F7F5F0] border border-white/25 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  Get a Free Quote
                </button>
              </div>

              {/* Trust Line — Unboxed typography with middle dots */}
              <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[#D6D3CD]">
                <span>Custom Artwork</span>
                <span aria-hidden="true" className="text-[#F59E0B]">•</span>
                <span>Wall Painting</span>
                <span aria-hidden="true" className="text-[#F59E0B]">•</span>
                <span>Home Painting</span>
                <span aria-hidden="true" className="text-[#F59E0B]">•</span>
                <span>Commission Art</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 md:py-28 bg-[#F7F5F0] border-b border-black/8">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: Editorial Narrative & Quantitative Studio Proof */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 text-xs font-medium text-[#B45309]">
                  <span>About GURUART</span>
                  <span aria-hidden="true">·</span>
                  <span>Turning Walls Into Art</span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#141413] leading-[1.12]">
                  Art Made With Passion.
                </h2>

                <p className="text-base sm:text-lg text-[#44403C] leading-relaxed">
                  Founded by artist <strong className="text-[#141413] font-semibold">Mukesh Guru</strong> in
                  Junagarh, Odisha, <strong className="text-[#141413] font-semibold">GURUART</strong> creates
                  customized artwork and hand-painted wall murals for homes, shops, offices, cafés,
                  schools, and special architectural spaces.
                </p>

                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  We believe a wall should never feel like an afterthought. Whether you envision a
                  serene tropical living room mural, a vibrant commercial storytelling wall for your
                  café, traditional Odisha Pattachitra artistry, or an intimate hand-drawn charcoal
                  portrait, every piece is sketched from scratch and painted by hand with archival,
                  weather-resistant pigments.
                </p>

                {/* 4 Studio Metrics — Tabular numerals, unboxed clean grid */}
                <div className="pt-6 border-t border-black/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <span className="font-mono-num text-2xl sm:text-3xl font-semibold text-[#141413] block">
                      100+
                    </span>
                    <span className="text-xs font-medium text-[#57534E] mt-1 block">
                      Projects Delivered
                    </span>
                  </div>
                  <div>
                    <span className="font-mono-num text-2xl sm:text-3xl font-semibold text-[#141413] block">
                      50+
                    </span>
                    <span className="text-xs font-medium text-[#57534E] mt-1 block">
                      Happy Clients
                    </span>
                  </div>
                  <div>
                    <span className="font-mono-num text-2xl sm:text-3xl font-semibold text-[#141413] block">
                      5+ Years
                    </span>
                    <span className="text-xs font-medium text-[#57534E] mt-1 block">
                      Studio Experience
                    </span>
                  </div>
                  <div>
                    <span className="font-mono-num text-2xl sm:text-3xl font-semibold text-[#B45309] block">
                      100%
                    </span>
                    <span className="text-xs font-medium text-[#57534E] mt-1 block">
                      Custom Designs
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Main Artist Photograph — Mukesh Guru at Work */}
              <div className="lg:col-span-6">
                <figure className="relative rounded-2xl overflow-hidden border border-black/10 bg-[#EFECE6] shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141413]">
                    <StudioImage
                      src={artistPhotoUrl}
                      alt="Mukesh Guru — Founder & Lead Artist at GURUART Studio hand-painting floral motifs on an arched wall mural"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    {/* Artist Identity Overlay at Bottom Left */}
                    <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-3 text-white">
                      <div>
                        <span className="text-xs font-medium text-[#F59E0B] block">
                          Founder &amp; Lead Muralist
                        </span>
                        <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                          Mukesh Guru
                        </span>
                      </div>

                      {/* Upload / Update Main Artist Photo Control */}
                      <div className="flex items-center gap-2">
                        <input
                          ref={artistFileInputRef}
                          id="upload-main-artist-photo"
                          type="file"
                          accept="image/*"
                          onChange={handleArtistPhotoUpload}
                          className="sr-only"
                        />
                        <label
                          htmlFor="upload-main-artist-photo"
                          className="px-3 py-1.5 rounded-lg bg-black/65 hover:bg-[#D97706] backdrop-blur-xs border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Change Artist Photo</span>
                        </label>
                        {isCustomArtistPhoto && (
                          <button
                            type="button"
                            onClick={handleResetArtistPhoto}
                            aria-label="Reset to default studio artist photo"
                            className="p-1.5 rounded-lg bg-black/65 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <figcaption className="px-6 py-4 bg-[#EFECE6] flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E] border-t border-black/8">
                    <span>
                      <strong className="text-[#141413]">Mukesh Guru in Studio</strong> · Hand-painting
                      traditional floral arch motifs with wooden palette &amp; natural pigments
                    </span>
                    <span className="font-mono-num text-[#B45309]">Junagarh, Odisha</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 md:py-28 bg-[#EFECE6] border-b border-black/8">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-xs font-medium text-[#B45309] tracking-wide mb-2">
                  Bespoke Capabilities · Residential &amp; Commercial Spaces
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#141413]">
                  Our Art &amp; Painting Services.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#57534E] max-w-md">
                From full-scale architectural wall murals and residential painting to heirloom
                charcoal portraits and custom canvas commissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {SERVICES.map((service) => (
                <article
                  key={service.id}
                  className="group bg-[#F7F5F0] rounded-2xl overflow-hidden border border-black/8 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-1"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-[#1C1917]">
                      <StudioImage
                        src={service.image}
                        alt={`${service.title} — GURUART Studio`}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 font-mono-num text-xs font-medium text-[#F7F5F0]">
                        {service.number} · {service.typicalTimeline}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-2xl font-semibold text-[#141413]">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-black/6 flex items-center justify-between gap-4">
                    <span className="font-mono-num text-xs text-[#78716C]">
                      Est. {service.startingRange}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="py-2 px-4 rounded-lg bg-[#141413] group-hover:bg-[#D97706] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS — Masonry / Bento Portfolio with Filtering & Lightbox */}
        <section id="projects" className="py-20 md:py-28 bg-[#F7F5F0]">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-medium text-[#B45309] tracking-wide mb-2">
                  Curated Portfolio · Hand-Painted Across Odisha
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#141413]">
                  Featured Art &amp; Wall Projects.
                </h2>
              </div>

              {/* Interactive Category Filter Controls (Functional Buttons) */}
              <div
                className="flex items-center gap-1 p-1.5 bg-[#EFECE6] rounded-xl border border-black/8 overflow-x-auto max-w-full"
                role="tablist"
                aria-label="Filter projects by category"
              >
                {PROJECT_CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#141413] text-[#F7F5F0] shadow-xs'
                          : 'text-[#57534E] hover:text-[#141413]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bento / Masonry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const isWide =
                  activeCategory === 'All' && project.featuredSpan === 'wide';

                return (
                  <article
                    key={project.id}
                    onClick={() => handleOpenProjectLightbox(project)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOpenProjectLightbox(project);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Inspect project: ${project.title} (${project.spaceType}, ${project.location})`}
                    className={`group relative rounded-2xl overflow-hidden bg-[#141413] border border-black/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D97706] ${
                      isWide ? 'md:col-span-2' : 'col-span-1'
                    }`}
                  >
                    <div
                      className={`w-full overflow-hidden ${
                        isWide ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      <StudioImage
                        src={project.image}
                        alt={`${project.title} — ${project.spaceType} in ${project.location}`}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    {/* Measured Gradient Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Top-Right Lightbox Affordance Icon */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-black/55 backdrop-blur-xs text-white flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:bg-[#D97706] transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Bottom Project Metadata — Unboxed Clean Typography */}
                    <div className="absolute bottom-0 inset-x-0 p-6 text-[#F7F5F0]">
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#D6D3CD] mb-1">
                        <span className="text-[#F59E0B] font-medium">{project.spaceType}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.location}</span>
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
                          {project.title}
                        </h3>
                        <span className="font-mono-num text-xs text-[#D6D3CD] shrink-0 hidden sm:inline">
                          {project.dimensions}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* View All Projects Toggle */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/10">
              <p className="text-xs sm:text-sm text-[#57534E]">
                Showing <strong className="font-mono-num text-[#141413]">{filteredProjects.length}</strong> of{' '}
                <strong className="font-mono-num text-[#141413]">{PROJECTS.length}</strong> documented
                studio works. Click any piece to view dimensions and medium in high resolution.
              </p>

              {activeCategory === 'All' ? (
                <button
                  type="button"
                  onClick={() => setShowAllProjects((prev) => !prev)}
                  className="py-2.5 px-5 rounded-lg border border-black/20 hover:border-[#141413] hover:bg-[#141413] hover:text-white text-xs sm:text-sm font-semibold text-[#141413] transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>
                    {showAllProjects
                      ? 'Show Featured Selection'
                      : `View All Projects (${PROJECTS.length})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All');
                    setShowAllProjects(true);
                  }}
                  className="py-2.5 px-5 rounded-lg border border-black/20 hover:bg-[#141413] hover:text-white text-xs sm:text-sm font-semibold text-[#141413] transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* INTERACTIVE BEFORE & AFTER SLIDER */}
        <BeforeAfterSlider />

        {/* OUR PROCESS (4-Step Timeline) + WHY CHOOSE GURUART */}
        <section id="process" className="py-20 md:py-28 bg-[#F7F5F0] border-b border-black/8">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            {/* Part 1: 4-Step Process Timeline */}
            <div className="mb-20">
              <div className="max-w-2xl mb-12">
                <p className="text-xs font-medium text-[#B45309] tracking-wide mb-2">
                  How We Work · Concept to Completion
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#141413]">
                  Our 4-Step Studio Process.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="bg-[#EFECE6] rounded-2xl p-6 sm:p-7 border border-black/8 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono-num text-xs font-semibold text-[#B45309] block">
                        {step.number} — {step.title}
                      </span>
                      <h3 className="font-display text-2xl font-semibold text-[#141413] mt-2">
                        {step.subtitle}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: Why Choose GURUART */}
            <div className="pt-16 border-t border-black/10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <p className="text-xs font-medium text-[#B45309] tracking-wide mb-2">
                    The GURUART Standard
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#141413]">
                    Why Homeowners &amp; Businesses Choose Guruart.
                  </h2>
                </div>
                <p className="text-sm text-[#57534E] max-w-md">
                  Every wall and canvas is treated as a permanent piece of architecture—combining
                  fine art sensibility with disciplined surface preparation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                {WHY_CHOOSE_FEATURES.map((item) => (
                  <div key={item.index} className="pt-5 border-t border-black/10">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono-num text-xs font-semibold text-[#D97706]">
                        {item.index}.
                      </span>
                      <h3 className="text-base font-semibold text-[#141413]">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CLIENT REVIEWS */}
        <section id="reviews" className="py-20 md:py-28 bg-[#EFECE6] border-b border-black/8">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-medium text-[#B45309] tracking-wide mb-2">
                  Client Stories · Verified Commissions Across Odisha
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#141413]">
                  Loved by Homeowners &amp; Spaces.
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-[#57534E]">
                Rated <strong className="font-mono-num text-[#141413]">4.9 / 5.0</strong> across{' '}
                <strong className="font-mono-num text-[#141413]">50+</strong> residential &amp;
                commercial clients
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
              {CLIENT_REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="bg-[#F7F5F0] rounded-2xl p-7 border border-black/8 flex flex-col justify-between"
                >
                  <div>
                    {/* 5-Star Rating */}
                    <div
                      className="flex items-center gap-1 text-[#D97706] mb-4"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D97706]" />
                      ))}
                    </div>

                    <blockquote className="font-display text-xl sm:text-[22px] text-[#141413] leading-snug">
                      “{review.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-6 pt-5 border-t border-black/8">
                    <div className="font-semibold text-sm text-[#141413]">{review.name}</div>
                    <div className="text-xs text-[#57534E] mt-0.5">
                      {review.role} · {review.location}
                    </div>
                    <div className="text-xs font-medium text-[#B45309] mt-2">
                      {review.projectType} · {review.outcome}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE INSTAGRAM FEED — Carousel & Grid with Auto-Sync */}
        <InstagramLiveFeed
          artistPhotoUrl={artistPhotoUrl}
          onInquireFromPost={handleInquireFromInstagramPost}
        />

        {/* CALL TO ACTION BANNER */}
        <section className="relative py-20 md:py-24 bg-[#141413] text-[#F7F5F0] overflow-hidden">
          <StudioImage
            src={STUDIO_IMAGES.odishaCafeMural}
            alt="GURUART custom heritage and botanical wall mural background"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

          <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#F59E0B] tracking-wide mb-3">
                Custom Wall Painting · Portraits · Commercial Murals
              </p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.08]">
                Have a Wall That Needs a Story?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#D6D3CD] leading-relaxed">
                Tell us your idea and let&apos;s turn your space into something unforgettable.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  Get a Free Quote
                </button>

                <a
                  href={`https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(
                    'Namaste Mukesh Guru ji! I have a wall / custom art idea and would like to discuss a free quote with GURUART.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-[#F59E0B]" />
                  <span>WhatsApp Us (6372182212)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT & QUOTE REQUEST SECTION */}
        <ContactSection
          preselectedService={preselectedService}
          preselectedProjectNote={preselectedProjectNote}
        />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#141413] text-[#D6D3CD] border-t border-white/10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-3">
              <a
                href="#home"
                className="font-display text-3xl font-bold tracking-tight text-[#F7F5F0] block"
              >
                GURUART
              </a>
              <p className="font-display italic text-xl text-[#F59E0B]">
                “Turning Walls Into Art.”
              </p>
              <p className="text-xs sm:text-sm text-[#A8A29E] max-w-sm leading-relaxed pt-1">
                Professional creative art and wall-painting studio by{' '}
                <strong className="text-[#F7F5F0]">{CONTACT_INFO.artistName}</strong> in Junagarh,
                Kalahandi, Odisha. Crafting custom murals, home paintings, portraits, and
                commissioned canvas works.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-4 space-y-3">
              <h3 className="text-xs font-semibold text-[#F7F5F0] tracking-wide">Quick Links</h3>
              <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-[#A8A29E]">
                <li>
                  <a href="#home" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#instagram-gallery" className="hover:text-white transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-white transition-colors">
                    Process
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-white transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Direct Studio Coordinates */}
            <div className="md:col-span-3 space-y-2.5 text-xs sm:text-sm">
              <h3 className="text-xs font-semibold text-[#F7F5F0] tracking-wide">
                Studio Contact
              </h3>
              <p className="text-[#F7F5F0] font-medium">{CONTACT_INFO.artistName}</p>
              <p className="text-[#A8A29E]">Junagarh, Kalahandi, Odisha, India</p>
              <p className="font-mono-num text-[#F59E0B]">
                <a href={`tel:+${CONTACT_INFO.phoneRaw}`} className="hover:underline">
                  +91 63721 82212
                </a>
              </p>
              <p className="text-[#A8A29E] break-all">
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Social Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A29E]">
            <p>© 2026 Guruart. All Rights Reserved.</p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href="#instagram-gallery"
                className="hover:text-[#F59E0B] transition-colors"
              >
                Instagram
              </a>
              <span aria-hidden="true">•</span>
              <a
                href="#projects"
                className="hover:text-[#F59E0B] transition-colors"
              >
                Facebook
              </a>
              <span aria-hidden="true">•</span>
              <a
                href={`https://wa.me/${CONTACT_INFO.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F59E0B] transition-colors"
              >
                WhatsApp
              </a>
              <span aria-hidden="true">•</span>
              <a
                href="#transformation"
                className="hover:text-[#F59E0B] transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Compact Accessible Floating WhatsApp Button (Respects 15% Mobile Sticky Cap) */}
      <a
        href={`https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(
          'Namaste Mukesh Guru ji! I visited the GURUART website and would like to inquire about a custom wall painting / artwork project.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with GURUART on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#141413] hover:bg-[#D97706] text-[#F7F5F0] border border-white/20 shadow-xl transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-[#F59E0B]" />
        <span className="text-xs font-semibold whitespace-nowrap">WhatsApp Studio</span>
      </a>

      {/* Lightbox & Service Detail Modals */}
      <ProjectLightboxModal
        project={activeLightboxProject}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
        onRequestSimilar={handleRequestSimilarProject}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectServiceForQuote={handleSelectServiceForQuote}
      />
    </div>
  );
}
