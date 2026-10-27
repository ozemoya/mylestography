"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
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
  return <div>
    <div className="inner-header"><Navbar /></div>
    <main className="page-main booking-page">
      <header className="booking-intro">
        <p className="eyebrow">Photos · Video · Mixed media</p>
        <h1 className="page-title">Let’s create<br /><em>together.</em></h1>
        <p className="page-deck">Photography, video and mixed media, built around your idea.</p>
      </header>
      <section aria-labelledby="packages-heading">
        <h2 id="packages-heading" className="booking-section-title">Find your fit.</h2>
        <p className="booking-policy"><strong>Choose a package and tell me about your shoot.</strong> I’ll choose the final price based on the work involved, then send you a booking link for that quote. The 25% deposit is due when you book; the rest is due on the day of the shoot. Deposit ranges below are estimates until I set your final price.</p>
        <p className="booking-policy"><strong>Travel:</strong> 0–10 miles included · 11–20 miles: $15 · 21–30 miles: $25 · 31–40 miles: $40 · 40+ miles: quoted individually.</p>
        {["Photos", "Video", "Mixed media"].map(service => <section className="package-service" key={service} aria-label={`${service} packages`}>
          <h3>{service}</h3>
          <div className="package-grid">{packages.filter(item => item.service === service).map(item => <article key={item.id} className={`package-card ${selectedId === item.id ? "is-selected" : ""}`}>
            <div className="package-card-heading"><h4>{item.tier}</h4><p>{priceRange(item)}</p></div>
            <p>{item.description}</p>
            <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
            <p className="package-deposit">Mandatory 1/4 deposit: <strong>{depositRange(item)}</strong></p>
            <button type="button" aria-pressed={selectedId === item.id} onClick={() => { setSelectedId(item.id); requestAnimationFrame(() => document.getElementById("inquiry")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })); }}>
              {selectedId === item.id ? "Selected" : "Choose"} {packageLabel(item).toLowerCase()} ↗
            </button>
          </article>)}</div>
        </section>)}
      </section>
      <section id="inquiry" className="contact-grid inquiry-section" aria-labelledby="inquiry-heading">
        <div><p className="eyebrow">Request a quote</p><h2 id="inquiry-heading" className="booking-section-title">Tell me your idea.</h2><p className="page-deck">Share your preferred date, location and what you need captured. I’ll set the final price, then send a booking link with your exact 25% deposit.</p><p className="booking-selection" aria-live="polite">Selected: <strong>{packageLabel(selected)}</strong> · {priceRange(selected)} · Estimated deposit: <strong>{depositRange(selected)}</strong></p><a className="text-link" href="mailto:myleskmiller@gmail.com">Email Mylestography ↗</a></div>
        {submitted ? <div className="thank-you" role="status">Thank you for reaching out.<br />I’ll review your project and send your quote and booking details.</div> : <form className="contact-form" onSubmit={submit}>
          <div className="field"><label htmlFor="package">Your package</label><select id="package" value={selectedId} onChange={event => setSelectedId(event.target.value)}>{packages.map(item => <option key={item.id} value={item.id}>{packageLabel(item)} — {priceRange(item)}</option>)}</select></div>
          <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" value={form.name} onChange={change} required /></div>
          <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" autoComplete="email" type="email" value={form.email} onChange={change} required /></div>
          <div className="field"><label htmlFor="phone">Phone <span>(optional)</span></label><input id="phone" name="phone" autoComplete="tel" type="tel" value={form.phone} onChange={change} /></div>
          <div className="field"><label htmlFor="message">Tell me about your session</label><textarea id="message" name="message" rows={6} value={form.message} onChange={change} required /></div>
          <button className="submit-button" disabled={sending} type="submit">{sending ? "Sending…" : "Request my quote ↗"}</button>{error && <p className="form-error" role="alert">{error}</p>}
        </form>}
      </section>
    </main>
  </div>;
}


