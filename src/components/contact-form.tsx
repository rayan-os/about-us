"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const FORM_CACHE_KEY = "passage_contact_form_draft";

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>(() => {
    // Load cached form data on initial render
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(FORM_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached) as FormData;
        } catch {
          // Invalid cache, use defaults
        }
      }
    }
    return {
      firstName: "",
      lastName: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    };
  });
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const modalRef = useRef<HTMLDivElement>(null);

  // Cache form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FORM_CACHE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicy) return;

    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "title",
      "company",
      "email",
    ];
    const nextErrors: Partial<Record<keyof FormData, string>> = {};
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        nextErrors[field] = "Required";
      }
    });
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setError("Please fill in the required fields.");
      return;
    }
    setFieldErrors({});

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setSubmitted(true);

        // Reset after showing success
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            firstName: "",
            lastName: "",
            title: "",
            company: "",
            email: "",
            phone: "",
            message: "",
          });
          setAgreedToPolicy(false);
          // Clear the cache after successful submission
          if (typeof window !== "undefined") {
            localStorage.removeItem(FORM_CACHE_KEY);
          }
          onClose();
        }, 2000);
      } else {
        setIsSubmitting(false);
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setIsSubmitting(false);
      setError("Network error. Please check your connection and try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (fieldErrors[name as keyof FormData] && value.trim()) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormData];
        return next;
      });
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFocusedField(e.currentTarget.name as keyof FormData);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    if (!value.trim()) {
      setFocusedField((prev) =>
        prev === (name as keyof FormData) ? null : prev,
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden"
          >
            {/* Header with title and close button */}
            <div className="flex items-center justify-between p-4 md:px-6 md:pt-6 md:pb-0">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-body text-xl md:text-2xl text-white font-semibold"
              >
                Request a Demo
              </motion.h2>
              <button
                onClick={onClose}
                className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-[6px] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form content */}
            <div className="px-4 pb-6 md:px-6 md:pb-8 overflow-y-hidden">
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/60 font-body text-sm mb-5 mt-3"
              >
                Passage provides access to life-changing opportunities through
                intelligent automation. Let us know how we can help you.
              </motion.p>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-[6px] border bg-red-900/20 border-red-500/30 text-red-300"
                >
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/60">
                    We'll be in touch with you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  {/* Name fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label
                        className={`block text-sm mb-1.5 font-body ${
                          fieldErrors.firstName
                            ? "text-red-300"
                            : "text-white/70"
                        }`}
                      >
                        First name
                        <span
                          className={
                            fieldErrors.firstName
                              ? "text-red-300"
                              : "text-white/50"
                          }
                        >
                          {" "}
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={focusedField === "firstName" ? "" : "John"}
                        required
                        aria-required="true"
                        aria-invalid={fieldErrors.firstName ? "true" : "false"}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-[6px] text-white text-sm placeholder:text-white/30 focus:outline-none transition-colors font-body ${
                          fieldErrors.firstName
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-white/30"
                        }`}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 }}
                    >
                      <label
                        className={`block text-sm mb-1.5 font-body ${
                          fieldErrors.lastName
                            ? "text-red-300"
                            : "text-white/70"
                        }`}
                      >
                        Last name
                        <span
                          className={
                            fieldErrors.lastName
                              ? "text-red-300"
                              : "text-white/50"
                          }
                        >
                          {" "}
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={focusedField === "lastName" ? "" : "Doe"}
                        required
                        aria-required="true"
                        aria-invalid={fieldErrors.lastName ? "true" : "false"}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-[6px] text-white text-sm placeholder:text-white/30 focus:outline-none transition-colors font-body ${
                          fieldErrors.lastName
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-white/30"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Title and Company fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.21 }}
                    >
                      <label
                        className={`block text-sm mb-1.5 font-body ${
                          fieldErrors.title ? "text-red-300" : "text-white/70"
                        }`}
                      >
                        Title
                        <span
                          className={
                            fieldErrors.title ? "text-red-300" : "text-white/50"
                          }
                        >
                          {" "}
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={
                          focusedField === "title"
                            ? ""
                            : "Director of Admissions"
                        }
                        required
                        aria-required="true"
                        aria-invalid={fieldErrors.title ? "true" : "false"}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-[6px] text-white text-sm placeholder:text-white/30 focus:outline-none transition-colors font-body ${
                          fieldErrors.title
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-white/30"
                        }`}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 }}
                    >
                      <label
                        className={`block text-sm mb-1.5 font-body ${
                          fieldErrors.company ? "text-red-300" : "text-white/70"
                        }`}
                      >
                        Company or institution
                        <span
                          className={
                            fieldErrors.company
                              ? "text-red-300"
                              : "text-white/50"
                          }
                        >
                          {" "}
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={
                          focusedField === "company"
                            ? ""
                            : "University of Toronto"
                        }
                        required
                        aria-required="true"
                        aria-invalid={fieldErrors.company ? "true" : "false"}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-[6px] text-white text-sm placeholder:text-white/30 focus:outline-none transition-colors font-body ${
                          fieldErrors.company
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-white/30"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.27 }}
                  >
                    <label
                      className={`block text-sm mb-1.5 font-body ${
                        fieldErrors.email ? "text-red-300" : "text-white/70"
                      }`}
                    >
                      Email
                      <span
                        className={
                          fieldErrors.email ? "text-red-300" : "text-white/50"
                        }
                      >
                        {" "}
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder={
                        focusedField === "email" ? "" : "john@institution.edu"
                      }
                      required
                      aria-required="true"
                      aria-invalid={fieldErrors.email ? "true" : "false"}
                      className={`w-full px-3 py-2 bg-white/5 border rounded-[6px] text-white text-sm placeholder:text-white/30 focus:outline-none transition-colors font-body ${
                        fieldErrors.email
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-white/30"
                      }`}
                    />
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm text-white/70 mb-1.5 font-body">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9+()\\s-]*"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder={
                        focusedField === "phone" ? "" : "+1 (555) 203-0500"
                      }
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-[6px] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors font-body"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.33 }}
                  >
                    <label className="block text-sm text-white/70 mb-1.5 font-body">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder={
                        focusedField === "message"
                          ? ""
                          : "Tell us about your institution and what you're looking for..."
                      }
                      rows={3}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-[6px] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none font-body"
                    />
                  </motion.div>

                  {/* Privacy policy checkbox */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.36 }}
                    className="flex items-start gap-2.5 pt-1"
                  >
                    <button
                      type="button"
                      onClick={() => setAgreedToPolicy(!agreedToPolicy)}
                      className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                        agreedToPolicy
                          ? "bg-primary border-primary"
                          : "border-white/30 hover:border-white/50"
                      }`}
                    >
                      {agreedToPolicy && (
                        <Check className="w-2.5 h-2.5 text-white" />
                      )}
                    </button>
                    <label
                      onClick={(e) => {
                        // Don't toggle if clicking on links
                        const target = e.target as HTMLElement;
                        if (target.tagName !== "A" && !target.closest("a")) {
                          setAgreedToPolicy(!agreedToPolicy);
                        }
                      }}
                      className="text-xs text-white/60 font-body cursor-pointer flex-1"
                    >
                      You agree to our{" "}
                      <a
                        href="https://www.passage.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-white/80 underline hover:text-white transition-colors"
                      >
                        privacy policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://www.passage.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-white/80 underline hover:text-white transition-colors"
                      >
                        terms of service
                      </a>
                      .
                    </label>
                  </motion.div>

                  {/* Submit button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.39 }}
                    className="mt-4"
                  >
                    <button
                      type="submit"
                      disabled={!agreedToPolicy || isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-[6px] transition-all shadow-lg shadow-black/30 ring-1 ring-white/10 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:bg-white/40 disabled:text-black/60 disabled:shadow-none disabled:hover:bg-white/40 group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
