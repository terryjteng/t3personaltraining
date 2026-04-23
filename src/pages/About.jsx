import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import Seo from '../components/Seo'
import './About.css'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Terry Teng',
  jobTitle: 'Certified Personal Trainer',
  description:
    'Certified personal trainer with 20+ years of fitness experience specializing in weightlifting, calisthenics, Muay Thai cardio, and nutrition coaching in Los Angeles.',
  url: 'https://t3personaltrainer.com/about',
  image: 'https://t3personaltrainer.com/MainPage_Edited.png',
  worksFor: {
    '@type': 'LocalBusiness',
    name: 'T3 Personal Training',
    url: 'https://t3personaltrainer.com',
  },
  knowsAbout: ['Personal Training', 'Weightlifting', 'Calisthenics', 'Muay Thai', 'Nutrition Coaching'],
}

const keywords = ['fitness', 'nutrition', 'research', 'Muay Thai', 'calisthenics', 'weightlifting']

function HighlightText({ text }) {
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        keywords.some(k => k.toLowerCase() === part.toLowerCase())
          ? <mark key={i} className="kw-highlight">{part}</mark>
          : part
      )}
    </>
  )
}

function BioParagraph({ text, delay }) {
  const [ref, revealed] = useReveal()
  return (
    <p
      ref={ref}
      className={['bio-p', revealed && 'revealed'].filter(Boolean).join(' ')}
      style={{ transitionDelay: revealed ? `${delay}ms` : '0ms' }}
    >
      <HighlightText text={text} />
    </p>
  )
}

const bioParagraphs = [
  "I'm a certified personal trainer with over 20 years of fitness experience. What began as a personal passion evolved into a lifestyle and professional mission. I've explored a wide range of training styles — from classic weightlifting to calisthenics, aerobic conditioning, and Muay Thai.",
  "I also launched a fitness vlog tailored to people working demanding 9-to-5 jobs, helping them stay active, accountable, and consistent through realistic fitness strategies. That same mindset shapes how I train clients today.",
  "Outside of the gym, I'm committed to ongoing learning. I regularly study the latest in fitness science, nutrition, and recovery — drawing from trusted sources including expert trainers, medical researchers, clinical studies, podcasts, and educational videos. Staying current helps me refine my methods and offer smarter, safer, and more effective programming.",
  "I also train Muay Thai recreationally, incorporating striking-based cardio and technique into my weekly routine. For clients looking for a more combat-specific focus, I'm happy to refer them to trusted experts in my network of fight fitness professionals.",
]

const collage = [
  { avif: '/muaythai.avif', fallback: '/MT_MainPage - Edited - Edited.jpg', alt: 'Muay Thai training session', caption: 'Muay Thai Training' },
  { avif: '/weights.avif',  fallback: '/Weights_MainPage - Edited - Edited - Edited.jpg', alt: 'Weight training session',  caption: 'Weightlifting' },
  { avif: '/pose.avif',     fallback: '/Pose_MainPage.jpg',                              alt: 'Trainer coaching session', caption: 'Coaching Session' },
  { avif: '/trainer2.avif', fallback: '/IMG_3824 - Edited.jpg',                         alt: 'T3 Training in Los Angeles', caption: 'Training in LA' },
]

export default function About() {
  return (
    <div className="page">
      <Seo
        title="About Terry Teng"
        description="Meet Terry Teng — certified personal trainer with 20+ years of fitness experience in Los Angeles. Expert in weightlifting, calisthenics, Muay Thai cardio, and evidence-based nutrition coaching."
        keywords="Terry Teng personal trainer Los Angeles, T3 personal training, fitness coach LA, Muay Thai cardio, calisthenics trainer"
        canonical="/about"
        ogImage="https://t3personaltrainer.com/MainPage_Edited.png"
        schema={schema}
      />

      {/* Hero */}
      <header className="about-hero">
        <div className="about-hero-content">
          <h1>More Than a Trainer — A Lifelong Fitness Enthusiast</h1>
          <p>Helping 9-to-5ers, weekend warriors, and everyday athletes become the strongest version of themselves.</p>
        </div>
      </header>

      {/* Bio */}
      <section className="about-bio wrap">
        <div className="bio-layout">
          <div className="bio-text">
            <h2 className="section-title">Meet Your Trainer</h2>
            {bioParagraphs.map((text, i) => (
              <BioParagraph key={i} text={text} delay={i * 80} />
            ))}
          </div>
          <div className="bio-photo">
            <picture>
              <source srcSet="/trainer.avif" type="image/avif" />
              <img
                src="/MainPage_Edited.png"
                alt="Terry Teng, T3 Personal Training coach in Los Angeles"
                loading="lazy"
                width="360"
                height="360"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Photo collage */}
      <section className="collage-section" aria-label="Training photos">
        <div className="polaroid-grid">
          {collage.map((item, i) => (
            <div
              key={i}
              className={`polaroid polaroid-${(i % 4) + 1}`}
            >
              <picture>
                <source srcSet={item.avif} type="image/avif" />
                <img src={item.fallback} alt={item.alt} loading="lazy" width="230" height="200" />
              </picture>
              <p>{item.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta wrap">
        <h2>Ready to get started?</h2>
        <p>Book a free 30-minute consult and we'll build your plan together.</p>
        <Link to="/#contact" className="btn btn-primary">Book Free Consult</Link>
      </section>
    </div>
  )
}
