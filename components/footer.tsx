export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-secondary text-sm">
      <div>
        &copy; {currentYear} by JeremyCollins.net. All rights reserved.
      </div>
      <div className="flex items-center gap-4">
        <a
          href="/rss.xml"
          className="hover:text-heading transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          RSS
        </a>
      </div>
    </footer>
  )
}
