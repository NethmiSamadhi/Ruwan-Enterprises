import { useEffect, useRef, useState } from 'react'
import './App.css'

const banners = [
  {
    video: '/videos/shopping-bags.mp4',
    label: 'WELCOME TO RUWAN ENTERPRISES',
    title: 'Everyday essentials.',
    accent: 'Extraordinary possibilities.',
    description:
      'Explore household finds for your kitchen, your home, and everyday life.',
  },
  {
    video: '/videos/online-shopping.mp4',
    label: 'DISCOVER YOUR NEXT FIND',
    title: 'Make room for',
    accent: 'something you love.',
    description:
      'Discover our collection ideas and speak with our team about availability.',
  },
  {
    video: '/videos/store-shopping.mp4',
    label: 'DELKANDA · NUGEGODA',
    title: 'Your local store.',
    accent: 'A world of little essentials.',
    description:
      'Visit Ruwan Enterprises in Delkanda to explore the available range.',
  },
]

const collections = [
  {
    id: 'kitchen',
    title: 'Kitchen & Dining',
    category: 'Kitchen',
    icon: '◒',
    color: 'terracotta',
    text: 'Essentials for preparing, serving, and sharing.',
    detail:
      'Looking for kitchen or dining items? Call our team to discuss the current range, prices, and availability.',
  },
  {
    id: 'household',
    title: 'Household Essentials',
    category: 'Home',
    icon: '⌂',
    color: 'olive',
    text: 'Practical finds for your everyday routines.',
    detail:
      'Explore household essentials in store. Our team can help you check whether a particular item is available.',
  },
  {
    id: 'storage',
    title: 'Storage & Organization',
    category: 'Storage',
    icon: '▤',
    color: 'purple',
    text: 'Bring a little order to your favourite spaces.',
    detail:
      'Ask us about storage and organization options. Confirm available sizes and products with the store before visiting.',
  },
]

