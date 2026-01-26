import { INTERCOM_CONFIG } from "./constants";
import { ContactFormData, IntercomContact, IntercomError } from "./types";

export const getIntercomHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
  "Content-Type": "application/json",
  "Intercom-Version": INTERCOM_CONFIG.VERSION,
});

export const extractContactIdFromError = (
  errorMessage: string
): string | null => {
  const match = errorMessage.match(/id=([a-f0-9]+)/);
  return match?.[1] || null;
};

export const createIntercomContact = async (
  data: ContactFormData,
  token: string
): Promise<IntercomContact> => {
  const contactData = {
    role: "lead",
    email: data.email,
    name: `${data.firstName} ${data.lastName}`,
  };

  const response = await fetch(`${INTERCOM_CONFIG.API_BASE}/contacts`, {
    method: "POST",
    headers: getIntercomHeaders(token),
    body: JSON.stringify(contactData),
  });

  if (response.ok) {
    return await response.json();
  }

  const errorData: IntercomError = await response.json();
  throw new Error(JSON.stringify(errorData));
};

export const getExistingContact = async (
  contactId: string,
  token: string
): Promise<IntercomContact> => {
  const response = await fetch(
    `${INTERCOM_CONFIG.API_BASE}/contacts/${contactId}`,
    {
      method: "GET",
      headers: getIntercomHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve existing contact");
  }

  return await response.json();
};

export const updateContactName = async (
  contactId: string,
  name: string,
  token: string
): Promise<void> => {
  try {
    await fetch(`${INTERCOM_CONFIG.API_BASE}/contacts/${contactId}`, {
      method: "PUT",
      headers: getIntercomHeaders(token),
      body: JSON.stringify({ name }),
    });
  } catch (error) {
    console.warn("Failed to update contact name:", error);
  }
};

export const updateContactAttributes = async (
  contactId: string,
  formData: ContactFormData,
  token: string
): Promise<void> => {
  try {
    const customAttributes: Record<string, string | boolean> = {
      "Demo Request": true,
      "Submission Date": new Date().toISOString(),
    };

    // Add title if provided
    if (formData.title) {
      customAttributes["Title"] = formData.title;
    }

    // Add company if provided
    if (formData.company) {
      customAttributes["Company"] = formData.company;
    }

    // Add phone if provided
    if (formData.phone) {
      customAttributes["Phone"] = formData.phone;
    }

    const updateData = {
      custom_attributes: customAttributes,
    };

    await fetch(`${INTERCOM_CONFIG.API_BASE}/contacts/${contactId}`, {
      method: "PUT",
      headers: getIntercomHeaders(token),
      body: JSON.stringify(updateData),
    });
  } catch (error) {
    console.warn("Failed to update custom attributes:", error);
  }
};

export const createConversation = async (
  contact: IntercomContact,
  formData: ContactFormData,
  token: string
): Promise<void> => {
  // Create a detailed conversation body
  let conversationBody = `New contact form submission received!\n\n`;

  // Contact details
  conversationBody += `📋 Contact Details:\n`;
  conversationBody += `• Name: ${formData.firstName} ${formData.lastName}\n`;
  conversationBody += `• Email: ${formData.email}\n`;

  if (formData.title) {
    conversationBody += `• Title: ${formData.title}\n`;
  }

  if (formData.company) {
    conversationBody += `• Company: ${formData.company}\n`;
  }

  if (formData.phone) {
    conversationBody += `• Phone: ${formData.phone}\n`;
  }

  // Add message if provided
  if (formData.message && formData.message.trim()) {
    conversationBody += `\n💬 Message:\n${formData.message}\n`;
  }

  conversationBody += `\n⏰ Submitted: ${new Date().toLocaleString()}\n`;
  conversationBody += `\n🎯 Action: Please follow up with this lead for their personalized demo.`;

  const conversationData = {
    from: {
      type: "lead",
      id: contact.id,
    },
    body: conversationBody,
    message_type: "email",
    subject: "New Demo Request",
  };

  try {
    const response = await fetch(`${INTERCOM_CONFIG.API_BASE}/conversations`, {
      method: "POST",
      headers: getIntercomHeaders(token),
      body: JSON.stringify(conversationData),
    });

    if (!response.ok) {
      console.warn("Failed to create conversation");
    }
  } catch (error) {
    console.warn("Failed to create conversation:", error);
  }
};

export const handleExistingContact = async (
  error: IntercomError,
  formData: ContactFormData,
  token: string
): Promise<IntercomContact> => {
  const conflictError = error.errors.find((e) => e.code === "conflict");
  if (!conflictError) {
    throw new Error("Contact creation failed");
  }

  const existingContactId = extractContactIdFromError(conflictError.message);
  if (!existingContactId) {
    throw new Error("Could not extract contact ID from conflict error");
  }

  const contact = await getExistingContact(existingContactId, token);
  await updateContactName(
    contact.id,
    `${formData.firstName} ${formData.lastName}`,
    token
  );

  return contact;
};

export const processContactCreation = async (
  formData: ContactFormData,
  token: string
): Promise<IntercomContact> => {
  try {
    return await createIntercomContact(formData, token);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorData: IntercomError = JSON.parse(errorMessage);
    return await handleExistingContact(errorData, formData, token);
  }
};

export const addTagToContact = async (
  contactId: string,
  tag: string,
  token: string
): Promise<void> => {
  try {
    const tagData = {
      name: tag,
      contacts: [{ id: contactId }],
    };

    await fetch(`${INTERCOM_CONFIG.API_BASE}/tags`, {
      method: "POST",
      headers: getIntercomHeaders(token),
      body: JSON.stringify(tagData),
    });
  } catch (error) {
    console.warn("Failed to add tag to contact:", error);
  }
};
