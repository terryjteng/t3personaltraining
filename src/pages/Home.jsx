import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import ServiceCard from '../components/ServiceCard'
import ServiceModal from '../components/ServiceModal'
import { useReveal } from '../hooks/useReveal'
import { locationServices, workoutStyles, nutritionServices, CONTACT_EMAIL, INTAKE_FORM_URL } from '../data/services'
import './Home.css'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'T3 Personal Training',
  image: 'https://t3personaltrainer.com/T3_MainLogo.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90068',
    addressCountry: 'US',
  },
  url: 'https://t3personaltrainer.com',
  priceRange: '$$',
  description:
    'Personal training, fitness coaching, nutrition guidance, Muay Thai cardio, and meal prep services in Los Angeles.',
}

const proofItems = [
  { icon: 'fa-solid fa-location-dot', text: 'Los Angeles, CA' },
  { icon: 'fa-solid fa-house',         text: 'Home Workouts' },
  { icon: 'fa-solid fa-dumbbell',      text: 'Private Gym' },
  { icon: 'fa-solid fa-calendar-check',text: 'Flexible Schedule' },
  { icon: 'fa-solid fa-users',         text: 'All Fitness Levels' },
]

const homeCards = [
  { icon: 'fa-solid fa-dumbbell',    title: 'Personal Training',
    body: <>Customized programs around your goals, schedule, and space. Options for <strong>home workouts</strong>, <strong>park sessions</strong>, or <strong>your gym</strong>.</> },
  { icon: 'fa-solid fa-apple-whole', title: <>Nutrition Coaching <span className="muted">(cert in progress)</span></>,
    body: 'Evidence-informed guidance to support energy, performance, and recovery — built for real life, not restrictions.' },
  { icon: 'fa-solid fa-bowl-food',   title: 'Meal-Prep Planning',
    body: 'Weekly meals made around your favorite foods and your workout goals — simple, goal-aligned, and sustainable.' },
  { icon: 'fa-solid fa-hand-fist',   title: 'Muay Thai / Kickboxing',
    body: 'High-intensity, striking-based cardio and technique — a fun way to get leaner and build coordination.' },
  { icon: 'fa-solid fa-spa',         title: 'Massage Therapy',
    body: 'Relaxation and recovery-focused massage to reduce soreness, improve circulation, and support your training.' },
  { icon: 'fa-solid fa-lock',        title: <>Private Studio <span className="muted">(available)</span></>,
    body: 'A distraction-free space now available for sessions — being upgraded with new equipment and amenities.' },
]

function RevealCard({ children, className, delay = 0 }) {
  const [ref, revealed] = useReveal()
  return (
    <article
      ref={ref}
      className={[className, 'reveal', revealed && 'revealed'].filter(Boolean).join(' ')}
      style={{ transitionDelay: revealed ? `${delay}ms` : '0ms' }}
    >
      {children}
    </article>
  )
}

