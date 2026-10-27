// Mirrors the "Built with" list in TabForge's companion app and the
// repository's THIRD_PARTY_NOTICES.md. Update all three together.
export const TABFORGE_CREDITS = [
  {
    name: "English Speller Database",
    href: "https://github.com/en-wl/wordlist",
    use: "Kevin Atkinson’s English word list (formerly SCOWL), used for swipe, autocorrect, and suggestions.",
    license: "ESDB permission notice",
  },
  {
    name: "SymSpell",
    href: "https://github.com/wolfgarbe/SymSpell",
    use: "Wolf Garbe’s English word frequencies, via symspellpy, used to rank corrections and swipe matches.",
    license: "MIT",
  },
  {
    name: "Google Books Ngram",
    href: "https://books.google.com/ngrams",
    use: "The word counts behind those frequencies. Google does not sponsor or endorse TabForge.",
    license: "CC BY 3.0",
  },
  {
    name: "Nord",
    href: "https://www.nordtheme.com",
    use: "Colors adapted for the Nord keyboard theme.",
    license: "MIT",
  },
  {
    name: "Dracula",
    href: "https://draculatheme.com",
    use: "Colors adapted for the Dracula keyboard theme.",
    license: "MIT",
  },
  {
    name: "Apple frameworks",
    href: "https://developer.apple.com/documentation/",
    use: "SwiftUI, UIKit, and Speech, provided by iOS rather than bundled.",
    license: "Apple platform terms",
  },
] as const;

export const TABFORGE_NOTICES_HREF =
  "https://github.com/jdodsoncollins/TabForge/blob/main/THIRD_PARTY_NOTICES.md";
