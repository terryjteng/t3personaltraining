import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://t3personaltrainer.com'

export default function Seo({ title, description, keywords, canonical, ogImage, schema }) {
  const fullTitle = title
    ? `${title} | T3 Personal Training`
    : 'T3 Personal Training | Fitness Coaching in Los Angeles'

  const image = ogImage || `${BASE_URL}/MainPage_Edited.png`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={`${BASE_URL}${canonical || '/'}`} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`${BASE_URL}${canonical || '/'}`} />
      <meta property="og:type" content="website" />

      {/* Structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
