import { useEffect, useRef, useState } from 'react'
import './App.css'

const slides = [
  {
    src: '/videos/shopping-bags.mp4',
    label: 'EVERYDAY FINDS',
    title: 'Little essentials.',
    accent: 'Lovely everyday living.',
    description:
      'Discover useful additions for your home, your kitchen, and the moments in between.',
  },
  {
    src: '/videos/online-shopping.mp4',
    label: 'EXPLORE THE COLLECTION',
    title: 'A little inspiration.',
    accent: 'A home full of possibilities.',
    description:
      'Explore our collection ideas and contact our team to find what you need.',
  },
  {
    src: '/videos/store-shopping.mp4',
    label: 'VISIT US IN DELKANDA',
    title: 'Your local store.',
    accent: 'Your next favourite find.',
    description:
      'Visit Ruwan Enterprises on High Level Road, Delkanda, and explore in person.',
  },
]

const collections = [
  {
    id: 'kitchen',
    group: 'Kitchen',
    title: 'Kitchen & Dining',
    text: 'For cooking, serving, and gathering around the table.',
    symbol: '◒',
    color: 'peach',
  },
  {
    id: 'home',
    group: 'Home',
    title: 'Home Essentials',
    text: 'Useful details that make everyday routines feel easier.',
    symbol: '⌂',
    color: 'sage',
  },
  {
    id: 'storage',
    group: 'Organization',
    title: 'Storage & Organization',
    text: 'A place for everything, with room for a little more.',
    symbol: '▤',
    color: 'lavender',
  },
]

const filters = ['All', 'Kitchen', 'Home', 'Organization']

const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=Ruwan+Enterprises+Delkanda+Nugegoda'

