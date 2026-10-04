import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import { ProjectItem, ServiceItem, CONTACT_INFO } from '../data/studioData';
import { StudioImage } from './StudioImage';

interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRequestSimilar: (project: ProjectItem) => void;
}

export const ProjectLightboxModal: React.FC<ProjectLightboxProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  onRequestSimilar,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#181816] text-[#F7F5F0] rounded-2xl overflow-hidden border border-white/15 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
            <span className="text-[#F59E0B] font-medium">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.spaceType}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project"
              className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-[#D6D3CD] hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next project"
              className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-[#D6D3CD] hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close lightbox"
              className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#D97706] transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 bg-black flex items-center justify-center min-h-[280px] sm:min-h-[420px]">
            <StudioImage
              src={project.image}
              alt={`${project.title} — ${project.spaceType} in ${project.location}`}
              className="w-full h-full max-h-[540px] object-cover"
            />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3
                id="lightbox-project-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#F7F5F0] leading-tight"
              >
                {project.title}
              </h3>

              <p className="mt-4 text-sm text-[#D6D3CD] leading-relaxed">{project.story}</p>

              <dl className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#A8A29E]">Space / Client Type</dt>
                  <dd className="text-[#F7F5F0] font-medium text-right">{project.spaceType}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#A8A29E]">Location</dt>
                  <dd className="text-[#F7F5F0] font-medium text-right">{project.location}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#A8A29E]">Dimensions</dt>
                  <dd className="text-[#F7F5F0] font-mono-num text-right">{project.dimensions}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#A8A29E]">Medium</dt>
                  <dd className="text-[#F7F5F0] text-right">{project.medium}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#A8A29E]">Completion Time</dt>
                  <dd className="text-[#F59E0B] font-mono-num text-right">{project.duration}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onRequestSimilar(project)}
                className="flex-1 py-3 px-5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors whitespace-nowrap text-center"
              >
                Commission Similar Artwork
              </button>
              <a
                href={`https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(
                  `Namaste Mukesh ji! I loved the "${project.title}" (${project.category}) project on the GURUART website and would like to discuss a similar artwork for my space.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-lg border border-white/20 hover:bg-white/10 text-[#F7F5F0] text-sm font-medium transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>WhatsApp Inquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectServiceForQuote,
}) => {
  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#F7F5F0] text-[#141413] rounded-2xl overflow-hidden border border-black/10 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <StudioImage
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/60 text-white hover:bg-[#D97706] transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="font-mono-num text-xs text-[#F59E0B] font-medium">
              {service.number}. Studio Capability
            </span>
            <h3 id="service-modal-title" className="font-display text-3xl font-semibold mt-0.5">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">{service.fullDesc}</p>

          <div className="mt-6 pt-6 border-t border-black/10">
            <h4 className="text-xs font-semibold text-[#57534E] mb-3">
              What’s Included in Every Commission
            </h4>
            <ul className="space-y-2.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#1C1917]">
                  <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-5 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[#78716C] block">Estimated Pricing</span>
              <strong className="font-mono-num text-sm text-[#141413] mt-0.5 block">
                {service.startingRange}
              </strong>
            </div>
            <div>
              <span className="text-[#78716C] block">Typical Turnaround</span>
              <strong className="font-mono-num text-sm text-[#141413] mt-0.5 block">
                {service.typicalTimeline}
              </strong>
            </div>
            <div>
              <span className="text-[#78716C] block">Best Suited For</span>
              <strong className="text-sm text-[#141413] mt-0.5 block">{service.idealFor}</strong>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onSelectServiceForQuote(service.title)}
              className="flex-1 py-3 px-5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Get a Free Quote for {service.title}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-lg border border-black/15 hover:bg-black/5 text-sm font-medium text-[#141413] transition-colors whitespace-nowrap"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