const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=Ruwan+Enterprises+Delkanda+Nugegoda'
const facebookUrl = 'https://www.facebook.com/Ruwanenterprises/'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const requestedPlayback = useRef(false)
  const collectionTrigger = useRef<HTMLButtonElement | null>(null)

  const banner = banners[active]
  const selectedCollection = collections.find((item) => item.id === selected)
  const shown = collections.filter(
    (item) => filter === 'All' || item.category === filter,
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function applyMotionPreference() {
      if (motion.matches && !requestedPlayback.current) {
        video?.pause()
      } else {
        void video?.play().catch(() => {
          // A manual play control is available if autoplay is blocked.
        })
      }
    }

    applyMotionPreference()
    motion.addEventListener('change', applyMotionPreference)

    return () => {
      motion.removeEventListener('change', applyMotionPreference)
      video.pause()
    }
  }, [active])

  useEffect(() => {
    if (selected && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal()
    }
  }, [selected])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 801px)')

    function resizeMenu() {
      if (desktop.matches) setMenuOpen(false)
    }

    function escapeMenu(event: KeyboardEvent) {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuRef.current?.focus()
      }
    }

    desktop.addEventListener('change', resizeMenu)
    window.addEventListener('keydown', escapeMenu)

    return () => {
      desktop.removeEventListener('change', resizeMenu)
      window.removeEventListener('keydown', escapeMenu)
    }
  }, [menuOpen])

  function chooseBanner(index: number) {
    requestedPlayback.current = true

    if (index === active) {
      const video = videoRef.current
      if (!video) return
      video.currentTime = 0
      void video.play().catch(() => setPlaying(false))
      return
    }

    setPlaying(false)
    setVideoFailed(false)
    setActive(index)
  }

  function toggleVideo() {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      requestedPlayback.current = true
      void video.play().catch(() => setPlaying(false))
    } else {
      video.pause()
    }
  }

  function closeCollection() {
    dialogRef.current?.close()
  }

  function restoreCollectionFocus() {
    setSelected(null)
    collectionTrigger.current?.focus()
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="announcement">
        <div className="container announcement-inner">
          <span>Household essentials · Delkanda, Nugegoda</span>
          <a href="tel:+94112801246">011 280 1246 ↗</a>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a
            className="logo"
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/ruwan-logo.png"
              alt="Ruwan and Enterprises"
              width="140"
              height="76"
            />
          </a>

          <button
            ref={menuRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close ✕' : 'Menu ☰'}
          </button>

          <nav
            id="navigation"
            className={`navigation ${menuOpen ? 'open' : ''}`}
            aria-label="Main navigation"
          >
            {[
              ['Home', '#home'],
              ['Collections', '#collections'],
              ['Our story', '#story'],
              ['Visit us', '#visit'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          <a className="button button-yellow header-button" href="#visit">
            Find our store ↗
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <video
            key={banner.video}
            ref={videoRef}
            className="hero-video"
            src={banner.video}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => {
              setVideoFailed(true)
              setPlaying(false)
            }}
          />

          <div className="hero-shade" />

          <div className="container hero-content">
            <p className="eyebrow">{banner.label}</p>
            <h1 id="hero-title">
              {banner.title}
              <span>{banner.accent}</span>
            </h1>
            <p className="hero-description">{banner.description}</p>

            <div className="hero-actions">
              <a className="button button-yellow" href="#collections">
                Explore collections ↗
              </a>
              <a className="underlined-link" href="#visit">
                Plan your visit →
              </a>
            </div>

            <p className="hero-address">NO. 527 · DELKANDA · NUGEGODA</p>
          </div>

          <div className="container hero-controls">
            <div className="banner-tabs" aria-label="Choose video banner">
              {banners.map((item, index) => (
                <button
                  type="button"
                  key={item.video}
                  aria-label={`Play banner ${index + 1}: ${item.label}`}
                  aria-pressed={active === index}
                  className={active === index ? 'active' : ''}
                  onClick={() => chooseBanner(index)}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="playback"
              onClick={toggleVideo}
              disabled={videoFailed}
            >
              {videoFailed
                ? 'Video unavailable'
                : playing
                  ? 'Pause video'
                  : 'Play video'}
            </button>
          </div>
        </section>

        <div className="benefits">
          <div className="container benefits-grid">
            <div><span aria-hidden="true">⌂</span><p>For your everyday home</p></div>
            <div><span aria-hidden="true">↗</span><p>Discover in our store</p></div>
            <div><span aria-hidden="true">◎</span><p>Call for availability</p></div>
          </div>
        </div>

        <section className="section" id="collections">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">EXPLORE RUWAN</p>
                <h2>Little things.<br /><em>Endless possibilities.</em></h2>
              </div>
              <p>
                Browse collection ideas, then contact our team
                for the current product range and prices.
              </p>
            </div>

            <div className="filters" aria-label="Collection filters">
              {['All', 'Kitchen', 'Home', 'Storage'].map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={filter === item}
                  className={filter === item ? 'active' : ''}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="sr-only" role="status">
              {shown.length} collections displayed
            </p>

            <div className="collection-grid">
              {shown.map((item) => (
                <article className="collection-card" key={item.id}>
                  <div className={`collection-art ${item.color}`}>
                    <span className="art-label">THE EVERYDAY COLLECTION</span>
                    <span className="art-symbol" aria-hidden="true">{item.icon}</span>
                    <span className="art-caption">RUWAN ENTERPRISES</span>
                  </div>
                  <div className="collection-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <button
                      className="collection-button"
                      type="button"
                      aria-haspopup="dialog"
                      onClick={(event) => {
                        collectionTrigger.current = event.currentTarget
                        setSelected(item.id)
                      }}
                    >
                      Explore collection <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="story section" id="story">
          <div className="container story-grid">
            <div className="story-art">
              <span className="eyebrow">YOUR LOCAL HOUSEHOLD STORE</span>
              <img
                src="/ruwan-logo.png"
                alt="Ruwan and Enterprises"
                width="280"
                height="280"
                loading="lazy"
              />
              <span className="story-caption">DELKANDA · NUGEGODA</span>
            </div>

            <div className="story-copy">
              <p className="eyebrow">OUR STORY</p>
              <h2>A place for<br /><em>everyday discoveries.</em></h2>
              <p>
                Ruwan Enterprises is a household goods store in
                Delkanda, Nugegoda. We invite you to explore practical
                finds for your kitchen, home, and everyday routines.
              </p>
              <p>
                Have a particular item in mind? Speak with our team
                to check availability before visiting.
              </p>
              <a className="button button-navy" href="#visit">
                Come visit us ↗
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="visit">
          <div className="container">
            <div className="visit-panel">
              <div>
                <p className="eyebrow">LET’S MAKE IT A VISIT</p>
                <h2>Your next find<br /><em>could be here.</em></h2>
                <p>Explore in person or call us about a specific item.</p>
                <a
                  className="button button-yellow"
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions ↗
                </a>
              </div>

              <div className="visit-information">
                <p className="eyebrow">STORE LOCATION</p>
                <address>
                  <strong>Ruwan Enterprises — Delkanda</strong>
                  No. 527, Avissawella Road<br />
                  Delkanda, Nugegoda, Sri Lanka
                </address>
                <div className="divider" />
                <p className="eyebrow">CONTACT OUR TEAM</p>
                <a className="phone" href="tel:+94112801246">
                  011 280 1246
                </a>
                <p className="visit-note">Call to confirm opening hours.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img
              src="/ruwan-logo.png"
              alt="Ruwan and Enterprises"
              width="170"
              height="130"
              loading="lazy"
            />
            <p>Everyday essentials.<br />A home full of possibilities.</p>
          </div>

          <div>
            <h2>Our collection</h2>
            <ul>
              {collections.map((item) => (
                <li key={item.id}>
                  <a
                    href="#collections"
                    onClick={() => setFilter(item.category)}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Discover Ruwan</h2>
            <ul>
              <li><a href="#story">Our story</a></li>
              <li><a href="#visit">Visit our store</a></li>
              <li>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                  Facebook ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2>Get in touch</h2>
            <address>No. 527, Avissawella Road<br />Delkanda, Nugegoda</address>
            <a className="footer-phone" href="tel:+94112801246">
              011 280 1246
            </a>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              Get directions ↗
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© {new Date().getFullYear()} Ruwan Enterprises. All rights reserved.</p>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>

      <dialog
        ref={dialogRef}
        className="collection-dialog"
        aria-labelledby="dialog-title"
        onClose={restoreCollectionFocus}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return
          const bounds = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            closeCollection()
          }
        }}
      >
        <button
          type="button"
          className="dialog-close"
          aria-label="Close collection"
          onClick={closeCollection}
        >
          ✕
        </button>
        <p className="eyebrow">EXPLORE RUWAN</p>
        <h2 id="dialog-title">{selectedCollection?.title}</h2>
        <p className="dialog-description">{selectedCollection?.detail}</p>
        <div className="dialog-actions">
          <a className="button button-navy" href="tel:+94112801246">
            Call the store ↗
          </a>
          <a
            className="button button-light"
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions ↗
          </a>
        </div>
      </dialog>
    </>
  )
}