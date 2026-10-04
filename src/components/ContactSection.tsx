import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Upload,
  CheckCircle2,
  X,
  ArrowUpRight,
  Send,
} from 'lucide-react';
import { CONTACT_INFO, SERVICES } from '../data/studioData';

interface ContactSectionProps {
  preselectedService: string;
  preselectedProjectNote: string;
}

interface QuoteFormState {
  clientName: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget: string;
  description: string;
  referenceFileName: string;
  referencePreviewUrl: string | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  preselectedProjectNote,
}) => {
  const [form, setForm] = useState<QuoteFormState>({
    clientName: '',
    phone: '',
    email: '',
    projectType: 'Wall Painting',
    location: 'Junagarh, Odisha',
    budget: '₹15,000 – ₹35,000',
    description: '',
    referenceFileName: '',
    referencePreviewUrl: null,
  });

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, projectType: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedProjectNote) {
      setForm((prev) => ({
        ...prev,
        description: preselectedProjectNote,
      }));
    }
  }, [preselectedProjectNote]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Please select a reference image smaller than 10 MB.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        referenceFileName: `${file.name} (${Math.round(file.size / 1024)} KB)`,
        referencePreviewUrl: typeof reader.result === 'string' ? reader.result : null,
      }));
    };
    reader.readAsDataURL(file);
  };

  const clearReferenceImage = () => {
    setForm((prev) => ({
      ...prev,
      referenceFileName: '',
      referencePreviewUrl: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName.trim()) {
      setErrorMsg('Please enter your name so Mukesh Guru can address your quote.');
      return;
    }
    const cleanDigits = form.phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone or WhatsApp number.');
      return;
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!form.description.trim()) {
      setErrorMsg('Please share a brief description of your wall, canvas idea, or dimensions.');
      return;
    }

    setErrorMsg('');
    const refCode = `GA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refCode);
  };

  const buildWhatsAppLink = () => {
    const text = [
      `Namaste Mukesh Guru ji (GURUART),`,
      `I just submitted a project request${submittedRef ? ` (${submittedRef})` : ''}:`,
      `• Name: ${form.clientName || 'Prospective Client'}`,
      `• Phone: ${form.phone}`,
      `• Project Type: ${form.projectType}`,
      `• Location: ${form.location}`,
      `• Budget Range: ${form.budget}`,
      `• Details: ${form.description}`,
      form.referenceFileName ? `• Reference Image Selected: ${form.referenceFileName}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  const buildMailtoLink = () => {
    const subject = `GURUART Project Quote Request — ${form.projectType} (${form.location})`;
    const body = [
      `Hello Mukesh Guru,`,
      ``,
      `I would like to request a quote for a custom art project:`,
      `Name: ${form.clientName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || 'Not provided'}`,
      `Project Type: ${form.projectType}`,
      `Location: ${form.location}`,
      `Estimated Budget: ${form.budget}`,
      `Reference Image: ${form.referenceFileName || 'None attached'}`,
      ``,
      `Project Description:`,
      form.description,
    ].join('\n');

    return `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F7F5F0] text-[#141413]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Studio Contact & Odisha Map */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium text-[#B45309] tracking-wide mb-2">
                Commission &amp; Consultation · Junagarh, Odisha
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#141413]">
                Start Your Custom Art Project.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#57534E] leading-relaxed">
                Speak directly with founder and lead artist{' '}
                <strong className="text-[#141413] font-semibold">{CONTACT_INFO.artistName}</strong>.
                Share a photo of your wall or sketch idea, and receive a personalized design proposal
                and transparent cost estimate within 24 hours.
              </p>
            </div>

            {/* Artist & Studio Directory Block */}
            <div className="bg-[#EFECE6] rounded-2xl p-6 sm:p-7 border border-black/8 space-y-5">
              <div className="pb-4 border-b border-black/8 flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs text-[#78716C] block">Lead Artist &amp; Founder</span>
                  <h3 className="font-display text-2xl font-semibold text-[#141413] mt-0.5">
                    {CONTACT_INFO.artistName}
                  </h3>
                </div>
                <span className="text-xs text-[#B45309] font-medium">
                  {CONTACT_INFO.locationShort}
                </span>
              </div>

              <dl className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <Phone className="w-4 h-4 text-[#D97706] shrink-0 mt-1" />
                  <div>
                    <dt className="text-xs text-[#78716C]">Phone &amp; WhatsApp</dt>
                    <dd className="font-mono-num font-semibold text-[#141413] mt-0.5">
                      <a
                        href={`tel:+${CONTACT_INFO.phoneRaw}`}
                        className="hover:text-[#D97706] transition-colors"
                      >
                        7008193931
                      </a>
                      <span className="text-[#78716C] mx-2" aria-hidden="true">
                        ·
                      </span>
                      <a
                        href={`https://wa.me/${CONTACT_INFO.phoneRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B45309] hover:underline font-sans text-xs font-medium"
                      >
                        Chat on WhatsApp →
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-4 h-4 text-[#D97706] shrink-0 mt-1" />
                  <div>
                    <dt className="text-xs text-[#78716C]">Studio Email</dt>
                    <dd className="font-medium text-[#141413] mt-0.5 break-all">
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="hover:text-[#D97706] transition-colors"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-1" />
                  <div>
                    <dt className="text-xs text-[#78716C]">Studio Location &amp; Service Reach</dt>
                    <dd className="font-medium text-[#141413] mt-0.5">
                      Junagarh, Kalahandi, Odisha, India
                    </dd>
                    <dd className="text-xs text-[#57534E] mt-1 leading-relaxed">
                      On-site wall painting across {CONTACT_INFO.serviceAreas}
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Direct Social & Channel Links */}
              <div className="pt-4 border-t border-black/8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#44403C]">
                <a
                  href={`https://wa.me/${CONTACT_INFO.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D97706] transition-colors flex items-center gap-1"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <span aria-hidden="true" className="text-black/25">·</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-[#D97706] transition-colors flex items-center gap-1"
                >
                  <span>Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <span aria-hidden="true" className="text-black/25">·</span>
                <a
                  href="#instagram-gallery"
                  className="hover:text-[#D97706] transition-colors flex items-center gap-1"
                >
                  <span>Instagram ({CONTACT_INFO.instagramHandle})</span>
                </a>
                <span aria-hidden="true" className="text-black/25">·</span>
                <a
                  href="#projects"
                  className="hover:text-[#D97706] transition-colors flex items-center gap-1"
                >
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map Section for Junagarh, Odisha */}
            <div className="rounded-2xl overflow-hidden border border-black/10 bg-[#EFECE6]">
              <div className="px-5 py-3.5 flex items-center justify-between border-b border-black/8">
                <div>
                  <span className="text-xs font-semibold text-[#141413] block">
                    GURUART Studio — Junagarh, Odisha
                  </span>
                  <span className="text-xs text-[#57534E]">
                    NH-26 Creative Corridor · Kalahandi, Odisha 766014
                  </span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Junagarh+Odisha+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#B45309] hover:underline flex items-center gap-1 whitespace-nowrap"
                >
                  <span>Open Map</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="w-full h-56 relative bg-[#E5E0D5]">
                <iframe
                  title="GURUART Studio Location in Junagarh, Odisha, India"
                  src="https://www.google.com/maps?q=Junagarh,Odisha,India&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-black/8 shadow-sm">
            {submittedRef ? (
              <div className="py-6 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[#D97706]/15 text-[#B45309] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <span className="font-mono-num text-xs font-medium text-[#B45309]">
                    Request Reference · {submittedRef}
                  </span>
                  <h3 className="font-display text-3xl font-semibold text-[#141413] mt-1">
                    Thank You, {form.clientName}. Your Project Brief Is Ready.
                  </h3>
                  <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                    Mukesh Guru reviews every custom wall and artwork inquiry personally. You can
                    also send this structured brief straight to our studio WhatsApp or email below
                    for instant priority scheduling.
                  </p>
                </div>

                <div className="bg-[#F7F5F0] rounded-xl p-5 border border-black/8 space-y-2.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#78716C]">Client Name &amp; Phone</span>
                    <span className="font-medium text-[#141413] text-right">
                      {form.clientName} · <span className="font-mono-num">{form.phone}</span>
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#78716C]">Project Type</span>
                    <span className="font-medium text-[#B45309] text-right">{form.projectType}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#78716C]">Site Location</span>
                    <span className="font-medium text-[#141413] text-right">{form.location}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#78716C]">Estimated Budget</span>
                    <span className="font-mono-num font-medium text-[#141413] text-right">
                      {form.budget}
                    </span>
                  </div>
                  {form.referenceFileName && (
                    <div className="flex justify-between gap-4">
                      <span className="text-[#78716C]">Reference Image</span>
                      <span className="font-medium text-[#141413] text-right">
                        {form.referenceFileName}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-black/8">
                    <span className="text-xs text-[#78716C] block mb-1">Project Notes</span>
                    <p className="text-[#141413] text-xs leading-relaxed">{form.description}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Send Brief via WhatsApp (7008193931)</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href={buildMailtoLink()}
                    className="py-3.5 px-5 rounded-lg border border-black/15 hover:bg-black/5 text-[#141413] text-sm font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Send via Email</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedRef(null)}
                  className="text-xs font-medium text-[#57534E] hover:text-[#141413] underline"
                >
                  ← Edit project details or submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="border-b border-black/8 pb-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#141413]">
                    Request a Free Custom Quote
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                    Tell us about your wall dimensions, room style, or commission idea.
                  </p>
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800"
                  >
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                    >
                      Your Name <span className="text-[#D97706]">*</span>
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      placeholder="e.g., Subhashree Mohanty"
                      value={form.clientName}
                      onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F5F0] border border-black/15 text-sm text-[#141413] focus:outline-none focus:border-[#D97706] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                    >
                      Phone / WhatsApp Number <span className="text-[#D97706]">*</span>
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      placeholder="e.g., 7008193931"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F5F0] border border-black/15 text-sm font-mono-num text-[#141413] focus:outline-none focus:border-[#D97706] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      placeholder="yourname@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F5F0] border border-black/15 text-sm text-[#141413] focus:outline-none focus:border-[#D97706] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-project-type"
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                    >
                      Project Type <span className="text-[#D97706]">*</span>
                    </label>
                    <select
                      id="quote-project-type"
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F5F0] border border-black/15 text-sm text-[#141413] focus:outline-none focus:border-[#D97706] transition-colors"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-location"
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                    >
                      Project Location (City / Town)
                    </label>
                    <input
                      id="quote-location"
                      type="text"
                      placeholder="Junagarh, Odisha"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F5F0] border border-black/15 text-sm text-[#141413] focus:outline-none focus:border-[#D97706] transition-colors"
                    />
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-[#78716C]">
                      <span>Quick select:</span>
                      {['Junagarh, Odisha', 'Bhawanipatna', 'Bhubaneswar', 'Rourkela'].map(
                        (loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => setForm({ ...form, location: loc })}
                            className="underline hover:text-[#D97706] transition-colors"
                          >
                            {loc}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-budget"
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                    >
                      Estimated Budget
                    </label>
                    <select
                      id="quote-budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F5F0] border border-black/15 text-sm font-mono-num text-[#141413] focus:outline-none focus:border-[#D97706] transition-colors"
                    >
                      <option value="₹3,000 – ₹10,000">₹3,000 – ₹10,000 (Portraits / Small Art)</option>
                      <option value="₹10,000 – ₹15,000">₹10,000 – ₹15,000 (Single Accent Wall)</option>
                      <option value="₹15,000 – ₹35,000">₹15,000 – ₹35,000 (Custom Feature Mural)</option>
                      <option value="₹35,000 – ₹75,000">₹35,000 – ₹75,000 (Multi-Wall / Commercial)</option>
                      <option value="₹75,000+">₹75,000+ (Full Home / Large Campus)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-description"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    Project Description &amp; Wall Dimensions <span className="text-[#D97706]">*</span>
                  </label>
                  <textarea
                    id="quote-description"
                    rows={4}
                    required
                    placeholder="Describe your wall size (e.g. 12ft × 9ft living room wall), preferred theme (nature, traditional Pattachitra, modern minimal, portrait), and timeline..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F5F0] border border-black/15 text-sm text-[#141413] focus:outline-none focus:border-[#D97706] transition-colors"
                  />
                </div>

                {/* Upload Reference Image */}
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                    Upload Reference Image or Wall Photo (Optional)
                  </label>
                  <input
                    ref={fileInputRef}
                    id="quote-reference-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />

                  {!form.referencePreviewUrl ? (
                    <label
                      htmlFor="quote-reference-upload"
                      className="flex items-center justify-between gap-4 px-4 py-3.5 rounded-lg border border-dashed border-black/25 bg-[#F7F5F0]/60 hover:bg-[#F7F5F0] hover:border-[#D97706] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Upload className="w-4 h-4 text-[#D97706] shrink-0" />
                        <span className="text-xs text-[#44403C]">
                          Click to upload a photo of your blank wall or inspiration artwork (JPG, PNG)
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#B45309] whitespace-nowrap">
                        Browse File
                      </span>
                    </label>
                  ) : (
                    <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#F7F5F0] border border-black/15">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={form.referencePreviewUrl}
                          alt="Uploaded reference preview"
                          className="w-12 h-12 rounded-md object-cover border border-black/10 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#141413] truncate">
                            {form.referenceFileName}
                          </p>
                          <p className="text-[11px] text-[#57534E]">
                            Reference attached to your quote inquiry
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={clearReferenceImage}
                        aria-label="Remove uploaded reference image"
                        className="p-1.5 rounded-md hover:bg-black/10 text-[#57534E] hover:text-[#141413] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Request</span>
                  </button>

                  <span className="text-xs text-[#78716C]">
                    Direct Studio Line: <strong className="font-mono-num text-[#141413]">7008193931</strong>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
