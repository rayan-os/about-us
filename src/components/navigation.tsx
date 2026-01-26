"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useContactForm } from "./contact-form-provider";
import staticPassageLogo from "@/assets/icons/static-passage-logo.svg";

const navLinks = [
  { name: "SOLUTIONS", href: "#solutions" },
  { name: "WORKFLOW", href: "#workflow" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openContactForm } = useContactForm();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-500"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Nav - Logo + Links */}
          <motion.nav
            className={cn(
              "flex items-center gap-4 sm:gap-8 px-4 sm:px-6 py-3 sm:py-4 rounded-lg transition-all duration-500",
              scrolled
                ? "backdrop-blur-xl bg-black/80 shadow-2xl shadow-black/20"
                : "bg-transparent"
            )}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-1 group">
              <Image
                src={staticPassageLogo}
                alt="Passage"
                width={102}
                height={24}
                className="h-5 sm:h-6 w-auto"
                priority
              />
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="font-nav text-sm text-white/70 hover:text-white transition-colors tracking-wider"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.nav>

          {/* Right - CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={cn(
              "hidden md:flex items-center px-6 py-4 rounded-lg transition-all duration-500",
              scrolled
                ? "glass shadow-2xl shadow-black/20"
                : "bg-transparent"
            )}
          >
            <button
              onClick={openContactForm}
              className="font-nav text-sm text-white/70 hover:text-white transition-colors tracking-wider"
            >
              REQUEST DEMO
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-xl transition-all duration-300",
              mobileMenuOpen ? "bg-white/10" : "glass"
            )}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-[72px] sm:top-[88px] left-4 right-4 z-50 md:hidden"
            >
              <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-3 sm:space-y-4 border border-white/10">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-nav text-base sm:text-lg text-white/70 hover:text-white transition-colors tracking-wider py-2"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openContactForm();
                  }}
                  className="block w-full text-left font-nav text-base sm:text-lg text-primary hover:text-primary/80 transition-colors tracking-wider py-2 pt-3 sm:pt-4 border-t border-white/10"
                >
                  REQUEST DEMO
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
