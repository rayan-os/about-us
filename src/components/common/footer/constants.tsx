import { IoLogoLinkedin, IoLogoYoutube } from "react-icons/io5";
import { FaXTwitter, FaSquareFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FooterLink, SocialLink } from "./types";

// Footer data arrays
export const opportunitiesLinks: FooterLink[] = [
  {
    name: "Skilled trades",
    href: "https://www.passage.com/opportunities/skilled-trades",
  },
  {
    name: "Healthcare",
    href: "https://www.passage.com/opportunities/healthcare",
  },
  {
    name: "STEM",
    href: "https://www.passage.com/opportunities/stem",
  },
  // {
  //   name: "Nursing career pathway",
  //   href: "https://www.passage.com/opportunities/us-nursing",
  // },
  {
    name: "Loan calculator",
    href: "https://app.passage.com/loan",
  },
];

export const companyLinks: FooterLink[] = [
  {
    name: "About us",
    href: "https://www.passage.com/about",
  },
  {
    name: "Blog",
    href: "https://www.passage.com/blog",
  },
  {
    name: "Careers",
    href: "https://www.passage.com/about#about-career",
  },
  {
    name: "Student stories",
    href: "https://www.passage.com/stories",
  },
];

export const supportLinks: FooterLink[] = [
  {
    name: "Help center",
    href: "https://help.passage.com/en/",
  },
  {
    name: "Status",
    href: "https://status.passage.com/",
  },
  {
    name: "Contact",
    href: "https://www.passage.com/contact",
  },
];

export const getInvolvedLinks: FooterLink[] = [
  {
    name: "Afghan program",
    href: "https://www.passage.com/afghan-program",
  },
  {
    name: "Partners",
    href: "https://www.passage.com/referral-partners",
  },
  {
    name: "For educators",
    href: "https://www.passage.com/for-educators",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/passagehq/posts/?feedView=all",
    icon: IoLogoLinkedin,
    ariaLabel: "LinkedIn",
  },
  {
    name: "Twitter",
    href: "https://x.com/PassageHQ",
    icon: FaXTwitter,
    ariaLabel: "Twitter",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/passagehq/",
    icon: FaSquareFacebook,
    ariaLabel: "Facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/passagehq/",
    icon: RiInstagramFill,
    ariaLabel: "Instagram",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@PassageHQ",
    icon: IoLogoYoutube,
    ariaLabel: "YouTube",
  },
];

export enum LegalLinkName {
  PRIVACY_POLICY = "Privacy policy",
  TERMS_OF_SERVICE = "Terms of service",
  WITHDRAWAL_POLICY = "Withdrawal policy",
}

export const legalLinks: FooterLink[] = [
  {
    name: LegalLinkName.PRIVACY_POLICY,
    href: "https://www.passage.com/privacy",
  },
  {
    name: LegalLinkName.TERMS_OF_SERVICE,
    href: "https://www.passage.com/terms",
  },
  {
    name: LegalLinkName.WITHDRAWAL_POLICY,
    href: "https://www.passage.com/legal/withdrawal-policy",
  },
];
