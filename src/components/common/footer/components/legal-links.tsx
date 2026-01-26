import { FooterLink } from "../types";

interface Props {
  links: FooterLink[];
}

export const Links = ({ links }: Props) => (
  <div className="flex space-x-4">
    {links.map((link) => (
      <a
        key={link.name}
        href={link.href}
        className="text-white/30 hover:text-white/50 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.name}
      </a>
    ))}
  </div>
);
