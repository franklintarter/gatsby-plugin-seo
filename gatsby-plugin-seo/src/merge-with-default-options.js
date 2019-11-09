const throwRequired = required => {
  throw Error(
    `'${required}' is a is a required plugin option for 'gatsby-plugin-seo'.`
  );
};

module.exports = ({
  siteName,
  defaultSiteImage,
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
  siteUrl
}) => {
  if (!siteName) {
    throwRequired("siteName");
  }
  if (!siteUrl) {
    throwRequired("siteUrl");
  }
  if (!defaultSiteImage && requireImage) {
    throwRequired("defaultSiteImage");
  }

  return {
    siteName,
    defaultSiteImage,
    locale,
    twitterCreator,
    twitterSite,
    globalSchema,
    htmlLanguage,
    defaultAuthorUrl,
    defaultPublisherUrl,
    siteUrl,
    appleTouch,
    favicon16,
    favicon32
  };
};
