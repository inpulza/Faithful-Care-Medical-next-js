import * as React from "react";
import { ArrowLeft, ArrowRight, InstagramLogo, Play, TiktokLogo } from "@phosphor-icons/react";
import { socialVideosFor, type SocialVideoPlacement } from "@shared/social-videos";
import { trackEvent } from "@/lib/analytics";

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function SocialVideoCarousel({ placement }: { placement: SocialVideoPlacement }) {
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const videos = socialVideosFor(placement);

  const updateScrollControls = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const leadingInset = Number.parseFloat(window.getComputedStyle(scroller).paddingInlineStart) || 0;
    setCanScrollPrevious(scroller.scrollLeft > leadingInset + 1);
    setCanScrollNext(scroller.scrollLeft < maxScrollLeft - 1);
  }, []);

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const resizeObserver = new ResizeObserver(updateScrollControls);
    resizeObserver.observe(scroller);
    scroller.addEventListener("scroll", updateScrollControls, { passive: true });
    const frame = requestAnimationFrame(updateScrollControls);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scroller.removeEventListener("scroll", updateScrollControls);
    };
  }, [updateScrollControls]);

  const scroll = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollBy({
      left: direction * Math.min(scroller.clientWidth * 0.85, 760),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const trackVideoClick = (slug: string, platform: "tiktok" | "instagram") => {
    trackEvent("social_video_click", {
      video_slug: slug,
      platform,
      placement,
    });
  };

  return (
    <section
      className="py-14 md:py-20"
      aria-labelledby={`social-video-title-${placement}`}
      data-testid={`social-video-section-${placement}`}
    >
      <div className="container-radical">
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase tracking-[0.16em]">Doctor-led health guidance</p>
            </div>
            <h2 id={`social-video-title-${placement}`} className="h2 text-deep-navy">
              Clear answers, straight from Dr. Reve.
            </h2>
            <p className="body-md mt-4 max-w-2xl text-deep-navy/65">
              Short, practical videos for older adults, caregivers, and families navigating primary and palliative care.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-3 md:flex" aria-label="Video carousel controls">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={!canScrollPrevious}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-deep-navy/15 bg-white text-deep-navy transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-deep-navy/15 disabled:hover:text-deep-navy"
              aria-label="Show previous videos"
              data-testid={`social-video-previous-${placement}`}
            >
              <ArrowLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={!canScrollNext}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-primary"
              aria-label="Show next videos"
              data-testid={`social-video-next-${placement}`}
            >
              <ArrowRight size={22} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] [scrollbar-color:hsl(var(--primary))_transparent] md:-mx-6 md:gap-6 md:px-6 lg:mx-0 lg:px-0"
          aria-label="Health videos from Dr. Addys Reve"
          data-testid={`social-video-carousel-${placement}`}
        >
          {videos.map((video) => (
            <li
              key={video.slug}
              className="w-[78vw] max-w-[330px] shrink-0 snap-start sm:w-[44vw] lg:w-[calc((100%-4.5rem)/4)]"
              data-testid={`social-video-card-${video.slug}`}
            >
              <article
                lang={video.language}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-[rgba(8,31,63,0.06)]"
              >
                <a
                  href={video.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackVideoClick(video.slug, "tiktok")}
                  className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  aria-label={video.language === "es"
                    ? `${video.title}. Ver en TikTok. ${formatDuration(video.durationSeconds)}.`
                    : `${video.title}. Watch on TikTok. ${formatDuration(video.durationSeconds)}.`}
                  data-testid={`social-video-link-${video.slug}`}
                >
                  <div className="relative aspect-[9/16] overflow-hidden bg-deep-navy/5">
                    <img
                      src={video.thumbnailUrl}
                      alt=""
                      width="540"
                      height="960"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                      data-testid={`social-video-thumbnail-${video.slug}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/75 via-transparent to-deep-navy/10" aria-hidden="true" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-deep-navy shadow-sm">
                      <TiktokLogo size={16} weight="fill" aria-hidden="true" />
                      TikTok
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-deep-navy shadow-xl transition group-hover:scale-105">
                        <Play size={27} weight="fill" className="ml-1" />
                      </span>
                    </div>
                    <span className="absolute bottom-4 right-4 rounded-full bg-deep-navy/85 px-3 py-1.5 text-xs font-semibold text-white">
                      {formatDuration(video.durationSeconds)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                      {video.language === "es" ? "En español" : "In English"}
                    </p>
                    <h3 className="text-lg font-semibold leading-snug text-deep-navy">{video.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-deep-navy/60">{video.description}</p>
                  </div>
                </a>
                <div className="mt-auto border-t border-deep-navy/8 px-5 py-4" data-testid={`social-video-footer-${video.slug}`}>
                  <a
                    href={video.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackVideoClick(video.slug, "instagram")}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-deep-navy/65 transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    aria-label={video.language === "es"
                      ? `Ver ${video.title} en Instagram`
                      : `View ${video.title} on Instagram`}
                  >
                    <InstagramLogo size={18} aria-hidden="true" />
                    {video.language === "es" ? "También en Instagram" : "Also on Instagram"}
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm text-deep-navy/50 md:hidden">Swipe to see more videos.</p>
      </div>
    </section>
  );
}
