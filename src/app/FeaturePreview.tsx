import { useEffect, useRef } from "react"

export function FeaturePreview({ name }: { name: "office" | "docs" | "avatar" }) {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const element = video.current
    if (!element) return
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const frame = element.parentElement!
    const syncZoom = () => frame.classList.toggle("is-playing", !element.paused)
    const setDuration = () => {
      if (Number.isFinite(element.duration)) frame.style.setProperty("--preview-duration", `${element.duration}s`)
    }
    element.addEventListener("play", syncZoom)
    element.addEventListener("pause", syncZoom)
    element.addEventListener("loadedmetadata", setDuration)
    let visible = false
    const update = () => {
      if (visible && !reducedMotion.matches && !document.hidden) void element.play().catch(() => {})
      else element.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    }, { threshold: .15 })
    observer.observe(element)
    reducedMotion.addEventListener("change", update)
    document.addEventListener("visibilitychange", update)
    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener("change", update)
      document.removeEventListener("visibilitychange", update)
      element.pause()
      element.removeEventListener("play", syncZoom)
      element.removeEventListener("pause", syncZoom)
      element.removeEventListener("loadedmetadata", setDuration)
    }
  }, [])

  return <div className="lp-feature-frame" data-preview={name}><video ref={video} className="lp-feature-video" muted loop playsInline preload="none" poster={`/assets/landing/motion/${name}-poster.png`} aria-hidden="true" tabIndex={-1} disablePictureInPicture>
    <source src={`/assets/landing/motion/${name}.webm`} type="video/webm" />
  </video></div>
}
