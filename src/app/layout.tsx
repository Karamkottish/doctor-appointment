"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import "./styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Navbar blur on scroll
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Theme toggle
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Smooth scroll + offset handling
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

  // Scroll spy effect
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

  const nav = [
    { name: "About", href: "#about" },
    { name: "Doctors", href: "#doctors" },
    { name: "Book", href: "#book" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
  ];

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
              {nav.map((l) => (
                <motion.a
                  key={l.name}
                  href={l.href}
                  className={`nav-link ${active === l.href.substring(1) ? "active-link" : ""}`}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {l.name}
                  <motion.span
                    className="nav-underline"
                    initial={{ width: 0 }}
                    animate={{ width: active === l.href.substring(1) ? "100%" : "0%" }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.a>
              ))}
            </nav>

            <div className="nav__actions">
              <motion.button
                className="theme-toggle"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                whileTap={{ rotate: 180, scale: 0.95 }}
                aria-label="Toggle color theme"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </motion.button>

              <motion.a
                href="#book"
                className="btn btn--nav"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
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
            <div className="footer__cols">
              <div>
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
              </div>
              <div>
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
              <div>
                <h4>Contact</h4>
                <a href="mailto:hello@healthconnect.app">hello@healthconnect.app</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
