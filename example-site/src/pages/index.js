import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import { SEO, useSEO } from "gatsby-plugin-seo"

const IndexPage = () => { 
  const { siteUrl } = useSEO()
  return (
  <Layout>
    <SEO
      title="Home"
      description="Description of the site/home page."
      pagePath="/"
      schema={`{
            "@context": "http://schema.org",
            "@type": "WebPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Example Company",
              "image": "${siteUrl}/img/logo.png"
            }
          }`}
    />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)
        }

export default IndexPage
