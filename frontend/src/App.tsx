import { useState } from 'react'
import './App.css'

const categories = [
  {
    number: '01',
    name: 'Kitchen & Dining',
    description: 'Everyday essentials for cooking, serving, and sharing.',
  },
  {
    number: '02',
    name: 'Home Essentials',
    description: 'Practical additions for a comfortable home.',
  },
  {
    number: '03',
    name: 'Storage & Organization',
    description: 'Make more room for the things that matter.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="announcement">
        Your everyday household store in Delkanda
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">R.</span>
            <span>
              <strong>RUWAN</strong>
              <small>ENTERPRISES</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close menu' : 'Menu'}
          </button>

          <nav
            id="main-navigation"
            className={`navigation ${menuOpen ? 'is-open' : ''}`}
            aria-label="Main navigation"
          >
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#categories" onClick={closeMenu}>Categories</a>
            <a href="#about" onClick={closeMenu}>Our store</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          <a className="header-phone" href="tel:+94112801246">
            011 280 1246
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">RUWAN ENTERPRISES · DELKANDA</p>

              <h1 id="hero-title">
                Everyday essentials.
                <span>A home you love.</span>
              </h1>

              <p className="hero-description">
                Discover practical household goods for your kitchen,
                living spaces, and everyday routines. Visit our store
                in Delkanda to explore the collection.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#categories">
                  Explore categories <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href="#contact">
                  Visit our store <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="hero-note">
                <span className="note-dot" aria-hidden="true" />
                Find us at No. 527, High Level Road
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="art-circle" />
              <div className="art-vase">
                <div className="vase-neck" />
                <div className="vase-body" />
              </div>
              <div className="art-bowl" />
              <div className="art-box">
                <span />
                <span />
                <span />
              </div>
              <div className="art-caption">
                <span>HOME, SIMPLY.</span>
                <small>Made for everyday living</small>
              </div>
              <span className="art-label">The everyday collection</span>
            </div>
          </div>
        </section>

        <section
          className="categories-section section"
          id="categories"
          aria-labelledby="categories-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">EXPLORE YOUR HOME</p>
                <h2 id="categories-title">A place for every essential.</h2>
              </div>
              <p>
                A preview of how we’ll organize the collection.
                Contact the store for current availability.
              </p>
            </div>

            <div className="category-grid">
              {categories.map((category) => (
                <article className="category-card" key={category.number}>
                  <span className="category-number">{category.number}</span>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <a href="#contact">
                    Ask the store
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section" id="about">
          <div className="container about-layout">
            <p className="eyebrow">YOUR LOCAL HOUSEHOLD STORE</p>
            <div>
              <h2>Small details. Better everyday living.</h2>
              <p>
                Ruwan Enterprises is a household goods store in Delkanda,
                Nugegoda. Explore the store, ask our team about products,
                and find useful essentials for your home.
              </p>
            </div>
          </div>
        </section>

        <section
          className="contact-section section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="container contact-layout">
            <div>
              <p className="eyebrow">COME SAY HELLO</p>
              <h2 id="contact-title">Visit Ruwan Enterprises.</h2>
              <p>
                Looking for a particular item? Call us to check
                availability before your visit.
              </p>
            </div>

            <div className="contact-card">
              <address>
                <strong>Ruwan Enterprises — Delkanda</strong>
                <span>No. 527, High Level Road</span>
                <span>Delkanda, Nugegoda, Sri Lanka</span>
              </address>

              <a className="contact-phone" href="tel:+94112801246">
                011 280 1246
              </a>

              <div className="contact-links">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ruwan+Enterprises+Delkanda+Nugegoda"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions ↗
                </a>
                <a
                  href="https://www.facebook.com/Ruwanenterprises/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <strong>RUWAN ENTERPRISES</strong>
          <p>© {new Date().getFullYear()} Ruwan Enterprises.</p>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}

export default App