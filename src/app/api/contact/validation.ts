import { ContactFormData } from "./types";

export const validateFormData = (data: ContactFormData): string | null => {
  // Required fields
  if (
    !data.firstName.trim() ||
    !data.lastName.trim() ||
    !data.title.trim() ||
    !data.company.trim() ||
    !data.email.trim()
  ) {
    return "Missing required fields: all fields except phone and message are required";
  }

  // First name validation
  if (data.firstName.trim().length < 1 || data.firstName.trim().length > 50) {
    return "First name must be between 1 and 50 characters";
  }

  // Last name validation
  if (data.lastName.trim().length < 1 || data.lastName.trim().length > 50) {
    return "Last name must be between 1 and 50 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return "Invalid email format";
  }

  // Phone validation (digits and common separators)
  const phoneRegex = /^[\d+()\s-]+$/;
  if (data.phone.trim() && !phoneRegex.test(data.phone)) {
    return "Phone number contains invalid characters";
  }

  // Message length validation
  if (data.message.trim() && data.message.trim().length > 2000) {
    return "Message must be less than 2000 characters";
  }

  return null;
};
