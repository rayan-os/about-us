import { NextRequest, NextResponse } from "next/server";
import { CONTACT_FORM_TAG } from "./constants";
import {
  addTagToContact,
  createConversation,
  processContactCreation,
  updateContactAttributes,
} from "./helpers";
import { ContactFormData } from "./types";
import { validateFormData } from "./validation";

// Runtime configuration
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate form data
    const validationError = validateFormData(formData);
    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          error: validationError,
        },
        { status: 400 }
      );
    }

    const intercomToken = process.env.INTERCOM_ACCESS_TOKEN;
    if (!intercomToken) {
      console.error("INTERCOM_ACCESS_TOKEN is not configured");
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    // Process contact creation (handles both new and existing contacts)
    const contact = await processContactCreation(formData, intercomToken);

    // Update contact attributes
    await updateContactAttributes(contact.id, formData, intercomToken);

    // Add tag to contact
    await addTagToContact(contact.id, CONTACT_FORM_TAG, intercomToken);

    // Create conversation
    await createConversation(contact, formData, intercomToken);

    return NextResponse.json({
      success: true,
      message: "Demo request submitted successfully",
      contactId: contact.id,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit your request. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Simple GET handler to test route recognition
export async function GET() {
  return NextResponse.json({
    message: "Contact API route is working",
    timestamp: new Date().toISOString(),
  });
}
