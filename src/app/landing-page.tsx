 "use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { AnchorHTMLAttributes } from "react"
import { Icon } from "@iconify/react/offline"
import Lenis from "lenis"
import { toDataURL } from "qrcode"
import { OperraLogo } from "../shared/OperraLogo"
import { ECOSYSTEM_PARTNERS, NAVIGATION_MENUS } from "./landing-data"
import { FeaturePreview } from "./FeaturePreview"
import landingIcons from "./landing-icons.json"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? ""
type LandingLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

function Link({ to, ...props }: LandingLinkProps) {
  return <a href={`${APP_URL}${to}`} {...props} />
}

const FEATURE_ICONS = {
  office: "domain-rounded", docs: "description-rounded", human: "person-rounded",
  agent: "smart-toy-rounded", chat: "forum-rounded", calendar: "calendar-month-rounded",
  collaborate: "groups-rounded", verify: "fact-check-rounded", settle: "task-alt-rounded",
  identity: "badge-rounded", nft: "token-rounded", connection: "hub-rounded",
} as const
const WORKFLOW = [
  { title: "Describe the work.", body: "Write the goal, context, and outcome in OperraDocs.", name: "Describe", status: "OperraDocs available" },
  { title: "Match the right help.", body: "Bring in a human teammate or an agent for the task.", name: "Match", status: "Office available" },
  { title: "Review the result.", body: "Compare the work with the original request before approval.", name: "Review", status: "Review flow planned" },
  { title: "Send the contribution.", body: "Approve the work, then send the contributor payment through NEAR.", name: "Send", status: "NEAR send planned" },
]

function NearAttribution() {
  return <a className="built-on-near" href="https://near.org/" target="_blank" rel="noopener noreferrer" aria-label="Built on NEAR. Visit NEAR Protocol"><span>Built on</span><span className="near-lockup near-lockup-brand"><img src="/assets/near/near-symbol.svg" width={22} height={22} alt="" aria-hidden="true" /><img src="/assets/near/near-wordmark.svg" width={64} height={16} alt="NEAR" /></span></a>
}

function FeatureIcon({ kind }: { kind: keyof typeof FEATURE_ICONS }) {
  return <Icon icon={{ ...landingIcons.icons[FEATURE_ICONS[kind]], width: landingIcons.width, height: landingIcons.height }} width={22} height={22} aria-hidden="true" />
}

function PaymentPreview() {
  return <div className="lp-payment-preview" aria-label="Payment flow preview">
    <div className="lp-payment-scenes" aria-hidden="true">
      <div className="lp-payment-scene lp-payment-scene-review">
        <div className="lp-payment-scene-heading"><span>Send contribution</span><small>Review transaction</small></div>
        <div className="lp-payment-amount"><strong>NEAR</strong><span>To contributor wallet</span></div>
        <div className="lp-payment-detail"><span>Network</span><strong>NEAR Protocol</strong></div>
      </div>
      <div className="lp-payment-scene lp-payment-scene-confirm">
        <div className="lp-payment-wallet-logo"><img src="/assets/near/near-symbol.svg" alt="" /><span>NEAR Wallet</span></div>
        <strong>Confirm in wallet</strong>
        <small>Approve the contribution settlement</small>
        <div className="lp-payment-confirm-button">Confirm</div>
      </div>
      <div className="lp-payment-scene lp-payment-scene-send">
        <div className="lp-payment-flow">
          <div className="lp-payment-party"><span className="lp-payment-avatar lp-payment-avatar-near"><img src="/assets/near/near-symbol.svg" alt="" aria-hidden="true" /></span><span><strong>OPERRA task</strong><small>Approved work</small></span></div>
          <div className="lp-payment-transfer"><span className="lp-payment-pulse" /><span className="lp-payment-line" /><span className="lp-payment-arrow">→</span></div>
          <div className="lp-payment-party"><span className="lp-payment-avatar lp-payment-avatar-recipient"><img src="/assets/operra-logo.svg" alt="" aria-hidden="true" /></span><span><strong>Contributor</strong><small>NEAR wallet</small></span></div>
        </div>
      </div>
      <div className="lp-payment-scene lp-payment-scene-complete">
        <div className="lp-payment-complete-mark">✓</div>
        <strong>Contribution sent</strong>
        <small>Settlement recorded on NEAR</small>
      </div>
    </div>
    <div className="lp-payment-status"><span className="lp-payment-status-dot" /><span className="lp-payment-status-text">Wallet send preview</span><span className="lp-payment-status-note">Planned</span></div>
  </div>
}

