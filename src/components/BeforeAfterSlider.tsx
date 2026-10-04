import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { STUDIO_IMAGES } from '../data/studioData';
import { StudioImage } from './StudioImage';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSliderPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <section
      id="transformation"
      className="py-20 md:py-28 bg-[#141413] text-[#F7F5F0] border-y border-white/10"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-[#F59E0B] tracking-wide mb-2">
              Spatial Transformation · Patia Residence, Bhubaneswar
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F7F5F0]">
              From Plain Wall to Masterpiece.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-[#A8A29E] max-w-md">
              Drag the divider to compare the bare builder-finished plaster wall with our 5-day
              hand-painted botanical and 24K gold-leaf mural.
            </p>
            <div
              className="inline-flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10 self-start"
              role="group"
              aria-label="Comparison view presets"
            >
              <button
                type="button"
                onClick={() => setSliderPosition(12)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  sliderPosition < 25
                    ? 'bg-[#D97706] text-white'
                    : 'text-[#D6D3CD] hover:text-white'
                }`}
              >
                Plain Wall
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(50)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  sliderPosition >= 25 && sliderPosition <= 75
                    ? 'bg-[#D97706] text-white'
                    : 'text-[#D6D3CD] hover:text-white'
                }`}
              >
                50 / 50 Split
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(88)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  sliderPosition > 75
                    ? 'bg-[#D97706] text-white'
                    : 'text-[#D6D3CD] hover:text-white'
                }`}
              >
                Finished Art
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Before/After Viewport */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/15 shadow-2xl touch-none"
        >
          {/* Base Layer: AFTER (Finished Artwork) */}
          <StudioImage
            src={STUDIO_IMAGES.heroMural}
            alt="After: Finished hand-painted botanical wall mural with gold leaf accents in a modern living room"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Overlay Layer: BEFORE (Plain Wall) clipped by sliderPosition */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <StudioImage
              src={STUDIO_IMAGES.beforePlainWall}
              alt="Before: Plain unprimed beige plaster wall behind living room sofa"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Subtle Corner Scrim Labels (Unboxed editorial typography) */}
          <div className="absolute top-4 left-5 z-10 pointer-events-none bg-black/65 backdrop-blur-xs px-3 py-1.5 rounded-md">
            <span className="text-xs font-medium text-[#F7F5F0] tracking-wide">
              Day 01 · Bare Plaster Wall
            </span>
          </div>
          <div className="absolute top-4 right-5 z-10 pointer-events-none bg-black/65 backdrop-blur-xs px-3 py-1.5 rounded-md">
            <span className="text-xs font-medium text-[#F59E0B] tracking-wide">
              Day 05 · Hand-Painted Mural Reveal
            </span>
          </div>

          {/* Vertical Divider Line & Drag Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-[#F59E0B] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#D97706] text-white shadow-xl border-2 border-[#F7F5F0] flex items-center justify-center transition-transform duration-150">
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Accessible Range Input & Project Specs Footer */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-[#A8A29E]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <label htmlFor="mural-comparison-range" className="text-[#F7F5F0] font-medium whitespace-nowrap">
              Slide to inspect:
            </label>
            <input
              id="mural-comparison-range"
              type="range"
              min={0}
              max={100}
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Percentage of plain wall vs finished mural shown"
              className="w-full md:w-56 accent-[#D97706] cursor-pointer"
            />
            <span className="font-mono-num text-[#F59E0B] w-10 text-right">{sliderPosition}%</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#A8A29E]">
            <span>Wall Size: <strong className="text-[#F7F5F0] font-mono-num">14 ft × 9.5 ft</strong></span>
            <span aria-hidden="true">·</span>
            <span>Medium: <strong className="text-[#F7F5F0]">Low-VOC Acrylic &amp; Gold Leaf</strong></span>
            <span aria-hidden="true">·</span>
            <span>Lead Artist: <strong className="text-[#F7F5F0]">Mukesh Guru</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
