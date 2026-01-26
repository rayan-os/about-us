import { Calendar, DollarSign, UserCheck } from "lucide-react";
import { ChatMessagePrograms } from "./components/chat-message-programs";
import { ChatProgramCard } from "./components/chat-program-card";
import { ChatUploadFile } from "./components/chat-upload-file";
import { AgentEnum, SectionProps, TabsEnum } from "./types";

/**
 * Message content now supports both string and ReactNode types.
 *
 * Examples:
 * - String message: message: "Hello world"
 * - ReactNode message: message: <div><p>Hello</p><button>Click me</button></div>
 *
 * For ReactNode messages, create them in .tsx files where JSX is supported.
 */

const placeholders = [
  {
    sender: "bot",
    placeholder: 1,
  },
  {
    sender: "user",
    placeholder: 3,
  },
  {
    sender: "bot",
    placeholder: 2,
  },
  {
    sender: "user",
    placeholder: 3,
  },
  {
    sender: "bot",
    placeholder: 1,
  },
  {
    sender: "user",
    placeholder: 3,
  },
] as const;

export const studentSections: SectionProps[] = [
  {
    name: AgentEnum.JACKIE,
    subTitle: "AI Counselor",
    description:
      "Jackie answers any questions the student has about the programs and picks the best one for them.",
    messages: [
      {
        sender: "user",
        message: "hello 👋",
        username: "Emmanuel",
        country: "Nigeria 🇳🇬",
      },
      {
        sender: "bot",
        message:
          "Hi, I'm Jackie, your AI counselor. Tell me a bit about yourself so I can find you programs.",
        scroll: true,
      },
      {
        sender: "user",
        message:
          "I'm Emmanuel from Nigeria. I'm a high school student interested in computer.",
      },
      ...placeholders,
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/jackie.png",
  },
  {
    name: AgentEnum.DAVID,
    subTitle: "AI Processor",
    description:
      "David collects, verifies, and processes the student's documents to ensure they are eligible for the programs.",
    messages: [
      {
        sender: "bot",
        message: "Could you send me your passport and transcript?",
        scroll: true,
      },
      {
        sender: "user",
        message: (
          <ChatUploadFile
            fileName="Passport"
            fileSize={245760}
            fileType="jpg"
          />
        ),
      },
      {
        sender: "user",
        message: (
          <ChatUploadFile
            fileName="Transcript"
            fileSize={450000}
            fileType="pdf"
          />
        ),
      },
      ...placeholders,
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/david.png",
  },
  {
    name: AgentEnum.JACKIE,
    subTitle: "AI Counselor",
    description:
      "Jackie checks student's eligibility and picks the best program for them.",
    messages: [
      {
        sender: "bot",
        message: "Here are a few programs:",
      },
      {
        sender: "bot",
        message: <ChatMessagePrograms />,
        scroll: true,
        fullWidth: true,
      },
      ...placeholders,
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/jackie.png",
  },
  {
    name: AgentEnum.DAVID,
    subTitle: "AI Processor",
    description:
      "David works with the school to issue a letter of acceptance and provides them with the necessary documents.",
    messages: [
      {
        sender: "bot",
        message: "Here is your Letter of Acceptance",
      },
      {
        sender: "bot",
        message: (
          <ChatProgramCard
            title="Letter of Acceptance"
            description="Computer Systems Technician at George Brown College"
            actions={[
              {
                label: "View LOA",
              },
            ]}
          />
        ),
        scroll: true,
      },
      {
        sender: "user",
        message: "Thank you!",
      },
      {
        sender: "bot",
        message:
          "You're welcome! I'm here to help you with your questions and help you with your needs.",
        scroll: true,
      },
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/david.png",
  },
];

// Nurse-specific sections
const employerSections: SectionProps[] = [
  {
    name: AgentEnum.JACKIE,
    subTitle: "AI Counselor",
    description:
      "Jackie answers any questions the nurse has about the job and picks the best one for them.",
    messages: [
      {
        sender: "user",
        message: "hello 👋",
        username: "Christina",
        country: "Philippines 🇵🇭",
      },
      {
        sender: "bot",
        message: "Hi, I'm Jackie. I can help you find a nursing job in the US.",
        scroll: true,
      },
      ...placeholders,
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/jackie.png",
  },
  {
    name: AgentEnum.DAVID,
    subTitle: "AI Processor",
    description:
      "David collects, verifies, and processes the nurse's documents to ensure they are eligible for the job.",
    messages: [
      ...placeholders,
      {
        sender: "bot",
        message: "Could you send me your resume and RN license?",
        scroll: true,
      },
      {
        sender: "user",
        message: (
          <ChatUploadFile fileName="Resume" fileSize={145970} fileType="pdf" />
        ),
      },
      {
        sender: "user",
        message: (
          <ChatUploadFile
            fileName="RN-License"
            fileSize={145970}
            fileType="pdf"
          />
        ),
      },
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/david.png",
  },
  {
    name: AgentEnum.ELLA,
    subTitle: "AI Interviewer",
    description:
      "Ella conducts an AI video interview with the nurse to assess their skills and qualifications.",
    messages: [
      ...placeholders,
      {
        sender: "bot",
        message: "I have scheduled you for an AI video interview.",
      },
      {
        sender: "bot",
        message: (
          <ChatProgramCard
            title="AI Video Interview"
            icon={<Calendar className="w-4 h-4" />}
            description="11:00 AM, 12th July 2025"
            actions={[{ label: "View interview" }]}
          />
        ),
        scroll: true,
      },
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/ella.png",
  },
  {
    name: AgentEnum.DAVID,
    subTitle: "AI Processor",
    description:
      "David works with the employer to issue a job offer and provides them with the necessary documents.",
    messages: [
      ...placeholders,
      {
        sender: "bot",
        message: "Here is your job offer",
      },
      {
        sender: "bot",
        message: (
          <ChatProgramCard
            title="Job Offer"
            description="Registered Nurse at Acme Hospital"
            actions={[
              {
                label: "Sign now",
              },
            ]}
          />
        ),
        scroll: true,
      },
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/david.png",
  },
];

// Lenders-specific sections
const lendersSections: SectionProps[] = [
  {
    name: AgentEnum.JACKIE,
    subTitle: "AI Counselor",
    description:
      "Jackie answers any questions the borrower has about the loan and picks the best one for them.",
    messages: [
      {
        sender: "user",
        message: "hello 👋",
        username: "Olivia",
        country: "Canada 🇨🇦",
      },
      {
        sender: "bot",
        message: "Hi, I'm Jackie. I can help you with your loan application.",
        scroll: true,
      },
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/jackie.png",
  },
  {
    name: AgentEnum.DAVID,
    subTitle: "AI Processor",
    description:
      "David collects necessary documents and verifies the borrower's identity.",
    messages: [
      ...placeholders,
      {
        sender: "bot",
        message: "Can you upload your bank statements",
        scroll: true,
      },
      {
        sender: "user",
        message: (
          <ChatUploadFile
            fileName="Bank-Statements"
            fileSize={445970}
            fileType="pdf"
          />
        ),
      },
      ...placeholders,
      {
        sender: "bot",
        message: "Let's verify your identity",
        scroll: true,
      },
      {
        sender: "bot",
        message: (
          <ChatProgramCard
            title="KYC Verification"
            icon={<UserCheck className="w-4 h-4 text-white" />}
            description="Please follow the instructions to complete your KYC"
            actions={[{ label: "Start KYC" }]}
          />
        ),
      },
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/david.png",
  },
  {
    name: AgentEnum.DAVID,
    subTitle: "AI Processor",
    description:
      "David works with the lender to issue a loan offer and provides them with the necessary documents.",
    messages: [
      ...placeholders,
      {
        sender: "bot",
        message: "Here is your loan offer",
      },
      {
        sender: "bot",
        message: (
          <ChatProgramCard
            icon={<DollarSign className="w-4 h-4 text-white" />}
            title="Loan Offer Summary"
            description={
              <div className="text-white">
                <p>Amount: $100,000</p>
                <p>APR: 5%</p>
                <p>Loan Term: 10 years</p>
              </div>
            }
            actions={[{ label: "Sign now" }]}
          />
        ),
        scroll: true,
      },
    ],
    color: "bg-blue-500",
    avatar: "/assets_ai/images/david.png",
  },
];

export const tabs = [
  {
    name: TabsEnum.SCHOOLS,
    sections: studentSections,
  },
  {
    name: TabsEnum.EMPLOYERS,
    sections: employerSections,
  },
  {
    name: TabsEnum.LENDERS,
    sections: lendersSections,
  },
];