const facebookUrl = 'https://www.facebook.com/Ruwanenterprises/'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [videoUnavailable, setVideoUnavailable] = useState(false)
  const [filter, setFilter] = useState('All')
  const videoRef = useRef<HTMLVideoElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const slide = slides[activeSlide]
  const visibleCollections = collections.filter(
    (collection) => filter === 'All' || collection.group === filter,
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')

    function applyPreference() {
      if (preference.matches) {
        video?.pause()
      } else {
        void video?.play().catch(() => {
          // Manual playback remains available when autoplay is blocked.
        })
      }
    }

    applyPreference()
    preference.addEventListener('change', applyPreference)

    return () => {
      preference.removeEventListener('change', applyPreference)
      video.pause()
    }
  }, [activeSlide])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    const desktop = window.matchMedia('(min-width: 801px)')

    function closeOnDesktop() {
      if (desktop.matches) setMenuOpen(false)
    }

    window.addEventListener('keydown', handleEscape)
    desktop.addEventListener('change', closeOnDesktop)

    return () => {
      window.removeEventListener('keydown', handleEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  function selectSlide(index: number) {
    if (index === activeSlide) return
    setPlaying(false)
    setVideoUnavailable(false)
    setActiveSlide(index)
  }

  function togglePlayback() {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      void video.play().catch(() => setPlaying(false))
    } else {
      video.pause()
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="topbar">
        <div className="container topbar-inner">
          <span>Everyday essentials. Thoughtfully explored.</span>
          <a href="tel:+94112801246">Call our store: 011 280 1246</a>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a className="logo-link" href="#home" onClick={closeMenu}>
            <img
              src="/ruwan-logo.png"
              alt="Ruwan and Enterprises"
              width="150"
              height="84"
            />
          </a>

          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close ✕' : 'Menu ☰'}
          </button>

          <nav
            id="primary-navigation"
            className={`nav ${menuOpen ? 'nav-open' : ''}`}
            aria-label="Main navigation"
          >
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#collections" onClick={closeMenu}>Collections</a>
            <a href="#story" onClick={closeMenu}>Our story</a>
            <a href="#visit" onClick={closeMenu}>Visit us</a>
          </nav>

          <a className="header-cta" href="#visit">
            Find our store <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <video
            key={slide.src}
            ref={videoRef}
            className="hero-video"
            src={slide.src}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => {
              setPlaying(false)
              setVideoUnavailable(true)
            }}
          />

          <div className="hero-overlay" />

          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span aria-hidden="true" /> {slide.label}
              </p>

              <h1 id="hero-title">
                {slide.title}
                <span>{slide.accent}</span>
              </h1>

              <p className="hero-description">{slide.description}</p>

              <div className="hero-actions">
                <a className="button button-yellow" href="#collections">
                  Explore collections <span aria-hidden="true">↗</span>
                </a>
                <a className="hero-secondary" href="#visit">
                  Visit our store <span aria-hidden="true">→</span>
                </a>
              </div>

              <p className="hero-location">
                DELKANDA, NUGEGODA · NO. 527, HIGH LEVEL ROAD
              </p>
            </div>
          </div>

          <div className="container hero-controls">
            <div className="slide-buttons" aria-label="Select banner">
              {slides.map((item, index) => (
                <button
                  type="button"
                  key={item.src}
                  className={index === activeSlide ? 'slide-active' : ''}
                  aria-label={`Banner ${index + 1}: ${item.label}`}
                  aria-pressed={index === activeSlide}
                  onClick={() => selectSlide(index)}
                >
                  {String(index + 1).padStart(2, '0')}
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>

            <button
              type="button"
              className="playback-button"
              onClick={togglePlayback}
              disabled={videoUnavailable}
            >
              {videoUnavailable
                ? 'Video unavailable'
                : playing
                  ? 'Pause video'
                  : 'Play video'}
            </button>
          </div>
        </section>

        <section className="intro-strip" aria-label="Store highlights">
          <div className="container intro-grid">
            <div>
              <span className="intro-icon" aria-hidden="true">⌂</span>
              <p><strong>For everyday living</strong><span>Household essentials</span></p>
            </div>
            <div>
              <span className="intro-icon" aria-hidden="true">↗</span>
              <p><strong>Explore in person</strong><span>Visit our Delkanda store</span></p>
            </div>
            <div>
              <span className="intro-icon" aria-hidden="true">◎</span>
              <p><strong>Talk to our team</strong><span>Call for product availability</span></p>
            </div>
          </div>
        </section>

        <section className="section collections" id="collections">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">THE EVERYDAY COLLECTION</p>
                <h2>Find your kind of essential.</h2>
              </div>
              <p className="section-description">
                Explore our suggested collection groups.
                Call the store to confirm the current range.
              </p>
            </div>

            <div className="filters" aria-label="Filter collections">
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={filter === item ? 'filter-active' : ''}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="sr-only" role="status">
              {visibleCollections.length} collections shown
            </p>

            <div className="collection-grid">
              {visibleCollections.map((collection) => (
                <article className="collection-card" key={collection.id}>
                  <div className={`collection-art ${collection.color}`}>
                    <span className="collection-art-label">RUWAN COLLECTION</span>
                    <span className="collection-symbol" aria-hidden="true">
                      {collection.symbol}
                    </span>
                    <span className="collection-art-caption">
                      Simple things. Everyday possibilities.
                    </span>
                  </div>

                  <div className="collection-content">
                    <h3>{collection.title}</h3>
                    <p>{collection.text}</p>
                    <a href="#visit">
                      Ask about this collection <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="story section" id="story">
          <div className="container story-grid">
            <div className="story-visual">
              <span className="story-visual-label">YOUR LOCAL HOUSEHOLD STORE</span>
              <div className="story-logo">
                <img
                  src="/ruwan-logo.png"
                  alt="Ruwan and Enterprises"
                  width="270"
                  height="270"
                  loading="lazy"
                />
              </div>
              <span className="story-visual-bottom">DELKANDA · NUGEGODA</span>
            </div>

            <div className="story-copy">
              <p className="eyebrow">A LITTLE ABOUT RUWAN</p>
              <h2>Everyday living starts with the little things.</h2>
              <p>
                A useful kitchen addition. A tidier corner. Something
                practical for the family. Small details can make a
                difference to the way you enjoy your home.
              </p>
              <p>
                Ruwan Enterprises is a household goods store in Delkanda,
                Nugegoda. Visit us to explore the available range and
                speak with our team about what you need.
              </p>
              <a className="button button-navy" href="#visit">
                Plan your visit <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="visit section" id="visit">
          <div className="container">
            <div className="visit-card">
              <div className="visit-copy">
                <p className="eyebrow">WE’D LOVE TO SEE YOU</p>
                <h2>Your next find is a visit away.</h2>
                <p>
                  Looking for something specific? Call us to check
                  availability before coming to the store.
                </p>
                <a
                  className="button button-yellow"
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="visit-details">
                <span className="detail-label">FIND US</span>
                <address>
                  <strong>Ruwan Enterprises</strong>
                  No. 527, High Level Road<br />
                  Delkanda, Nugegoda<br />
                  Sri Lanka
                </address>

                <div className="visit-divider" />

                <span className="detail-label">CALL OUR STORE</span>
                <a className="visit-phone" href="tel:+94112801246">
                  011 280 1246
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#home">
              <img
                src="/ruwan-logo.png"
                alt="Ruwan and Enterprises homepage"
                width="180"
                height="140"
                loading="lazy"
              />
            </a>
            <p>Little essentials.<br />Better everyday living.</p>
          </div>

          <div className="footer-column">
            <h2>Our collection</h2>
            <ul>
              {collections.map((collection) => (
                <li key={collection.id}>
                  <a
                    href="#collections"
                    onClick={() => setFilter(collection.group)}
                  >
                    {collection.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
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

          <div className="footer-column">
            <h2>Get in touch</h2>
            <address>
              No. 527, High Level Road<br />
              Delkanda, Nugegoda
            </address>
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
    </>
  )
}

export default App