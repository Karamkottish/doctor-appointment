"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import "./styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    setShowTop(y > 400); // Show back-to-top button after 400px scroll
  });

  // Smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const navHeight = 80;
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")!.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id")!;
          if (entry.isIntersecting) setActive(id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  return (
    <html lang="en">
      <body>
        {/* NAVBAR */}
        <motion.header
          className={`nav ${scrolled ? "nav--scrolled" : ""}`}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="nav__inner">
            <Link href="#" className="nav__brand">
              <span className="nav__logo">🏥</span>
              <span>HealthConnect</span>
            </Link>

            <nav className="nav__links">
              {["about", "doctors", "book", "reviews", "faq"].map((id) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className={`nav-link ${active === id ? "active-link" : ""}`}
                  whileHover={{ scale: 1.06 }}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                  <motion.span
                    className="nav-underline"
                    initial={{ width: 0 }}
                    animate={{ width: active === id ? "100%" : "0%" }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.a>
              ))}
            </nav>

            <div className="nav__actions">
              <motion.button
                className="theme-toggle"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                whileTap={{ rotate: 180, scale: 0.9 }}
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </motion.button>
              <motion.a href="#book" className="btn btn--nav" whileHover={{ scale: 1.05 }}>
                Book Now
              </motion.a>
            </div>
          </div>
        </motion.header>

        {children}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer__inner">
            <div>
              <div className="footer__brand">🏥 HealthConnect</div>
              <p>Premium digital healthcare. © {new Date().getFullYear()} HealthConnect.</p>
            </div>
          </div>
        </footer>

        {/* BACK TO TOP BUTTON */}
        {showTop && (
          <motion.button
            className="back-to-top"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ⬆
          </motion.button>
        )}
      </body>
    </html>
  );
}
  