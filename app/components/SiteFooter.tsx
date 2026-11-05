import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="poster-footer">
      <div className="poster-footer-top">
        <Link href="/" className="poster-footer-brand">Mylestography</Link>
        <p>Photo · Video · Mixed Media<br />Atlanta, Georgia</p>
        <div className="poster-footer-links">
          <Link href="/gallery">Portfolio ↗</Link>
          <Link href="/book">Book a session ↗</Link>
          <a href="https://www.instagram.com/mylestography/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
      </div>
      <div className="poster-footer-bottom"><span>© {new Date().getFullYear()} Mylestography</span></div>
    </footer>
  );
}
