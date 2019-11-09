import { graphql, useStaticQuery } from 'gatsby'

export default () => {
  const { seo } = useStaticQuery(graphql`
    query SEO_StaticQuery {
      seo {
        defaultSiteImage
        defaultLocale: locale
        siteUrl
        siteName
        globalSchema
        twitterCreator
        twitterSite
        defaultAuthorUrl
        defaultPublisherUrl
        appleTouch
        favicon32
        favicon16
      }
    }
  `);
  return seo;
}