// Internal booking form with thank you message on submit
"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import useIsMobile from "../components/useIsMobile";
import { Sunflower } from "../page"; // Assuming Sunflower is exported from the homepage

const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
`;

export default function BookPage() {
  const isMobile = useIsMobile();
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
    <>
    <style>{keyframes}</style>
    <div 
      className="min-h-screen w-full font-['Lora',_serif] text-[#5D4037]"
      style={{ backgroundColor: '#FDF8F0', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"6\" height=\"6\" viewBox=\"0 0 6 6\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M5 0h1L0 6V5zM6 5v1H5z\"/%3E%3C/g%3E%3C/svg%3E")' }}
    >
      <Navbar isMobile={isMobile} />
      <main className="py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center">
            <Sunflower className="mx-auto mb-4" />
            <h1 className="font-['Kalam',_cursive] text-5xl md:text-7xl text-[#D57149] mb-6">
                Book a Session
            </h1>
        </div>

        <div className="max-w-2xl w-full bg-white/70 rounded-lg shadow-lg p-8 mt-8 backdrop-blur-sm">
          {submitted ? (
            <div className="text-center text-xl font-semibold text-green-700">
              <h2 className="font-['Kalam',_cursive] text-4xl text-[#D57149] mb-4">Thank You!</h2>
              <p>Your booking request has been received.</p>
              <p>We'll get back to you soon.</p>
            </div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <input
                className="bg-white/50 border-2 border-[#E0CDB6] rounded-lg p-3 text-[#5D4037] placeholder:text-[#937B6F] focus:ring-2 focus:ring-[#D57149] focus:border-[#D57149] transition-all duration-300 outline-none"
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="bg-white/50 border-2 border-[#E0CDB6] rounded-lg p-3 text-[#5D4037] placeholder:text-[#937B6F] focus:ring-2 focus:ring-[#D57149] focus:border-[#D57149] transition-all duration-300 outline-none"
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="bg-white/50 border-2 border-[#E0CDB6] rounded-lg p-3 text-[#5D4037] placeholder:text-[#937B6F] focus:ring-2 focus:ring-[#D57149] focus:border-[#D57149] transition-all duration-300 outline-none"
                type="tel"
                name="phone"
                placeholder="Phone Number (optional)"
                value={form.phone}
                onChange={handleChange}
              />
              <textarea
                className="bg-white/50 border-2 border-[#E0CDB6] rounded-lg p-3 text-[#5D4037] placeholder:text-[#937B6F] focus:ring-2 focus:ring-[#D57149] focus:border-[#D57149] transition-all duration-300 outline-none resize-none"
                name="message"
                placeholder="Tell us about your session..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full inline-block px-12 py-4 text-lg font-bold text-white bg-[#D57149] rounded-full shadow-lg transition-transform duration-300 hover:scale-105 mt-2"
              >
                Send Request
              </button>
              {error && <div className="text-red-600 text-center mt-2">{error}</div>}
            </form>
          )}
        </div>
      </main>
      <footer className="bg-[#5D4037] text-white/80 py-8 px-4 text-center font-sans mt-16">
            <p>&copy; {new Date().getFullYear()} Mylestography. All Rights Reserved.</p>
            <p className="text-sm opacity-70">Designed with love & a sprinkle of code</p>
      </footer>
    </div>
    </>
  );
}

