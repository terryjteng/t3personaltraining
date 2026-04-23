import Seo from '../components/Seo'
import { INTAKE_FORM_URL } from '../data/services'
import './NewClient.css'

const steps = [
  {
    num: 1,
    title: 'Fill Out the Intake Form',
    body: 'Tell me about your goals, schedule, fitness history, and any limitations. Takes about 5 minutes.',
    icon: 'fa-solid fa-clipboard-list',
  },
  {
    num: 2,
    title: 'Review & Sign the Waiver',
    body: 'Read through the T3 client agreement and liability waiver before your first session.',
    icon: 'fa-solid fa-file-signature',
  },
  {
    num: 3,
    title: 'Book Your Free Consultation',
    body: "We'll review your goals together and I'll recommend the right training plan for you.",
    icon: 'fa-solid fa-calendar-check',
  },
]

const faqs = [
  {
    q: 'Where do sessions take place?',
    a: 'At your home, a park, your gym, or my private studio — whichever fits your schedule and comfort.',
  },
  {
    q: 'Do I need equipment?',
    a: 'No. I build programs around what you have. Bodyweight-only programs are completely viable.',
  },
  {
    q: 'How long is a typical session?',
    a: 'Sessions run 45–60 minutes. The free consultation is 30 minutes and has no obligation.',
  },
  {
    q: 'Can you work with beginners?',
    a: 'Absolutely. I work with all fitness levels — from first-timers to experienced lifters.',
  },
]

export default function NewClient() {
  return (
    <div className="page">
      <Seo
        title="New Client Portal"
        description="New client onboarding for T3 Personal Training. Start your personalized fitness journey with a consultation, movement screening, and waiver sign-off."
        canonical="/new-client"
      />

      {/* Hero */}
      <header className="nc-hero">
        <div className="nc-hero-content">
          <h1>Welcome, New Client</h1>
          <p>Three quick steps and you're ready to train. Let's get started.</p>
        </div>
      </header>

      {/* Steps */}
      <section className="nc-steps wrap" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="section-title">Getting Started</h2>
        <p className="lead">
          Every client begins with a personalized consultation and movement screening.
          I'll tailor your program to your goals — whether that's building muscle,
          improving mobility, boosting cardio endurance, or all three.
        </p>

        <div className="steps-grid">
          {steps.map(step => (
            <div key={step.num} className="step-card">
              <div className="step-icon" aria-hidden="true">
                <i className={step.icon} />
              </div>
              <div className="step-num" aria-label={`Step ${step.num}`}>{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="nc-ctas">
          <a
            href={INTAKE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Fill Out the Intake Form
          </a>
          <a
            href="/T3_Waiver.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View &amp; Download Waiver (PDF)
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="nc-faq" aria-labelledby="faq-heading">
        <div className="wrap">
          <h2 id="faq-heading" className="section-title">Common Questions</h2>
          <div className="faq-grid">
            {faqs.map((item, i) => (
              <div key={i} className="faq-card">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
