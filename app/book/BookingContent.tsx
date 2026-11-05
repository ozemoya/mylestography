"use client";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import DesktopChrome from "../components/DesktopChrome";
import { packages, priceRange, depositRange, packageLabel } from "./packages";

export default function BookingContent() {
  const [selectedId, setSelectedId] = useState<string>(packages[0].id);
  const selected = packages.find(item => item.id === selectedId) || packages[0];
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  function change(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/book", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `Package: ${packageLabel(selected)} (${priceRange(selected)}; mandatory deposit ${depositRange(selected)})\n\n${form.message}` }),
      });
      if (!response.ok) throw new Error("Inquiry failed");
      setSubmitted(true);
    } catch { setError("Your inquiry could not be sent. Please try again or email myleskmiller@gmail.com."); }
    finally { setSending(false); }
  }
  return <DesktopChrome><div className="retro-site">
    <div className="inner-header"><Navbar /></div>
    <main className="page-main booking-page">
      <header className="booking-intro">
        <p className="eyebrow">PHOTO / VIDEO / MIXED MEDIA</p>
        <h1 className="page-title">Book a shoot.</h1>
        <div className="poster-book-visual"><Image src="/images/folder-collection/DSCF2006.webp" alt="Golden portrait photographed by Mylestography" fill priority unoptimized sizes="(max-width: 760px) 100vw, 45vw" /></div>
      </header>
      <section aria-labelledby="packages-heading">
        <h2 id="packages-heading" className="booking-section-title">Packages.</h2>
        <p className="booking-policy">Choose a package. I set the final price and send a booking link. Pay a 25% deposit to book; the balance is due on shoot day. Deposit ranges are estimates.</p>
        <p className="booking-policy"><strong>Travel:</strong> 0–10 miles included · 11–20 miles: $15 · 21–30 miles: $25 · 31–40 miles: $40 · 40+ miles: quoted individually.</p>
        {["Photos", "Video", "Mixed media"].map(service => <section className="package-service" key={service} aria-label={`${service} packages`}>
          <h3>{service}</h3>
          <div className="package-grid">{packages.filter(item => item.service === service).map(item => <article key={item.id} className={`package-card ${selectedId === item.id ? "is-selected" : ""}`}>
            <div className="package-card-heading"><h4>{item.tier}</h4><p>{priceRange(item)}</p></div>
            <p>{item.description}</p>
            <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
            <p className="package-deposit">25% deposit: <strong>{depositRange(item)}</strong></p>
            <button type="button" aria-pressed={selectedId === item.id} onClick={() => { setSelectedId(item.id); requestAnimationFrame(() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "instant" })); }}>
              {selectedId === item.id ? "SELECTED" : "SELECT PACKAGE"}
            </button>
          </article>)}</div>
        </section>)}
      </section>
      <section id="inquiry" className="contact-grid inquiry-section" aria-labelledby="inquiry-heading">
        <div><p className="eyebrow">REQUEST A QUOTE</p><h2 id="inquiry-heading" className="booking-section-title">Shoot details.</h2><p className="page-deck">Send your date, location, and what you need. I’ll reply with the final price and booking link.</p><p className="booking-selection" aria-live="polite">Selected: <strong>{packageLabel(selected)}</strong> · {priceRange(selected)} · Estimated deposit: <strong>{depositRange(selected)}</strong></p><a className="text-link" href="mailto:myleskmiller@gmail.com">EMAIL ME ↗</a></div>
        {submitted ? <div className="thank-you" role="status">Sent. I’ll email your quote and booking link.</div> : <form className="contact-form" onSubmit={submit}>
          <div className="field"><label htmlFor="package">Package</label><select id="package" value={selectedId} onChange={event => setSelectedId(event.target.value)}>{packages.map(item => <option key={item.id} value={item.id}>{packageLabel(item)} — {priceRange(item)}</option>)}</select></div>
          <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" value={form.name} onChange={change} required /></div>
          <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" autoComplete="email" type="email" value={form.email} onChange={change} required /></div>
          <div className="field"><label htmlFor="phone">Phone <span>(optional)</span></label><input id="phone" name="phone" autoComplete="tel" type="tel" value={form.phone} onChange={change} /></div>
          <div className="field"><label htmlFor="message">Shoot details</label><textarea id="message" name="message" rows={6} value={form.message} onChange={change} required /></div>
          <button className="submit-button" disabled={sending} type="submit">{sending ? "SENDING…" : "SEND REQUEST"}</button>{error && <p className="form-error" role="alert">{error}</p>}
        </form>}
      </section>
    </main>
    <SiteFooter />
  </div></DesktopChrome>;
}


