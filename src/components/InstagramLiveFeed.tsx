import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Heart,
  MessageCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  GalleryHorizontalEnd,
  ArrowUpRight,
  X,
  Film,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import {
  INSTAGRAM_POSTS,
  LIVE_INSTAGRAM_QUEUE,
  CONTACT_INFO,
  InstagramPostItem,
} from '../data/studioData';
import { StudioImage } from './StudioImage';

interface InstagramLiveFeedProps {
  artistPhotoUrl: string;
  onInquireFromPost: (post: InstagramPostItem) => void;
}

const IG_CATEGORIES = [
  'All',
  'Wall Murals',
  'Reels & Process',
  'Portraits & Canvas',
  'Commercial Art',
] as const;

type IgCategoryFilter = (typeof IG_CATEGORIES)[number];

export const InstagramLiveFeed: React.FC<InstagramLiveFeedProps> = ({
  artistPhotoUrl,
  onInquireFromPost,
}) => {
  const [posts, setPosts] = useState<InstagramPostItem[]>(INSTAGRAM_POSTS);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [activeCategory, setActiveCategory] = useState<IgCategoryFilter>('All');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedText, setLastSyncedText] = useState<string>('Synced just now');
  const [likedPostIds, setLikedPostIds] = useState<Record<string, boolean>>({});
  const [selectedPost, setSelectedPost] = useState<InstagramPostItem | null>(null);
  const [newPostBanner, setNewPostBanner] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  // Reset carousel index when category changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeCategory]);

  // Function to sync/pull the next latest studio post
  const syncLatestPosts = useCallback(
    (isManual = false) => {
      setIsSyncing(true);
      window.setTimeout(() => {
        setIsSyncing(false);
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSyncedText(`Updated at ${timeStr}`);

        if (queueIndex < LIVE_INSTAGRAM_QUEUE.length) {
          const nextLivePost = {
            ...LIVE_INSTAGRAM_QUEUE[queueIndex],
            id: `ig-live-${queueIndex}-${Date.now()}`,
            timestamp: 'Just now',
          };
          setPosts((prev) => [nextLivePost, ...prev]);
          setQueueIndex((prev) => prev + 1);
          setCarouselIndex(0);
          setNewPostBanner(`New studio post from ${CONTACT_INFO.instagramHandle} added to feed`);
          window.setTimeout(() => setNewPostBanner(null), 4500);
        } else if (isManual) {
          setNewPostBanner('Feed is up to date with the latest @guruart123');
          window.setTimeout(() => setNewPostBanner(null), 3500);
        }
      }, 450);
    },
    [queueIndex]
  );

  // Automatic background feed polling every 35 seconds when enabled
  useEffect(() => {
    if (!isAutoSyncEnabled) return;
    const interval = window.setInterval(() => {
      syncLatestPosts(false);
    }, 35000);
    return () => window.clearInterval(interval);
  }, [isAutoSyncEnabled, syncLatestPosts]);

  // Keyboard navigation for selected post modal
  useEffect(() => {
    if (!selectedPost) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);

  const toggleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedPostIds((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const maxCarouselStart = Math.max(0, filteredPosts.length - 1);

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxCarouselStart : prev - 1));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev >= maxCarouselStart ? 0 : prev + 1));
  };

  const renderMediaTypeIcon = (mediaType: InstagramPostItem['mediaType']) => {
    if (mediaType === 'REEL') return <Film className="w-3.5 h-3.5" />;
    if (mediaType === 'CAROUSEL_ALBUM') return <Layers className="w-3.5 h-3.5" />;
    return <ImageIcon className="w-3.5 h-3.5" />;
  };

  return (
    <section
      id="instagram-gallery"
      className="py-20 md:py-28 bg-[#F7F5F0] border-b border-black/8"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Studio Profile Header & Live Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#D97706] via-[#EA580C] to-[#F59E0B] shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#F7F5F0] bg-[#141413]">
                <StudioImage
                  src={artistPhotoUrl}
                  alt="Mukesh Guru — @guruart_odisha Instagram profile portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#57534E] mb-1">
                <span className="font-semibold text-[#B45309] font-['Plus_Jakarta_Sans']">{CONTACT_INFO.instagramHandle}</span>
                <span aria-hidden="true">·</span>
                <span>Mukesh Guru</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">{lastSyncedText}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#141413]">
                Live From the Guruart Studio.
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                Follow our daily wall murals, brushwork reels, and custom portrait commissions from
                Junagarh &amp; across Odisha.
              </p>
            </div>
          </div>

          {/* Right Toolbar: Auto-Update Toggle, Manual Sync, & Carousel/Grid Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Auto-update toggle button */}
            <button
              type="button"
              onClick={() => setIsAutoSyncEnabled((prev) => !prev)}
              className="px-3 py-2 rounded-lg border border-black/12 bg-[#EFECE6] hover:bg-black/5 text-xs font-medium text-[#141413] flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
              aria-pressed={isAutoSyncEnabled}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isAutoSyncEnabled ? 'bg-emerald-600' : 'bg-[#78716C]'
                }`}
                aria-hidden="true"
              />
              <span>{isAutoSyncEnabled ? 'Auto-Update: On' : 'Auto-Update: Paused'}</span>
            </button>

            {/* Manual Sync Button */}
            <button
              type="button"
              onClick={() => syncLatestPosts(true)}
              disabled={isSyncing}
              className="px-3.5 py-2 rounded-lg border border-black/12 bg-white hover:border-[#D97706] text-xs font-semibold text-[#141413] flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#D97706] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing Feed...' : 'Sync Latest Posts'}</span>
            </button>

            {/* View Mode Switcher: Carousel vs Grid */}
            <div
              className="inline-flex items-center gap-1 p-1 bg-[#EFECE6] rounded-lg border border-black/8"
              role="group"
              aria-label="Instagram feed layout mode"
            >
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-[#141413] text-[#F7F5F0]'
                    : 'text-[#57534E] hover:text-[#141413]'
                }`}
              >
                <GalleryHorizontalEnd className="w-3.5 h-3.5" />
                <span>Carousel</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#141413] text-[#F7F5F0]'
                    : 'text-[#57534E] hover:text-[#141413]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs + Carousel Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/8">
          <div
            className="flex items-center gap-1 p-1 bg-[#EFECE6] rounded-xl border border-black/8 overflow-x-auto max-w-full"
            role="tablist"
            aria-label="Filter Instagram posts by theme"
          >
            {IG_CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#141413] shadow-xs'
                      : 'text-[#57534E] hover:text-[#141413]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {viewMode === 'carousel' && (
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="font-mono-num text-xs text-[#57534E] mr-2">
                Post {Math.min(carouselIndex + 1, filteredPosts.length)} of {filteredPosts.length}
              </span>
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous Instagram posts"
                className="w-9 h-9 rounded-lg border border-black/15 hover:bg-[#141413] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next Instagram posts"
                className="w-9 h-9 rounded-lg border border-black/15 hover:bg-[#141413] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Live Update Notification Banner */}
        {newPostBanner && (
          <div
            role="status"
            className="mb-6 px-4 py-2.5 rounded-lg bg-[#141413] text-[#F7F5F0] text-xs font-medium flex items-center justify-between"
          >
            <span>{newPostBanner}</span>
            <button
              type="button"
              onClick={() => setNewPostBanner(null)}
              className="text-[#A8A29E] hover:text-white ml-4"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* CAROUSEL VIEW vs GRID VIEW */}
        {viewMode === 'carousel' ? (
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-opacity duration-150"
            >
              {Array.from({ length: Math.min(4, filteredPosts.length) }).map((_, slotIdx) => {
                const post =
                  filteredPosts[(carouselIndex + slotIdx) % filteredPosts.length];
                const isLiked = !!likedPostIds[post.id];
                const likeCount = post.likes + (isLiked ? 1 : 0);

                return (
                  <article
                    key={`${post.id}-${slotIdx}`}
                    onClick={() => setSelectedPost(post)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPost(post);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open Instagram post: ${post.caption.slice(0, 60)}...`}
                    className="group bg-white rounded-2xl overflow-hidden border border-black/8 flex flex-col justify-between cursor-pointer transition-transform duration-150 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#D97706]"
                  >
                    <div>
                      {/* Card Top Author Row */}
                      <div className="px-4 py-3 flex items-center justify-between text-xs border-b border-black/6">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded-full overflow-hidden bg-[#141413] shrink-0">
                            <StudioImage
                              src={artistPhotoUrl}
                              alt="Mukesh Guru avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-semibold text-[#141413] truncate">
                            {post.handle}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#78716C] shrink-0">
                          {post.timestamp}
                        </span>
                      </div>

                      {/* Square Artwork Media */}
                      <div className="relative aspect-square w-full overflow-hidden bg-[#141413]">
                        <StudioImage
                          src={post.image}
                          alt={post.caption}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-md bg-black/60 backdrop-blur-xs text-white flex items-center justify-center">
                          {renderMediaTypeIcon(post.mediaType)}
                        </div>
                      </div>

                      {/* Caption & Location */}
                      <div className="p-4">
                        <div className="text-[11px] text-[#B45309] font-medium mb-1">
                          {post.category} · {post.location}
                        </div>
                        <p className="text-xs text-[#292524] line-clamp-2 leading-relaxed">
                          {post.caption}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Likes & Comments Footer */}
                    <div className="px-4 pb-3.5 pt-2.5 border-t border-black/6 flex items-center justify-between text-xs text-[#57534E]">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={(e) => toggleLike(post.id, e)}
                          aria-label={isLiked ? 'Unlike post' : 'Like post'}
                          className={`flex items-center gap-1.5 font-mono-num transition-colors cursor-pointer ${
                            isLiked ? 'text-rose-600 font-semibold' : 'hover:text-[#141413]'
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`}
                          />
                          <span>{likeCount}</span>
                        </button>
                        <span className="flex items-center gap-1.5 font-mono-num">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{post.comments}</span>
                        </span>
                      </div>

                      <span className="text-[11px] font-semibold text-[#141413] group-hover:text-[#D97706] transition-colors">
                        Inspect →
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          /* FULL RESPONSIVE GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPosts.map((post) => {
              const isLiked = !!likedPostIds[post.id];
              const likeCount = post.likes + (isLiked ? 1 : 0);

              return (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPost(post);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open Instagram post: ${post.caption.slice(0, 60)}...`}
                  className="group bg-white rounded-2xl overflow-hidden border border-black/8 flex flex-col justify-between cursor-pointer transition-transform duration-150 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#D97706]"
                >
                  <div>
                    <div className="relative aspect-square w-full overflow-hidden bg-[#141413]">
                      <StudioImage
                        src={post.image}
                        alt={post.caption}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-md bg-black/60 backdrop-blur-xs text-white flex items-center justify-center">
                        {renderMediaTypeIcon(post.mediaType)}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-[11px] text-[#78716C] mb-1">
                        <span className="font-medium text-[#B45309]">{post.category}</span>
                        <span>{post.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#292524] line-clamp-2 leading-relaxed">
                        {post.caption}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-3.5 pt-2.5 border-t border-black/6 flex items-center justify-between text-xs text-[#57534E]">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={(e) => toggleLike(post.id, e)}
                        className={`flex items-center gap-1.5 font-mono-num transition-colors cursor-pointer ${
                          isLiked ? 'text-rose-600 font-semibold' : 'hover:text-[#141413]'
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`}
                        />
                        <span>{likeCount}</span>
                      </button>
                      <span className="flex items-center gap-1.5 font-mono-num">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                    <span className="text-[11px] text-[#78716C]">{post.location}</span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Studio Instagram Callout */}
        <div className="mt-8 pt-6 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#57534E]">
          <div>
            Showing <strong className="font-mono-num text-[#141413]">{filteredPosts.length}</strong>{' '}
            live studio posts from <strong className="text-[#141413]">{CONTACT_INFO.instagramHandle}</strong>{' '}
            · Lead Artist: <strong className="text-[#141413]">{CONTACT_INFO.artistName}</strong>
          </div>

          <a
            href={`https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(
              'Namaste Mukesh ji! I saw your live Instagram gallery on the GURUART website and would love to discuss a custom wall mural or artwork.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#141413] hover:text-[#D97706] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Send Reference Post on WhatsApp (6372182212)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* INSTAGRAM POST DETAIL LIGHTBOX MODAL */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Instagram Post Viewer"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#F7F5F0] text-[#141413] rounded-2xl overflow-hidden border border-black/15 shadow-2xl grid grid-cols-1 md:grid-cols-12 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Image Container */}
            <div className="md:col-span-7 bg-[#141413] flex items-center justify-center min-h-[300px] sm:min-h-[440px]">
              <StudioImage
                src={selectedPost.image}
                alt={selectedPost.caption}
                className="w-full h-full max-h-[520px] object-cover"
              />
            </div>

            {/* Right Post Metadata & Inquiry Column */}
            <div className="md:col-span-5 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-black/15 bg-[#141413]">
                      <StudioImage
                        src={artistPhotoUrl}
                        alt="Mukesh Guru avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#141413]">
                        {selectedPost.handle}
                      </div>
                      <div className="text-xs text-[#57534E]">{selectedPost.location}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    aria-label="Close Instagram post modal"
                    className="w-9 h-9 rounded-lg hover:bg-black/10 flex items-center justify-center text-[#141413] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-5 space-y-3">
                  <div className="text-xs font-medium text-[#B45309]">
                    {selectedPost.category} · Posted {selectedPost.timestamp}
                  </div>
                  <p className="text-sm text-[#1C1917] leading-relaxed">{selectedPost.caption}</p>
                  <p className="text-xs text-[#78716C] leading-relaxed">{selectedPost.hashtags}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-black/10 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#57534E]">
                  <button
                    type="button"
                    onClick={() => toggleLike(selectedPost.id)}
                    className={`flex items-center gap-1.5 font-mono-num font-semibold cursor-pointer ${
                      likedPostIds[selectedPost.id] ? 'text-rose-600' : 'text-[#141413]'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedPostIds[selectedPost.id] ? 'fill-rose-600 text-rose-600' : ''
                      }`}
                    />
                    <span>
                      {selectedPost.likes + (likedPostIds[selectedPost.id] ? 1 : 0)} likes
                    </span>
                  </button>

                  <span className="font-mono-num">{selectedPost.comments} comments</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      const postToUse = selectedPost;
                      setSelectedPost(null);
                      onInquireFromPost(postToUse);
                    }}
                    className="w-full py-3 px-4 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Request Quote for Similar Artwork
                  </button>

                  <a
                    href={`https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(
                      `Namaste Mukesh ji! I saw your Instagram post (${selectedPost.category} — "${selectedPost.caption.slice(
                        0,
                        50
                      )}...") on GURUART and would like a quote.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg border border-black/15 hover:bg-black/5 text-center text-xs font-semibold text-[#141413] transition-colors"
                  >
                    Ask About This Post on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
