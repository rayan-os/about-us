"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ContactForm } from "./contact-form";

interface ContactFormContextType {
  openContactForm: () => void;
  closeContactForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(
  undefined
);

export function useContactForm() {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("useContactForm must be used within a ContactFormProvider");
  }
  return context;
}

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContactForm = () => setIsOpen(true);
  const closeContactForm = () => setIsOpen(false);

  return (
    <ContactFormContext.Provider value={{ openContactForm, closeContactForm }}>
      {children}
      <ContactForm isOpen={isOpen} onClose={closeContactForm} />
    </ContactFormContext.Provider>
  );
}
