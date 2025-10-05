"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  // simple pointer parallax for hero blobs
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 16,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" aria-hidden>
          <motion.div
            className="blob b1"
            style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }}
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="blob b2"
            style={{ transform: `translate3d(${-parallax.x}px, ${-parallax.y}px, 0)` }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="blob b3"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {[...Array(26)].map((_, i) => (
            <span key={i} className="spark" />
          ))}
        </div>

        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Care that feels <span className="accent">human</span>. <br />
            Design that feels <span className="accent">future-proof</span>.
          </h1>
          <p className="hero__sub">
            Book trusted specialists, manage visits, and get reminders — in a calm, colorful,
            ultra-modern experience.
          </p>

          <div className="hero__cta">
            <a href="#book" className="btn btn--primary">Book Appointment</a>
            <a href="#about" className="btn btn--ghost">Explore</a>
          </div>
        </motion.div>
      </section>

      {/* TRUSTED MARQUEE */}
      <section className="trusted">
        <h3>Trusted by Leading Hospitals</h3>
        <div className="logo-marquee">
          <div className="marquee-track">
            {[1,2,3,4,5,6,1,2,3,4,5,6].map((n, i) => (
              <div key={i} className="logo-block">
                <img src={`/logos/pic${n}.png`} className="logo-img" alt={`partner ${n}`} />
                <div className="nameplate"><span>Partner {n}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <h2>Why patients love HealthConnect</h2>
        <p className="subtitle">
          A human-centered design system that reduces anxiety, speeds up booking, and feels delightful on every device.
        </p>

        <div className="grid grid--features">
          {[
            { i: "🚀", t: "Instant Booking", d: "Real-time slots and 60-second checkout." },
            { i: "🔒", t: "Privacy-First", d: "Best-practice security and consent-driven sharing." },
            { i: "💬", t: "Always-On Help", d: "24/7 assistance and pre-visit checklists." },
            { i: "🌈", t: "Inclusive UX", d: "Readable type, soft contrast, accessible controls." },
          ].map((f, idx) => (
            <motion.div
              key={f.t}
              className="feature card"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12 }}
            >
              <div className="feature__icon">{f.i}</div>
              <h4>{f.t}</h4>
              <p>{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="doctors">
        <div className="section__header">
          <h2>Meet our specialists</h2>
          <p className="subtitle">Hover a card — it rises and glows ✨</p>
        </div>

        <div className="grid grid--docs">
          {[
            { n: "Dr. Layla Ahmed", s: "Cardiology" },
            { n: "Dr. Omar Khaled", s: "Neurology" },
            { n: "Dr. Aisha Al-Sayed", s: "Dermatology" },
            { n: "Dr. Rami Noor", s: "Pediatrics" },
          ].map((d, i) => (
            <motion.div
              key={d.n}
              className="doc card"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <img src={`/logos/pic${(i % 6) + 1}.png`} className="doc__img" alt={d.n} />
              <div className="doc__meta">
                <div className="doc__top">
                  <h4>{d.n}</h4>
                  <span className="badge">⭐ 4.{8 + (i % 2)}</span>
                </div>
                <p className="doc__sub">{d.s}</p>
                <p className="doc__avail">Next slot: Today • 4:00 PM</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOOKING CTA BAND */}
      <section id="book" className="band">
        <div className="band__inner">
          <h3>Ready to feel better?</h3>
          <p>Pick a doctor, choose a time, and you’re done. We’ll remind you.</p>
          <a href="#doctors" className="btn btn--xl btn--primary">Start Booking</a>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="reviews">
        <h2>Loved by patients</h2>
        <div className="ticker">
          <div className="ticker__track">
            {[
              "“Booking took under a minute — gorgeous and effortless.” — Fatimah R.",
              "“Calm & premium. Found a specialist instantly.” — Omar A.",
              "“Best digital clinic experience I’ve tried.” — Layla M.",
              "“Clear, colorful, and comforting. 10/10.” — Noura S.",
            ].map((t, i) => (
              <div key={i} className="chip">{t}</div>
            ))}
            {[
              "“Booking took under a minute — gorgeous and effortless.” — Fatimah R.",
              "“Calm & premium. Found a specialist instantly.” — Omar A.",
              "“Best digital clinic experience I’ve tried.” — Layla M.",
              "“Clear, colorful, and comforting. 10/10.” — Noura S.",
            ].map((t, i) => (
              <div key={`dup-${i}`} className="chip">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq">
        <h2>FAQs</h2>
        {[
          { q: "Do you offer video consultations?", a: "Yes — select Online during booking for eligible doctors." },
          { q: "How are doctors verified?", a: "We verify licenses and monitor ratings & reviews regularly." },
          { q: "Is my data secure?", a: "We follow industry best practices with encryption and consent controls." },
        ].map((f, i) => (
          <details key={i} className="faq__item card">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
