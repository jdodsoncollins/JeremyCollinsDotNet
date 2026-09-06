const SITE = "https://jeremycollins.net";

export const personId = `${SITE}/#person`;
export const websiteId = `${SITE}/#website`;
export const codableId = `${SITE}/#codable`;
export const taktungId = `${SITE}/#taktung`;
export const codeatrophyId = `${SITE}/#codeatrophy`;
export const faqId = `${SITE}/#faq`;

export const personJsonLd = {
  "@type": "Person",
  "@id": personId,
  name: "Jeremy Collins",
  givenName: "Jeremy",
  familyName: "Collins",
  url: SITE,
  image: `${SITE}/logo.png`,
  email: "mailto:jeremy@jeremycollins.net",
  jobTitle: "Senior Software Engineer",
  description:
    "Software engineer at Webflow in Los Angeles. Makes Codable and Taktung for iOS.",
  knowsLanguage: "en",
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
    "https://x.com/jollins",
  ],
  knowsAbout: [
    "Web development",
    "Growth engineering",
    "Usage-based billing",
    "iOS developer tools",
    "Safari",
    "Vercel",
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
    "Personal site for Jeremy Collins: software engineer at Webflow and maker of Codable and Taktung.",
  inLanguage: "en-US",
  publisher: { "@id": personId },
  about: { "@id": personId },
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

export const taktungJsonLd = {
  "@type": "SoftwareApplication",
  "@id": taktungId,
  name: "Taktung",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "iOS",
  url: "https://apps.apple.com/us/app/taktung/id6805738660",
  downloadUrl: "https://apps.apple.com/us/app/taktung/id6805738660",
  description:
    "Vercel deploy and incident ops on your phone. Site health, deploys, and confirmed promote or rollback. No ads or tracking.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: { "@id": personId },
};

export const codeatrophyJsonLd = {
  "@type": "SoftwareApplication",
  "@id": codeatrophyId,
  name: "Codeatrophy",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://codeatrophy.vercel.app/",
  description:
    "Interactive tutorials on web development fundamentals: algorithms, system design, and CS, built with React Native for iOS, Android, and web.",
  author: { "@id": personId },
};

export const faqJsonLd = {
  "@type": "FAQPage",
  "@id": faqId,
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Jeremy Collins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jeremy Collins is a senior software engineer at Webflow in Los Angeles. He works on growth engineering, billing, and usage metering, and makes Codable and Taktung for iOS.",
      },
    },
    {
      "@type": "Question",
      name: "What is Codable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Codable is a free iOS app with Safari-native web developer tools. Inspect HTML, styles, network requests, and console output. No ads, tracking, or paywall.",
      },
    },
    {
      "@type": "Question",
      name: "What is Taktung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Taktung is a free iOS app for Vercel deploy and incident ops. See site health and the latest deploy, then promote or roll back after you confirm. A Vercel token stays on the phone. Not affiliated with Vercel.",
      },
    },
    {
      "@type": "Question",
      name: "Where does Jeremy Collins work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jeremy Collins is a senior software engineer at Webflow.",
      },
    },
  ],
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personJsonLd,
    websiteJsonLd,
    codableJsonLd,
    taktungJsonLd,
    codeatrophyJsonLd,
    faqJsonLd,
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profile`,
      url: SITE,
      name: "Jeremy Collins",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "#about h2", "#projects h2"],
      },
    },
  ],
};

export const resumeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personJsonLd,
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/resume#page`,
      url: `${SITE}/resume`,
      name: "Jeremy Collins resume",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
    },
  ],
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

export const taktungPrivacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE}/taktung-privacy-policy#page`,
  url: `${SITE}/taktung-privacy-policy`,
  name: "Taktung Privacy Policy",
  about: { "@id": taktungId },
  isPartOf: { "@id": websiteId },
};
