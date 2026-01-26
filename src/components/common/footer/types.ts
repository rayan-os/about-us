// Types
export interface FooterLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }> | React.ReactNode;
  ariaLabel: string;
  type?: "image";
}
