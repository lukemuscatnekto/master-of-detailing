import { useCallback, useEffect, useRef, useState } from 'react'
import {
  siteFlags,
  workshopVideos,
  workshopVideosCopy,
} from '../data/content'
import { isAssetPresent, verifyAsset } from '../utils/verifyAsset'
import AssetLoadNotice from './AssetLoadNotice'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function playerClasses(orientation) {
  if (orientation === 'portrait') {
    return 'aspect-[9/16] h-auto w-full max-w-full object-contain'
  }
  return 'aspect-video h-auto w-full max-w-full object-contain'
}

function frameClasses(orientation) {
  if (orientation === 'portrait') {
    return 'video-player-frame video-player-frame-active video-player-frame-portrait'
  }
  return 'video-player-frame video-player-frame-active video-player-frame-landscape'
}

export default function WorkshopVideos() {
  const videoRef = useRef(null)
  const [availableVideos, setAvailableVideos] = useState(null)
  const [videosUnavailable, setVideosUnavailable] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!siteFlags.showWorkshopVideos) {
      setAvailableVideos([])
      setVideosUnavailable(false)
      return undefined
    }

    let cancelled = false

    ;(async () => {
      const checks = await Promise.all(
        workshopVideos.map(async (video) => ({
          video,
          status: await verifyAsset(video.src),
        })),
      )

      if (cancelled) return

      const verified = checks
        .filter(({ status }) => isAssetPresent(status))
        .map(({ video }) => video)

      setAvailableVideos(verified)
      setVideosUnavailable(
        verified.length === 0 &&
          checks.length > 0 &&
          checks.every(({ status }) => !isAssetPresent(status)),
      )

      const featured = verified.find((v) => v.featured) ?? verified[0]
      if (featured) setActiveId(featured.id)
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const activeVideo = availableVideos?.find((v) => v.id === activeId) ?? null
  const orientation = activeVideo?.orientation ?? 'landscape'

  const handleSelect = useCallback(
    (video) => {
      if (video.id === activeId) return

      const el = videoRef.current
      if (el) {
        el.pause()
        el.currentTime = 0
      }

      setLoadError(false)
      setActiveId(video.id)
    },
    [activeId],
  )

  useEffect(() => {
    const el = videoRef.current
    if (!el || !activeVideo) return

    el.pause()
    el.load()
    el.currentTime = 0
  }, [activeVideo?.src])

  if (!siteFlags.showWorkshopVideos || availableVideos === null) return null

  return (
    <section
      id="workshop-videos"
      aria-labelledby="workshop-videos-heading"
      className="section-pad relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 bg-workshop-videos-silk" aria-hidden="true" />

      <div className="container-px relative">
        <SectionHeading
          eyebrow={workshopVideosCopy.eyebrow}
          title={workshopVideosCopy.heading}
          intro={workshopVideosCopy.intro}
          align="center"
          headingId="workshop-videos-heading"
        />

        {videosUnavailable ? (
          <AssetLoadNotice className="mt-8 sm:mt-12 lg:mt-16">
            Workshop video clips could not be loaded right now. Please refresh the page or contact
            Matthias on WhatsApp if this continues.
          </AssetLoadNotice>
        ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 lg:mt-16 lg:grid-cols-[48fr_52fr] lg:items-start lg:gap-x-14">
          <div className="min-w-0 lg:pr-2">
            <Reveal>
              <div className="flex w-full justify-center lg:justify-center">
                <div className={frameClasses(orientation)}>
                  {loadError ? (
                    <p
                      className="flex min-h-[10rem] items-center justify-center px-4 py-8 text-center text-sm text-cream-muted sm:min-h-[12rem]"
                      role="status"
                    >
                      This workshop clip could not be loaded. Choose another video or try again later.
                    </p>
                  ) : (
                    <video
                      ref={videoRef}
                      key={activeVideo?.src}
                      className={`workshop-video video-fade ${playerClasses(orientation)}`}
                      controls
                      playsInline
                      preload="metadata"
                      poster={activeVideo?.poster}
                      aria-label={`${activeVideo?.title}. ${activeVideo?.subtitle}`}
                      onError={() => setLoadError(true)}
                    >
                      <source src={activeVideo?.src} type="video/mp4" />
                    </video>
                  )}
                </div>
              </div>
            </Reveal>

            {activeVideo && (
              <Reveal delay={40} className="mt-7 space-y-3 lg:mt-8 lg:max-w-lg">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold sm:text-xs">
                  {activeVideo.category}
                </p>
                <h3 className="heading-display text-xl leading-tight text-cream sm:text-2xl">
                  {activeVideo.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream-muted normal-case tracking-normal sm:text-[0.95rem]">
                  {activeVideo.description}
                </p>
              </Reveal>
            )}
          </div>

          <Reveal delay={60} className="min-w-0 border-t border-white/[0.06] pt-6 lg:border-t-0 lg:pt-2">
            <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream-muted">
              Workshop clips
            </p>
            <ul role="listbox" aria-label="Workshop video clips" className="min-w-0">
              {availableVideos.map((video, index) => {
                const isActive = video.id === activeId
                const indexLabel = String(index + 1).padStart(2, '0')

                return (
                  <li key={video.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => handleSelect(video)}
                      className={`video-index-row group flex min-h-[48px] w-full items-start gap-3 sm:gap-4 ${
                        isActive ? 'video-index-row-active' : ''
                      }`}
                    >
                      <span
                        className="mt-0.5 w-6 shrink-0 font-display text-xs tabular-nums text-cream-muted/70 sm:text-sm"
                        aria-hidden="true"
                      >
                        {indexLabel}
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-gold sm:text-[0.65rem]">
                          {video.category}
                        </span>
                        <span
                          className={`mt-1 block font-display text-sm uppercase leading-tight tracking-tight text-cream sm:text-[0.95rem] ${
                            isActive ? 'font-bold' : 'font-semibold'
                          }`}
                        >
                          {video.title}
                        </span>
                        <span className="mt-1 block text-xs leading-snug text-cream-muted normal-case tracking-normal">
                          {video.subtitle}
                        </span>
                      </span>
                      <span className="flex shrink-0 flex-col items-end gap-1.5 self-center">
                        <span className="flex items-center gap-1.5 font-display text-xs tabular-nums text-cream-muted sm:text-sm">
                          {isActive && (
                            <span
                              className="now-playing-dot h-1.5 w-1.5 rounded-full bg-gold"
                              aria-label="Now playing"
                            />
                          )}
                          {video.duration}
                        </span>
                        <Icon
                          name="play"
                          filled
                          className={`h-3 w-3 ${isActive ? 'text-gold' : 'text-cream-muted/45 group-hover:text-cream-muted'}`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
        )}
      </div>
    </section>
  )
}
