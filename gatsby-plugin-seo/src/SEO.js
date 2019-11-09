import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function isValidJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export default ({
  title,
  description,
  image,
  pagePath,
  ogType = "website",
  requireImage = true,
  appendSiteTitleToPageTitle = true,
  twitterCard = "summary_large_image",
  locale,
  authorUrl,
  publisherUrl,
  keywords,
  schema
}) => {
  const {
    seo: {
      siteName,
      siteUrl,
      defaultSiteImage,
      defaultLocale,
      twitterSite,
      twitterCreator,
      defaultAuthorUrl,
      defaultPublisherUrl,
      appleTouch,
      favicon16,
      favicon32,
      globalSchema
    }
  } = useStaticQuery(graphql`
    query SEO_Query {
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

  if (!title) {
    throw Error("'title' prop is required.");
  }

  if (!description) {
    throw Error("'description' prop is required.");
  }

  if (!pagePath) {
    throw Error("'pagePath' prop is required.");
  }

  const pageLocale = locale || defaultLocale;
  const pageUrl = new URL(pagePath, siteUrl); // `${siteUrl}${pagePath}`;
  const pageImage = image || defaultSiteImage;
  const pageTitle = appendSiteTitleToPageTitle
    ? `${title} · ${siteName}`
    : title;

  const pageAuthorUrl = authorUrl || defaultAuthorUrl;
  const pagePublisherUrl = publisherUrl || defaultPublisherUrl;

  let keywordsStr;
  if (keywords && typeof keywords === "string") {
    keywordsStr = keywords.trim();
  }
  if (keywords && Array.isArray(keywords)) {
    keywordsStr = keywords.join(", ").trim();
  }

  // const keywordsStr = keywords ?

  if (!pageImage && requireImage) {
    throw Error(
      "Image not supplied. Add a 'defaultSiteImage' to site metadata, or pass in an 'image' prop. Or pass 'false' to the requireImage prop, if this page does not need an image."
    );
  }

  const hasSchema = !!globalSchema || !!schema;

  let schemaJson;
  if (hasSchema) {
    schemaJson = `
    { "@context": "https://schema.org",
      "@graph": [
      ${globalSchema || ""}${globalSchema && schema ? "," : ""}${schema || ""}
      ]
    }`;
    if (!isValidJson(schemaJson)) {
      throw Error(
        "Invalid JSON Schema. Check the values of 'globalSchema' in gatsby-config.js, or 'schema' prop of the page"
      );
    }
  }

  return (
    <Helmet>
      <html lang="en" />

      {/* Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouch} />
      <link rel="icon" type="image/png" href={favicon32} sizes="32x32" />
      <link rel="icon" type="image/png" href={favicon16} sizes="16x16" />

      {/* Core  */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywordsStr && <meta name="keywords" content={keywordsStr} />}

      {/* OG */}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={pageLocale} />
      <meta property="og:site_name" content={siteName} />

      {/* Images */}
      {requireImage && (
        <meta property="og:image" content={new URL(pageImage, siteUrl)} />
      )}
      {requireImage && (
        <meta
          property="og:image:secure_url"
          content={new URL(pageImage, siteUrl)}
        />
      )}

      {/* Article */}
      {ogType === "article" && pagePublisherUrl && (
        <meta property="article:publisher" content={pagePublisherUrl} />
      )}
      {ogType === "article" && pageAuthorUrl && (
        <meta property="article:author" content={pageAuthorUrl} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && (
        <meta name="twitter:creator" content={twitterCreator} />
      )}
      {hasSchema && <script type="application/ld+json">{schemaJson}</script>}
    </Helmet>
  );
};
