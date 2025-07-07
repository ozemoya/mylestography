// Internal booking form with thank you message on submit
"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit booking");
      setSubmitted(true);
    } catch (err) {
      setError("Sorry, there was a problem submitting your booking. Please try again later.");
    }
  }

  return (
    <div className="bg-[#EFD5AD] min-h-screen flex flex-col items-center p-8">
      <Navbar />
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 mt-12">
        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500">Book a Session</h1>
        {submitted ? (
          <div className="text-center text-green-600 text-xl font-semibold">
            Thank you! Your booking request has been received.<br />We'll get back to you soon.
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="border rounded-lg p-3 text-black"
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="border rounded-lg p-3 text-black"
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="border rounded-lg p-3 text-black"
              type="tel"
              name="phone"
              placeholder="Phone Number (optional)"
              value={form.phone}
              onChange={handleChange}
            />
            <textarea
              className="border rounded-lg p-3 text-black"
              name="message"
              placeholder="Tell us about your session..."
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-lg mt-2 transition"
            >
              Submit
            </button>
            {error && <div className="text-red-600 text-center mt-2">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}

