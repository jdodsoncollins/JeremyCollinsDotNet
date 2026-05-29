import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-4xl font-bold text-heading mb-4">404</h1>
      <p className="text-lg text-secondary mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-accent hover:text-accent/80 transition-colors underline underline-offset-2"
      >
        Go back home
      </Link>
    </div>
  )
}
