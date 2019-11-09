# Gatsby Plugin SEO

## Install

```shell
yarn add gatsby-plugin-seo
```

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-seo",
      options: {
        siteName: "Example Company",
        defaultSiteImage: "/img/logo.png",
        siteUrl: "https://example.com",
        twitterCreator: "@twitterhandle",
        twitterSite: "@twitterhandle",
        globalSchema: `{
            "@type": "WebSite",
            "@id": "https://example.com/#website",
            "url": "https://example.com/",
            "name": "Example Site Title",
            "publisher": {
              "@id": "https://example.com/about/#organization"
            },
            "image": {
              "@type": "ImageObject",
              "@id": "https://example.com/#logo",
              "url": "https://example.com/img/logo.png",
              "caption": "Example Company Logo"
            }
          }`
      }
    }
  ]
};
```

```js
import React from "react";
import Layout from "../components/layout";
import { SEO, useSEO } from "gatsby-plugin-seo";

const IndexPage = () => {
  const { siteUrl } = useSEO();
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
    </Layout>
  );
};

export default IndexPage;
```

## Options

```js
{
  siteName, // required
  siteUrl, // required
  defaultSiteImage, // if blank and each page doesn't supply an image, will throw runtime error if requireImage is set to true
  twitterCreator = "",
  twitterSite = "",
  globalSchema = "",
  requireImage = true,
  htmlLanguage = "en",
  locale = "en_US",
  defaultAuthorUrl = "",
  defaultPublisherUrl = "",
  appleTouch = "/img/apple-touch-icon.png",
  favicon32 = "/img/favicon-32x32.png",
  favicon16 = "/img/favicon-16x16.png",
}
```

### Contribute

Bugs, ideas, issues, PRs welcome!
