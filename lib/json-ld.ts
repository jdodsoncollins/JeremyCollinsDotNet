const SITE = "https://jeremycollins.net";

export const personId = `${SITE}/#person`;
export const websiteId = `${SITE}/#website`;
export const codableId = `${SITE}/#codable`;
export const taktungId = `${SITE}/#taktung`;
export const tabforgeId = `${SITE}/#tabforge`;
export const paperAndGrainId = `${SITE}/#paper-and-grain`;
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
    "Software engineer at Webflow in Los Angeles. Makes Codable, Taktung, TabForge, and Paper & Grain for iPhone and iPad.",
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
    "Personal site for Jeremy Collins: software engineer at Webflow and maker of Codable, Taktung, TabForge, and Paper & Grain.",
  inLanguage: "en-US",
  publisher: { "@id": personId },
  about: { "@id": personId },
};

export const codableJsonLd = {
  "@type": "SoftwareApplication",
  "@id": codableId,
  name: "Codable",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "iOS 26.4 or later, iPadOS 26.4 or later",
  url: `${SITE}/codable`,
  downloadUrl: "https://apps.apple.com/us/app/codable/id1324741659",
  description:
    "Web developer tools for iPhone and iPad: inspect pages in Safari, review console and network activity, run JavaScript in Scratchpad, and test responsive layouts.",
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
  operatingSystem: "iOS 27 or later, iPadOS 27 or later",
  url: `${SITE}/taktung`,
  downloadUrl: "https://apps.apple.com/us/app/taktung/id6805738660",
  description:
    "Check Vercel deployments on iPhone and iPad. Review build logs, compare page captures, keep a local Field Log, and confirm deployment actions. Not affiliated with Vercel.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: { "@id": personId },
};

export const tabforgeJsonLd = {
  "@type": "SoftwareApplication",
  "@id": tabforgeId,
  name: "TabForge: Code Keyboard",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "iOS 27 or later, iPadOS 27 or later",
  url: `${SITE}/tabforge`,
  downloadUrl: "https://apps.apple.com/us/app/tabforge-code-keyboard/id6824056795",
  description:
    "A free, open-source programming keyboard for iPhone and iPad with coding punctuation, indentation, snippets, and input profiles. No Full Access required.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: { "@id": personId },
};

export const paperAndGrainJsonLd = {
  "@type": "SoftwareApplication",
  "@id": paperAndGrainId,
  name: "Paper & Grain",
  applicationCategory: "GameApplication",
  genre: "Puzzle",
  operatingSystem: "iOS 26 or later, iPadOS 26 or later",
  url: `${SITE}/paper-and-grain`,
  downloadUrl: "https://apps.apple.com/us/app/paper-grain/id6821361967",
  description:
    "A relaxing origami puzzle game for iPhone and iPad. Learn with eight lessons or explore Free Fold, then save editable creations. No timer or losing.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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
        text: "Jeremy Collins is a senior software engineer at Webflow in Los Angeles. He works on growth engineering, billing, and usage metering, and makes Codable, Taktung, TabForge, and Paper & Grain for iPhone and iPad.",
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
      name: "What is TabForge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TabForge is a free, open-source programming keyboard for iPhone and iPad. It includes coding punctuation, indentation, snippets, and input profiles, without requesting Full Access.",
      },
    },
    {
      "@type": "Question",
      name: "What is Paper & Grain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paper & Grain is a free origami puzzle game for iPhone and iPad. Learn through eight lessons or try your own shapes in Free Fold, with editable saved creations and no timer or losing.",
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
    tabforgeJsonLd,
    paperAndGrainJsonLd,
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
  "@id": `${SITE}/codable/privacy#page`,
  url: `${SITE}/codable/privacy`,
  name: "Codable Privacy Policy",
  about: { "@id": codableId },
  isPartOf: { "@id": websiteId },
};

export const taktungPrivacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE}/taktung/privacy#page`,
  url: `${SITE}/taktung/privacy`,
  name: "Taktung Privacy Policy",
  about: { "@id": taktungId },
  isPartOf: { "@id": websiteId },
};

export const tabforgePrivacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE}/tabforge/privacy#page`,
  url: `${SITE}/tabforge/privacy`,
  name: "TabForge Privacy Policy",
  about: { "@id": tabforgeId },
  isPartOf: { "@id": websiteId },
};

export const paperAndGrainPrivacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE}/paper-and-grain/privacy#page`,
  url: `${SITE}/paper-and-grain/privacy`,
  name: "Paper & Grain Privacy Policy",
  about: { "@id": paperAndGrainId },
  isPartOf: { "@id": websiteId },
};
