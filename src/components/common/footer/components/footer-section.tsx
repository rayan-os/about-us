import Link from "next/link";
import { FooterLink } from "../types";

interface Props {
  title: string;
  links: FooterLink[];
}
// Shared Components
export const FooterSection = ({ title, links }: Props) => (
  <div className="space-y-4">
    <h3 className="font-medium text-sm text-white">{title}</h3>
    <div className="space-y-2">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="block text-white/50 hover:text-white transition-colors text-sm"
          target="_blank"
        >
          {link.name}
        </Link>
      ))}
    </div>
  </div>
);
