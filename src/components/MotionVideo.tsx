import { useEffect, useRef, useState } from 'react'

type Props = {
  name: string
  source: string
  poster: string
  className?: string
  showControl?: boolean
  motionEnabled?: boolean
  onMotionChange?: (enabled: boolean) => void
}

export default function MotionVideo({ name, source, poster, className = '', showControl = true, motionEnabled, onMotionChange }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [localEnabled, setLocalEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const enabled = motionEnabled ?? localEnabled
  const setEnabled = onMotionChange ?? setLocalEnabled
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(!preference.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [setEnabled])

  useEffect(() => {
    const video = ref.current
    if (!video || failed) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && enabled) {
        if (!video.getAttribute('src')) video.src = source
        video.play().catch(() => setEnabled(false))
      } else video.pause()
    }, { threshold: .2 })
    observer.observe(video)
    const visibility = () => {
      if (document.hidden) video.pause()
      else if (enabled) {
        const bounds = video.getBoundingClientRect()
        if (bounds.bottom > 0 && bounds.top < window.innerHeight) video.play().catch(() => setEnabled(false))
      }
    }
    document.addEventListener('visibilitychange', visibility)
    if (!enabled) video.pause()
    return () => { observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', visibility) }
  }, [enabled, source, failed, setEnabled])

  return (
    <div className={`motion-video ${className}`}>
      {failed ? <img src={poster} alt={name} /> : <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-label={name} onLoadedData={() => setLoaded(true)} onError={() => setFailed(true)} />}
      {!failed && showControl && <button type="button" className="motion-video__control" onClick={() => setEnabled(!enabled)} aria-pressed={enabled} aria-label={`${enabled ? 'Pause' : 'Play'} ${name}`}><span aria-hidden="true">{enabled ? 'Ⅱ' : '▷'}</span>{enabled ? 'Pause' : 'Play'}</button>}
      {failed && <span className="motion-video__fallback">Still image · video unavailable</span>}
      <span className="sr-only" role="status">{failed ? 'Video could not load. A still image is displayed.' : loaded ? '' : 'Silent video. A still image appears until playback begins.'}</span>
    </div>
  )
}
