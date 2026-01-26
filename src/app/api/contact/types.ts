export interface ContactFormData {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export interface IntercomContact {
  id: string;
  role: "lead" | "user";
  email: string;
  name: string;
  custom_attributes?: {
    title?: string;
    company?: string;
    phone?: string;
    demo_request?: boolean;
  };
}

export interface IntercomError {
  errors: Array<{
    code: string;
    message: string;
  }>;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  contactId?: string;
  timestamp?: string;
}