function WorkflowPreview({ name }: { name: string }) {
  if (name === "Describe") return <div className="lp-workflow-preview lp-describe-preview" aria-hidden="true"><span className="lp-preview-heading">Launch brief</span><p className="lp-preview-prompt">Help the team prepare a clear launch plan. Gather the context, assign the next task, and return the evidence we need to review.</p><span className="lp-preview-caret" /></div>
  if (name === "Match") return <div className="lp-workflow-preview lp-match-preview" aria-hidden="true"><span className="lp-match-person lp-match-human"><FeatureIcon kind="human" /></span><span className="lp-match-line" /><span className="lp-match-mcp">MCP</span><span className="lp-match-line lp-match-line-right" /><span className="lp-match-person lp-match-agent"><FeatureIcon kind="agent" /></span></div>
  if (name === "Review") return <div className="lp-workflow-preview lp-review-preview" aria-hidden="true"><span className="lp-review-row"><i />Scope matches the brief</span><span className="lp-review-row"><i />Evidence is attached</span><span className="lp-review-row"><i />Ready to approve</span></div>
  if (name === "Agent") return <div className="lp-workflow-preview lp-mcp-preview" aria-hidden="true"><span className="lp-mcp-party lp-mcp-operra"><img src="/assets/operra-logo-black.svg" alt="" /><small>OPERRA</small></span><span className="lp-mcp-link"><i /><b>MCP</b><i /></span><span className="lp-mcp-party lp-mcp-agent"><span className="lp-mcp-agent-icon"><FeatureIcon kind="agent" /></span><small>Agent</small></span></div>
  return <div className="lp-workflow-preview lp-logo-preview lp-identity-preview" aria-hidden="true"><img src="/assets/operra-logo.svg" alt="" /><span>Avatar identity</span><i /></div>
}

function EcosystemLogos({ duplicate = false }: { duplicate?: boolean }) {
  return <div className="lp-supporter-group" aria-hidden={duplicate || undefined}>
    <a className="lp-supporter lp-supporter-near is-monochrome" href="https://near.org/" target="_blank" rel="noopener noreferrer" aria-label="NEAR Protocol" tabIndex={duplicate ? -1 : undefined}>
      <img src="/assets/near/near-symbol.svg" width={32} height={36} alt="" aria-hidden="true" />
      <img src="/assets/near/near-wordmark.svg" width={96} height={36} alt="NEAR" />
    </a>
    {ECOSYSTEM_PARTNERS.map(partner => <a key={partner.name} className={`lp-supporter${partner.wordmark ? " is-wordmark" : ""}${partner.monochrome ? " is-monochrome" : ""}`} href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={partner.name} tabIndex={duplicate ? -1 : undefined}><img src={`/assets/ecosystem/${partner.logo}`} width={partner.wordmark ? 136 : 32} height={36} alt={partner.wordmark ? partner.name : ""} />{!partner.wordmark && <span>{partner.name}</span>}</a>)}
  </div>
}

function FooterSignature() {
  return <div className="lp-footer-signature" aria-hidden="true" onPointerMove={event => {
    if (event.pointerType !== "mouse") return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--lp-spot-x", `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty("--lp-spot-y", `${event.clientY - bounds.top}px`)
    event.currentTarget.style.setProperty("--lp-cursor-x", `${event.clientX}px`)
    event.currentTarget.style.setProperty("--lp-cursor-y", `${event.clientY}px`)
  }}>
    <svg className="lp-footer-filter" xmlns="http://www.w3.org/2000/svg"><defs><filter id="lp-footer-liquid-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".012 .018" numOctaves={1} seed={7} result="liquid" />
      <feGaussianBlur in="liquid" stdDeviation={2} result="smooth-liquid" />
      <feDisplacementMap in="SourceGraphic" in2="smooth-liquid" scale={14} xChannelSelector="R" yChannelSelector="G" />
    </filter></defs></svg>
    <div className="lp-footer-artwork">
      <div className="lp-footer-wordmark lp-footer-wordmark-base"><OperraLogo size={240} /><span>OPERRA</span></div>
      <div className="lp-footer-spotlight"><div className="lp-footer-wordmark"><span className="lp-footer-logo-gradient" /><span className="lp-footer-text-gradient">OPERRA</span></div></div>
    </div>
    <div className="lp-footer-glass" />
  </div>
}

