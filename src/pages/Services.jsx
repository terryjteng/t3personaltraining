import { useState } from 'react'
import Seo from '../components/Seo'
import ServiceCard from '../components/ServiceCard'
import ServiceModal from '../components/ServiceModal'
import { locationServices, workoutStyles, nutritionServices, INTAKE_FORM_URL } from '../data/services'
import './Services.css'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'T3 Personal Training',
  url: 'https://t3personaltrainer.com',
  image: 'https://t3personaltrainer.com/T3_MainLogo.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90068',
    addressCountry: 'US',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Personal Training Services',
    itemListElement: [
      ...locationServices,
      ...workoutStyles,
      ...nutritionServices,
    ].map(s => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.detail },
    })),
  },
}

function ServiceSection({ heading, services, onOpen }) {
  return (
    <section className="svc-section" aria-labelledby={`${heading.replace(/\s/g,'-').toLowerCase()}-heading`}>
      <h2 id={`${heading.replace(/\s/g,'-').toLowerCase()}-heading`} className="svc-section-title">
        {heading}
      </h2>
      <div className="svc-card-row">
        {services.map((s, i) => (
          <ServiceCard key={s.id} service={s} onOpen={onOpen} delay={i * 80} />
        ))}
      </div>
    </section>
  )
}

export default function Services() {
  const [activeService, setActiveService] = useState(null)

  return (
    <div className="page">
      <Seo
        title="Training Services"
        description="T3 Personal Training services in Los Angeles: weightlifting, calisthenics, Muay Thai cardio, aerobic conditioning, nutrition coaching, and meal prep planning. Home, gym, park, or private studio sessions."
        keywords="personal training services Los Angeles, weightlifting coach LA, calisthenics trainer, Muay Thai cardio, nutrition coaching, meal prep, in-home personal trainer"
        canonical="/services"
        ogImage="https://t3personaltrainer.com/Weights_MainPage.jpeg"
        schema={schema}
      />

      {/* Hero */}
      <header className="svc-hero">
        <div className="svc-hero-content">
          <h1>Training Tailored to Your Strengths</h1>
          <p>
            Specializing in <strong>weightlifting</strong> for building strength and muscle,
            expert coaching in <strong>calisthenics</strong> for bodyweight mastery,
            <strong> aerobic conditioning</strong> for endurance, and{' '}
            <strong>Muay Thai</strong> for powerful, high-intensity cardio.
          </p>
        </div>
      </header>

      {/* Service sections */}
      <main className="svc-main">
        <ServiceSection heading="Where You Can Train"      services={locationServices}   onOpen={setActiveService} />
        <ServiceSection heading="Workout Styles"           services={workoutStyles}       onOpen={setActiveService} />
        <ServiceSection heading="Nutrition & Meal Planning" services={nutritionServices}   onOpen={setActiveService} />
      </main>

      {/* CTA */}
      <section className="svc-cta">
        <div className="svc-cta-inner">
          <h2>Ready to Start?</h2>
          <p>
            Book a free 30-minute consultation and I'll build a plan around your
            goals, schedule, and training style.
          </p>
          <a
            href={INTAKE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary svc-cta-btn"
          >
            Fill Out the Intake Form
          </a>
        </div>
      </section>

      {/* Modal */}
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </div>
  )
}
