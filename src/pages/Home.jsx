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

  /* Sticky CTA */
  useEffect(() => {
    function onScroll() { setShowSticky(window.scrollY > 260) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Toast */
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

  const allHomeServices = [...locationServices.slice(0, 2), ...workoutStyles.slice(0, 4)]

  return (
    <div className="page">
      <Seo
        description="T3 Personal Training in Los Angeles offers personal training, nutrition coaching, Muay Thai-inspired cardio, and meal prep planning to help you achieve real results."
        keywords="personal trainer Los Angeles, fitness coach LA, custom workouts, strength training, Muay Thai cardio, nutrition coaching, meal prep"
        canonical="/"
        schema={schema}
      />

      {/* Disclosure */}
      <div className="disclosure" role="status" aria-live="polite">
        <strong>Now accepting new clients</strong> — Book a free 30-minute consultation to get started.
      </div>

      {/* Hero */}
      <header id="top" className="home-hero">
        <div className="hero-content">
          <h1>Strength. Consistency. Real-World Results.</h1>
          <p>
            Personal training in Los Angeles with programs for weightlifting,
            calisthenics, aerobic conditioning, and Muay Thai-inspired cardio.
            Nutrition guidance, weekly meal-prep planning, and massage therapy
            (coming soon).
          </p>
          <a className="btn btn-primary hero-cta" href="#contact">Book a Free Consult</a>
          <ul className="hero-pills" aria-label="Services offered">
            <li>Personal Training</li>
            <li>Kickboxing / Muay Thai</li>
            <li>Meal-Prep Planning</li>
            <li>Massage (coming soon)</li>
          </ul>
        </div>
      </header>

      {/* Microproof */}
      <div className="microproof" aria-label="Quick facts">
        <span>LA-based</span>
        <span>Home Workouts</span>
        <span>Private Gym</span>
        <span>Flexible Scheduling</span>
      </div>

      {/* Services */}
      <section id="services" className="wrap">
        <h2 className="section-title">What I Offer</h2>
        <p className="lead">
          Flexible sessions at home, outdoors, or your preferred gym — plus
          guidance that makes staying consistent easier.
        </p>

        <div className="home-collage" aria-hidden="true">
          <picture>
            <source srcSet="/pose.avif" type="image/avif" />
            <img src="/Pose_MainPage.jpg" alt="" loading="lazy" />
          </picture>
          <picture>
            <source srcSet="/muaythai.avif" type="image/avif" />
            <img src="/MT_MainPage - Edited - Edited.jpg" alt="" loading="lazy" />
          </picture>
          <picture>
            <source srcSet="/weights.avif" type="image/avif" />
            <img src="/Weights_MainPage - Edited - Edited - Edited.jpg" alt="" loading="lazy" />
          </picture>
        </div>

        <div className="grid" style={{ marginTop: '1.25rem' }}>
          {[
            { title: 'Personal Training', body: <>Customized programs around your goals, schedule, and space. Options for <strong>home workouts</strong>, <strong>park sessions</strong>, or <strong>your gym</strong>.</> },
            { title: <>Nutrition Coaching <span className="muted">(cert in progress)</span></>, body: 'Evidence-informed guidance to support energy, performance, and recovery — built for real life, not restrictions.' },
            { title: 'Meal-Prep Planning', body: 'Weekly meals made around your favorite foods and your workout goals — simple, goal-aligned, and sustainable.' },
            { title: 'Muay Thai / Kickboxing Conditioning', body: 'High-intensity, striking-based cardio and technique for a fun way to get leaner and build coordination.' },
            { title: <>Massage Therapy <span className="muted">(coming soon)</span></>, body: 'Relaxation and recovery-focused massage sessions to reduce soreness, improve circulation, and support training results.' },
            { title: <>Private Studio <span className="muted">(available)</span></>, body: 'A distraction-free space now available for training sessions — being upgraded with new equipment and amenities.' },
          ].map((item, i) => (
            <RevealCard key={i} className="card span-4" delay={i * 60}>
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
      <section id="about" className="wrap home-about-section">
        <h2 className="section-title">About T3</h2>
        <div className="home-about">
          <div className="home-about-text">
            <p className="lead">
              Hi, I'm Terry — a lifelong fitness nerd turned coach. I study
              training, nutrition, and recovery through trusted coaches, medical
              researchers, and clinical studies so your plan is smart, safe, and
              effective.
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
              <source srcSet="/trainer.avif" type="image/avif" />
              <img
                src="/MainPage_Edited.png"
                alt="Terry Teng, T3 Personal Training coach"
                loading="lazy"
                width="420"
                height="420"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="wrap contact-section">
        <h2 className="section-title">Start With a Free 30-Minute Consult</h2>
        <p className="lead">
          Tell me about your goals and schedule. I'll recommend a plan and next steps.
        </p>

        <a
          href={INTAKE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-fat contact-btn"
        >
          Fill Out the Intake Form
        </a>

        <div className="contact-actions">
          <a href={`mailto:${CONTACT_EMAIL}`} className="contact-chip">
            ✉️ Email Terry
          </a>
          <button type="button" className="contact-chip" onClick={copyEmail}>
            Copy Email
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

      {/* Modal */}
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </div>
  )
}
