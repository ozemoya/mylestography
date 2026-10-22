"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import BookingScheduler from "../components/BookingScheduler";
import { packages, priceRange, depositRange } from "./packages";

export default function BookingContent({ calendlyUrl }: { calendlyUrl: string }) {
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
        body: JSON.stringify({ ...form, message: `Package: ${selected.tier} ${selected.service} (${priceRange(selected)}; mandatory deposit ${depositRange(selected)})\n\n${form.message}` }),
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
        <p className="page-deck">Choose the approach that fits your idea: expressive and concept-driven, or a fuller professional production.</p>
      </header>
      <section aria-labelledby="packages-heading">
        <h2 id="packages-heading" className="booking-section-title">Creative or professional. Always you.</h2>
        <p className="booking-policy"><strong>Deposits are mandatory and equal to 1/4 (25%) of the quoted price.</strong> Final pricing depends on the amount of content and work involved. Deposit ranges are shown below; your mandatory deposit is calculated from your final quote. Extra photos, filming, travel and studio fees are quoted separately.</p>
        {["Photos", "Video", "Mixed media"].map(service => <section className="package-service" key={service} aria-label={`${service} packages`}>
          <h3>{service}</h3>
          <div className="package-grid">{packages.filter(item => item.service === service).map(item => <article key={item.id} className={`package-card ${selectedId === item.id ? "is-selected" : ""}`}>
            <div className="package-card-heading"><h4>{item.tier}</h4><p>{priceRange(item)}</p></div>
            <p>{item.description}</p>
            <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
            <p className="package-deposit">Mandatory 1/4 deposit: <strong>{depositRange(item)}</strong></p>
            <button type="button" aria-pressed={selectedId === item.id} onClick={() => { setSelectedId(item.id); requestAnimationFrame(() => document.getElementById(calendlyUrl && item.service !== "Mixed media" ? "schedule" : "inquiry")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })); }}>
              {selectedId === item.id ? "Selected" : "Choose"} {item.tier.toLowerCase()} {item.service.toLowerCase()} ↗
            </button>
          </article>)}</div>
          {service === "Mixed media" && <p className="package-note">Mixed-media packages use supplied footage; filming is quoted separately.</p>}
        </section>)}
      </section>
      {calendlyUrl && selected.service !== "Mixed media" && <section id="schedule" className="scheduling-section" aria-labelledby="schedule-heading">
        <p className="eyebrow">Plan your project</p>
        <h2 id="schedule-heading" className="booking-section-title">Book your photo or video session.</h2>
        <p className="booking-selection" aria-live="polite">Selected: <strong>{selected.tier} {selected.service}</strong> · {priceRange(selected)} · Mandatory 1/4 deposit: <strong>{depositRange(selected)}</strong></p>
        <p>Available Monday, Wednesday, Friday, Saturday and Sunday, noon–9 p.m. Eastern. Choose your session date and time below. Each booking reserves a 90-minute calendar block; shooting time follows your selected package.</p>
        <p><strong>Your deposit is mandatory: 1/4 (25%) of your final quote.</strong> Payment is arranged directly with Mylestography after your quote. The calendar does not collect payment; your session is subject to the deposit and location confirmation.</p>
        <BookingScheduler url={calendlyUrl} packageName={`${selected.tier} ${selected.service} — ${priceRange(selected)}`} />
      </section>}
      <section id="inquiry" className="contact-grid inquiry-section" aria-labelledby="inquiry-heading">
        <div><p className="eyebrow">Have a question?</p><h2 id="inquiry-heading" className="booking-section-title">Tell me your idea.</h2><p className="page-deck">Share what you’re envisioning, a preferred date and any location ideas. Your selected package is included with your inquiry.</p><a className="text-link" href="mailto:myleskmiller@gmail.com">Email Mylestography ↗</a></div>
        {submitted ? <div className="thank-you" role="status">Thank you for reaching out.<br />I’ll get back to you with next steps.</div> : <form className="contact-form" onSubmit={submit}>
          <div className="field"><label htmlFor="package">Your package</label><select id="package" value={selectedId} onChange={event => setSelectedId(event.target.value)}>{packages.map(item => <option key={item.id} value={item.id}>{item.tier} {item.service} — {priceRange(item)}</option>)}</select></div>
          <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" value={form.name} onChange={change} required /></div>
          <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" autoComplete="email" type="email" value={form.email} onChange={change} required /></div>
          <div className="field"><label htmlFor="phone">Phone <span>(optional)</span></label><input id="phone" name="phone" autoComplete="tel" type="tel" value={form.phone} onChange={change} /></div>
          <div className="field"><label htmlFor="message">Tell me about your session</label><textarea id="message" name="message" rows={6} value={form.message} onChange={change} required /></div>
          <button className="submit-button" disabled={sending} type="submit">{sending ? "Sending…" : "Send inquiry ↗"}</button>{error && <p className="form-error" role="alert">{error}</p>}
        </form>}
      </section>
    </main>
  </div>;
}


