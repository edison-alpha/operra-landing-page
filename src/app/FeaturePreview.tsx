import { useEffect, useRef } from "react"

export function FeaturePreview({ name }: { name: "office" | "docs" | "avatar" }) {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const element = video.current
    if (!element) return
    void element.play().catch(() => {})
    return () => element.pause()
  }, [])

  return <div className="lp-feature-frame" data-preview={name}>
    <video ref={video} className="lp-feature-video" autoPlay muted loop playsInline preload="metadata" poster={`/assets/landing/motion/${name}-poster.png`} aria-hidden="true" tabIndex={-1} disablePictureInPicture>
      <source src={`/assets/landing/motion/${name}.webm`} type="video/webm" />
    </video>
  </div>
}