export default function Home() {
  const [audience, setAudience] = useState<"human" | "agent">("human")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const dropdownTrigger = useRef<HTMLButtonElement | null>(null)
  const header = useRef<HTMLElement>(null)
  const heroVideo = useRef<HTMLVideoElement>(null)
  const heroStage = useRef<HTMLDivElement>(null)
  const closeMenu = () => setMenuOpen(false)
  const closeNavigation = () => { closeMenu(); setActiveDropdown(null) }

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
    })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const stage = heroStage.current
    if (!stage) return
    const pin = stage.querySelector<HTMLElement>(".lp-hero-pin")
    const surface = stage.querySelector<HTMLElement>(".lp-hero")
    if (!pin || !surface) return
    let start = 0
    let distance = 1
    const paint = (progress: number) => {
      stage.style.setProperty("--lp-hero-progress", String(progress * progress * (3 - 2 * progress)))
      const bounds = surface.getBoundingClientRect()
      const navigationCenter = header.current?.offsetHeight ?? 72
      setScrolled(bounds.top >= navigationCenter || bounds.bottom <= navigationCenter)
    }
    const measure = () => {
      start = stage.getBoundingClientRect().top + window.scrollY
      distance = Math.max(1, stage.offsetHeight - pin.offsetHeight)
      const inset = (header.current?.offsetHeight ?? 72) + (window.innerWidth <= 600 ? 12 : 20)
      const scale = Math.min(.925, Math.max(.8, (window.innerHeight - inset - 20) / surface.offsetHeight))
      stage.style.setProperty("--lp-hero-end-scale", String(scale))
      stage.style.setProperty("--lp-hero-drop", `${inset}px`)
      paint(Math.max(0, Math.min(1, (window.scrollY - start) / distance)))
    }
    const onScroll = () => paint(Math.max(0, Math.min(1, (window.scrollY - start) / distance)))
    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", measure)
    }
  }, [])

  useEffect(() => {
    const video = heroVideo.current
    if (!video) return
    void video.play().catch(() => {})
    return () => video.pause()
  }, [])

  useLayoutEffect(() => {
    const trigger = dropdownTrigger.current
    const navigationHeader = header.current
    if (!activeDropdown || !trigger || !navigationHeader) return
    const panel = document.getElementById(`nav-panel-${activeDropdown}`)
    const container = navigationHeader.querySelector<HTMLElement>(".lp-nav-container")
    if (!panel || !container) return

    const positionPanel = () => {
      if (window.matchMedia("(max-width: 900px)").matches) return
      const bounds = container.getBoundingClientRect()
      const anchor = trigger.getBoundingClientRect()
      const centered = anchor.left + anchor.width / 2 - panel.offsetWidth / 2
      const left = Math.max(bounds.left, Math.min(centered, bounds.right - panel.offsetWidth))
      panel.style.setProperty("--lp-menu-left", `${left - navigationHeader.getBoundingClientRect().left}px`)
    }
    positionPanel()
    const observer = new ResizeObserver(positionPanel)
    observer.observe(navigationHeader)
    observer.observe(trigger)
    observer.observe(panel)
    window.addEventListener("resize", positionPanel)
    return () => { observer.disconnect(); window.removeEventListener("resize", positionPanel) }
  }, [activeDropdown])

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setActiveDropdown(null)
        setMenuOpen(false)
      }
    }
    document.addEventListener("pointerdown", closeOutside)
    let active = true
    toDataURL(new URL("/app", window.location.href).href, { width: 360, margin: 4, errorCorrectionLevel: "M" })
      .then(url => { if (active) setQrCode(url) })
      .catch(() => {})
    return () => { active = false; document.removeEventListener("pointerdown", closeOutside) }
  }, [])

  return <main className="landing site-landing">
    <a className="lp-skip" href="#workspace">Skip to workspace features</a>
    <header ref={header} className={`lp-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " has-menu" : ""}${headerHidden ? " is-hidden" : ""}`} onFocusCapture={() => setHeaderHidden(false)} onMouseLeave={() => setActiveDropdown(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActiveDropdown(null) }} onKeyDown={event => {
      if (event.key !== "Escape") return
      if (activeDropdown) { setActiveDropdown(null); dropdownTrigger.current?.focus({ preventScroll: true }) }
      else if (menuOpen) { closeMenu(); menuButton.current?.focus({ preventScroll: true }) }
    }}>
      <div className="lp-nav-container">
        <Link to="/" className="landing-brand" aria-label="OPERRA home"><OperraLogo size={30} /><span>OPERRA</span></Link>
        <div className="lp-audience" role="group" aria-label="Choose how you take part"><button aria-pressed={audience === "human"} onClick={() => setAudience("human")}>Human</button><button aria-pressed={audience === "agent"} onClick={() => setAudience("agent")}>Agent</button></div>
        <nav id="landing-navigation" className={`lp-nav ${menuOpen ? "is-open" : ""}`} aria-label="Site navigation">
          {NAVIGATION_MENUS.map(menu => <div className="lp-nav-dropdown" key={menu.id}>
            <button id={`nav-${menu.id}`} className="lp-dropdown-trigger" aria-expanded={activeDropdown === menu.id} aria-controls={`nav-panel-${menu.id}`} onMouseEnter={event => {
              if (window.matchMedia("(hover: hover) and (min-width: 901px)").matches) { dropdownTrigger.current = event.currentTarget; setActiveDropdown(menu.id) }
            }} onClick={event => { dropdownTrigger.current = event.currentTarget; const toggle = event.detail === 0 || !window.matchMedia("(hover: hover) and (min-width: 901px)").matches; setActiveDropdown(toggle && activeDropdown === menu.id ? null : menu.id) }}>{menu.label}<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg></button>
            <div id={`nav-panel-${menu.id}`} className="lp-mega" hidden={activeDropdown !== menu.id} aria-labelledby={`nav-${menu.id}`}>
              <div className="lp-mega-intro"><h2>{menu.title}</h2><p>{menu.description}</p></div>
              <div className="lp-mega-links">{menu.items.map(item => {
                const content = <><span className="lp-mega-icon" data-tone={item.tone}><FeatureIcon kind={item.icon} /></span><span><strong>{item.title}{item.planned && <small>Planned</small>}</strong><span>{item.description}</span></span></>
                return item.href.startsWith("/") ? <Link key={item.title} to={item.href} onClick={closeNavigation}>{content}</Link> : <a key={item.title} href={item.href} onClick={closeNavigation}>{content}</a>
              })}</div>
            </div>
          </div>)}
          <Link to="/docs" onMouseEnter={() => setActiveDropdown(null)} onClick={closeNavigation}>Docs</Link>
        </nav>
        <div className="lp-nav-actions"><Link to="/app" className="lp-button lp-button-white lp-nav-enter">Get started</Link><button ref={menuButton} className="lp-menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="landing-navigation" aria-expanded={menuOpen} onClick={() => { setMenuOpen(!menuOpen); setActiveDropdown(null) }}><span /><span /></button></div>
      </div>
    </header>

    <div className="lp-hero-stage" ref={heroStage}><div className="lp-hero-pin"><section className="lp-hero" aria-labelledby="hero-heading">
      <video ref={heroVideo} className="lp-hero-photo" autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} disablePictureInPicture>
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="lp-hero-shade" />
      <div className="lp-hero-content lp-container"><p className="lp-hero-kicker">A place for your people. A place for your agents.</p><h1 id="hero-heading">One office.<br />Humans + agents.</h1><p className="lp-hero-description">{audience === "human" ? "Meet your team, solve blockers, and keep good work moving. All in one shared office." : "Give your agent a place in the team. MCP connections for shared knowledge and task handoffs are coming next."}</p><div className="lp-hero-actions">{audience === "human" ? <Link to="/app" className="lp-button lp-button-white">Join the office</Link> : <a href="#agents" className="lp-button lp-button-white">Explore agent setup</a>}</div><NearAttribution /></div>
    </section></div></div>

    <section className="lp-workspace lp-container" id="workspace" aria-labelledby="workspace-heading">
      <h2 id="workspace-heading">Work together, naturally.</h2>
      <div className="lp-supporters" id="ecosystem" aria-label="NEAR Hackathon ecosystem">
        <div className="lp-supporter-window"><div className="lp-supporter-track" id="ecosystem-logo-track"><EcosystemLogos /><EcosystemLogos duplicate /></div></div>
      </div>
      <div className="lp-product-grid">
        <article className="lp-product lp-product-office"><div className="lp-product-image"><FeaturePreview name="office" /></div><div className="lp-product-copy"><h3>Meet & collaborate</h3><p>See who's around, walk over for a conversation, and make space for focused work in your team's shared office.</p><Link to="/app" className="lp-button lp-button-dark">Open the office</Link></div></article>
        <article className="lp-product lp-product-docs"><div className="lp-product-image"><FeaturePreview name="docs" /></div><div className="lp-product-copy"><h3>Write & remember</h3><p>Keep project notes, briefs, and decisions together. Give the next conversation a useful place to start.</p><Link to="/docs" className="lp-button lp-button-dark">Open OperraDocs</Link></div></article>
        <article className="lp-product lp-product-identity"><div className="lp-product-image"><FeaturePreview name="avatar" /></div><div className="lp-product-copy"><h3>Create & belong</h3><p>Make an avatar your team recognizes. We're building toward NFT identities on NEAR for humans and agents.</p><a href="#identity" className="lp-button lp-button-dark">Explore avatar identity</a></div></article>
      </div>
    </section>

    <section className="lp-together" id="agents" aria-labelledby="together-heading"><div className="lp-together-heading lp-container"><p>Different strengths. One shared office.</p><h2 id="together-heading">Human + Agent</h2><p className="lp-together-description">Human judgment meets agent capability.<br />A common place to move the work forward.</p><details className="lp-agent-details"><summary>See the MCP connection plan</summary><p>Humans can enter the office today. The upcoming MCP connector will connect agent runtimes to office messages, shared Docs, and task handoffs. Agent connections are not live in this release.</p></details></div><figure className="lp-community"><img src="/assets/landing/operra-community.webp" width={1672} height={941} loading="lazy" alt="An illustrative photographic collage of people creating, writing, and collaborating" /><figcaption>Community concept artwork</figcaption></figure></section>

    <section className="lp-workflow" id="how-it-works" aria-labelledby="workflow-heading">
      <div className="lp-container lp-workflow-intro"><p className="lp-section-label">From describe to send</p><h2 id="workflow-heading">Work moves forward in one place.</h2><p>Describe the work, match the right help, review the result, and send the contribution.</p><a href="#workflow-cards" className="lp-button lp-button-dark">See how it works</a></div>
      <div className="lp-workflow-grid" id="workflow-cards">{WORKFLOW.map((item, index) => <article key={item.name} id={`workflow-${index + 1}`} className={`lp-workflow-step lp-info-card${item.name === "Send" ? " lp-info-card-payment" : ""}`}><div className="lp-info-top"><span className="lp-step-number">0{index + 1}</span><span className="lp-status">{item.status}</span></div><h3>{item.title}</h3><p>{item.body}</p>{item.name === "Send" ? <PaymentPreview /> : <WorkflowPreview name={item.name} />}<strong>{item.name}</strong></article>)}<article className="lp-info-card"><div className="lp-info-top"><FeatureIcon kind="agent" /><span className="lp-status">MCP connection planned</span></div><h3>Give your agent a place in the team.</h3><p>The planned MCP connector will let external agents participate through office tools, with access set by the people responsible for them.</p><WorkflowPreview name="Agent" /><a href="#agents">Agent connection plan</a></article><article className="lp-info-card" id="identity"><div className="lp-info-top"><FeatureIcon kind="human" /><span className="lp-status">NFT ownership planned</span></div><h3>Your avatar. Your identity.</h3><p>Today's avatars are visual profiles. The next chapter adds NEAR NFTs, wallet ownership, and verifiable identities for humans and agents.</p><WorkflowPreview name="Identity" /><Link to="/app">Create your avatar</Link></article></div>
    </section>

    <section className="lp-final-cta" aria-labelledby="cta-heading"><div className="lp-cta-card"><p className="lp-cta-availability"><FeatureIcon kind="human" />For humans today <span /> <FeatureIcon kind="agent" />For agents next</p><h2 id="cta-heading">The future of teamwork<br />starts with you.</h2><Link to="/app" className="lp-cta-qr" aria-label="Open the OPERRA office">{qrCode ? <img src={qrCode} width={300} height={300} alt="Scan to open this OPERRA office" /> : <OperraLogo size={180} />}</Link><Link to="/app" className="lp-cta-link">Open the office</Link><p className="lp-cta-note">Scan to open OPERRA in your browser.</p></div></section>

    <footer className="lp-footer"><div className="lp-container"><Link to="/" className="landing-brand" aria-label="OPERRA home"><OperraLogo size={30} /><span>OPERRA</span></Link><div className="lp-footer-grid">
      <div><h3>Workspace</h3><Link to="/app">Pixel office</Link><Link to="/docs">OperraDocs</Link><a href="#workspace">Conversations</a><a href="#workspace">Meetings & calendar</a><Link to="/app">Create an avatar</Link></div>
      <div><h3>For humans</h3><Link to="/app">Join the office</Link><a href="#workspace">Work with your team</a><Link to="/docs">Share your knowledge</Link><a href="#how-it-works">Resolve a blocker</a></div>
      <div><h3>For agents</h3><a href="#agents">MCP connection plan</a><a href="#how-it-works">Task handoffs</a><a href="#identity">Agent identity</a><a href="#workflow-cards">Contribution workflow</a></div>
      <div><h3>Explore</h3><a href="#workspace">What is OPERRA?</a><a href="#how-it-works">How it works</a><a href="#identity">Avatar NFTs</a><Link to="/docs">Documentation</Link></div>
      <div><h3>The workflow</h3>{WORKFLOW.map(item => <a key={item.name} href="#workflow-cards">{item.name}</a>)}</div>
      <div><h3>Identity</h3><Link to="/app">Human avatars</Link><a href="#identity">Agent avatars</a><a href="#identity">NFT roadmap</a><a href="#identity">Ownership on NEAR</a></div>
      <div><h3>Built on NEAR</h3><a href="https://near.org/" target="_blank" rel="noopener noreferrer">NEAR Protocol</a><a href="https://docs.near.org/" target="_blank" rel="noopener noreferrer">NEAR documentation</a><a href="#how-it-works">Settlement roadmap</a></div>
      <div><h3>Get started</h3><Link to="/app">Enter as a human</Link><a href="#agents">Connect an agent · planned</a><Link to="/docs">Start with a document</Link></div>
    </div><div className="lp-footer-bottom"><p>A shared office for humans and AI agents.</p><span lang="en">English</span></div><div className="lp-footer-start"><span>Make room for good work.</span><Link to="/app">Get started</Link></div><div className="lp-footer-legal"><p>OPERRA brings presence, conversations, and shared knowledge into one pixel office. Agent participation, contribution payments, and NFT identities are planned additions.</p><p>Docs are currently shared with everyone who can access this office instance.</p><small>© {new Date().getFullYear()} OPERRA</small></div>
      <FooterSignature />
    </div></footer>
    {qrCode && <aside className="lp-quick-open" aria-label="Quick office access"><Link to="/app" aria-label="Open office using the QR shortcut"><span>Open the<br />OPERRA office</span><img src={qrCode} width={90} height={90} alt="Scan to open this OPERRA office" /></Link></aside>}
  </main>
}
