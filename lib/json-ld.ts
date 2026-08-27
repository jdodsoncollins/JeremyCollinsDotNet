const SITE = "https://jeremycollins.net";

export const personId = `${SITE}/#person`;
export const websiteId = `${SITE}/#website`;
export const codableId = `${SITE}/#codable`;
export const taktId = `${SITE}/#takt`;

export const personJsonLd = {
  "@type": "Person",
  "@id": personId,
  name: "Jeremy Collins",
  url: SITE,
  image: `${SITE}/logo.png`,
  email: "mailto:jeremy@jeremycollins.net",
  jobTitle: "Senior Software Engineer",
  description:
    "Software engineer at Webflow in Los Angeles. Makes Codable, Safari-native web developer tools for iOS.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    addressCountry: "US",
  },
  worksFor: {
    "@type": "Organization",
    name: "Webflow",
    url: "https://webflow.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of California, Davis",
  },
  sameAs: [
    "https://github.com/jdodsoncollins",
    "https://linkedin.com/in/jeremycollinsnet",
  ],
  knowsAbout: [
    "Web development",
    "Growth engineering",
    "Usage-based billing",
    "iOS developer tools",
    "Safari",
    "TypeScript",
    "React",
    "Next.js",
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": websiteId,
  name: "JeremyCollins.net",
  url: SITE,
  description:
    "Personal site for Jeremy Collins: software engineer at Webflow and maker of Codable.",
  inLanguage: "en-US",
  publisher: { "@id": personId },
};

export const codableJsonLd = {
  "@type": "SoftwareApplication",
  "@id": codableId,
  name: "Codable",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "iOS",
  url: "https://apps.apple.com/us/app/codable/id1324741659",
  downloadUrl: "https://apps.apple.com/us/app/codable/id1324741659",
  description:
    "Safari-native web developer tools for iOS. Inspect HTML, styles, network requests, and console output. No monetization or tracking.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: { "@id": personId },
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personJsonLd,
    websiteJsonLd,
    codableJsonLd,
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profile`,
      url: SITE,
      name: "Jeremy Collins",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
    },
  ],
};

export const resumeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE}/resume#page`,
  url: `${SITE}/resume`,
  name: "Jeremy Collins resume",
  isPartOf: { "@id": websiteId },
  about: { "@id": personId },
  mainEntity: { "@id": personId },
};

export const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE}/codable-privacy-policy#page`,
  url: `${SITE}/codable-privacy-policy`,
  name: "Codable Privacy Policy",
  about: { "@id": codableId },
  isPartOf: { "@id": websiteId },
};

export const taktJsonLd = {
  "@type": "SoftwareApplication",
  "@id": taktId,
  name: "Takt",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "iOS",
  description:
    "Vercel operations on your phone. Site health, deploys, and confirmed promote or rollback. No ads or tracking.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: { "@id": personId },
};

export const taktPrivacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE}/takt-privacy-policy#page`,
  url: `${SITE}/takt-privacy-policy`,
  name: "Takt Privacy Policy",
  about: { "@id": taktId },
  isPartOf: { "@id": websiteId },
};