export default function Home() {
  const [activeService, setActiveService] = useState(null)
  const [showSticky, setShowSticky] = useState(false)
  const [toast, setToast] = useState({ msg: '', visible: false })

  useEffect(() => {
    function onScroll() { setShowSticky(window.scrollY > 260) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function showToast(msg) {
    setToast({ msg, visible: true })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 1800)
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      showToast('Email copied!')
    } catch {
      showToast(CONTACT_EMAIL)
    }
  }

  return (
    <div className="page">
      <Seo
        description="T3 Personal Training in Los Angeles offers personal training, nutrition coaching, Muay Thai-inspired cardio, and meal prep planning to help you achieve real results."
        keywords="personal trainer Los Angeles, fitness coach LA, custom workouts, strength training, Muay Thai cardio, nutrition coaching, meal prep"
        canonical="/"
        schema={schema}
      />

      {/* Announcement bar */}
      <div className="disclosure" role="status" aria-live="polite">
        <i className="fa-solid fa-circle-check disc-icon" aria-hidden="true" />
        <strong>Now accepting new clients</strong> — Book a free 30-minute consultation to get started.
      </div>

      {/* Hero — split layout */}
      <header id="top" className="home-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-eyebrow">Personal Training · Los Angeles</span>
            <h1>Strength.<br />Consistency.<br />Real Results.</h1>
            <p>
              Programs for weightlifting, calisthenics, aerobic conditioning,
              and Muay Thai-inspired cardio. Nutrition guidance and weekly
              meal-prep planning included.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">Book a Free Consult</a>
              <Link to="/services" className="btn btn-outline-light">Explore Services</Link>
            </div>
            <ul className="hero-pills" aria-label="Services offered">
              <li>Personal Training</li>
              <li>Kickboxing / Muay Thai</li>
              <li>Meal-Prep Planning</li>
              <li>Massage Therapy</li>
            </ul>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <picture>
              <source srcSet="/trainer.avif" type="image/avif" />
              <img src="/MainPage_Edited.png" alt="" />
            </picture>
          </div>
        </div>
      </header>

      {/* Microproof */}
      <div className="microproof" aria-label="Quick facts">
        {proofItems.map((item, i) => (
          <div key={i} className="proof-item">
            <i className={item.icon} aria-hidden="true" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Services */}
      <section id="services" className="wrap">
        <span className="section-eyebrow">What I Offer</span>
        <h2 className="section-title">Flexible Programs for Every Goal</h2>
        <p className="lead">
          Sessions at home, outdoors, or your preferred gym — plus guidance
          that makes staying consistent easier.
        </p>

        <div className="grid" style={{ marginTop: '1.5rem' }}>
          {homeCards.map((item, i) => (
            <RevealCard key={i} className="card span-4" delay={i * 60}>
              <div className="card-icon"><i className={item.icon} aria-hidden="true" /></div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </RevealCard>
          ))}
        </div>

        <div className="services-link-row">
          <Link to="/services" className="btn btn-outline">View All Services →</Link>
        </div>
      </section>

      {/* About */}
      <section id="about" className="home-about-section">
        <div className="wrap">
          <div className="home-about">
            <div className="home-about-text">
              <span className="section-eyebrow">About T3</span>
              <h2 className="section-title">Hi, I'm Terry</h2>
              <p className="lead">
                A lifelong fitness nerd turned coach. I study training, nutrition,
                and recovery through trusted coaches, medical researchers, and
                clinical studies so your plan is smart, safe, and effective.
              </p>
              <p>
                I work with 9-to-5ers, weekend warriors, and everyday athletes.
                We'll choose the training style that fits you best — from classic
                lifting and calisthenics to aerobic work and Muay Thai-inspired
                conditioning.
              </p>
              <p className="note">
                * For combat-specific goals, I can refer you to trusted specialists
                in my network.
              </p>
              <Link to="/about" className="btn btn-outline about-link">Meet Terry →</Link>
            </div>
            <div className="home-about-img">
              <picture>
                <source srcSet="/trainer2.avif" type="image/avif" />
                <img
                  src="/IMG_3824 - Edited.jpg"
                  alt="Terry Teng, T3 Personal Training coach"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>
            Start Today
          </span>
          <h2>Ready to Begin?</h2>
          <p>30 minutes. No obligation. Just a conversation about your goals and how to reach them.</p>
          <div className="contact-cta-group">
            <a
              href={INTAKE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Fill Out the Intake Form
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-outline-light">
              <i className="fa-regular fa-envelope" aria-hidden="true" /> Email Terry
            </a>
          </div>
          <button type="button" className="contact-copy" onClick={copyEmail}>
            <i className="fa-regular fa-copy" aria-hidden="true" /> Copy email address
          </button>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <a
        href="#contact"
        className={['sticky-cta', showSticky && 'show'].filter(Boolean).join(' ')}
        aria-label="Book free consultation"
      >
        Book Free Consult
      </a>

      {/* Toast */}
      <div className={['toast', toast.visible && 'show'].filter(Boolean).join(' ')} role="status" aria-live="polite">
        {toast.msg}
      </div>

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </div>
  )
}
