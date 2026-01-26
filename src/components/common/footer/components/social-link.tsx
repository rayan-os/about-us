import Image from "next/image";
import { SocialLink as SocialLinkType } from "../types";

interface Props {
  social: SocialLinkType;
}

export const SocialLink = ({ social }: Props) => {
  const IconComponent = social.icon as React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  const isImage = social.type === "image";
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center transition-all duration-200 hover:opacity-70 active:opacity-50 active:scale-95"
      aria-label={social.ariaLabel}
    >
      {isImage ? (
        <Image
          src={social.icon as string}
          alt={social.ariaLabel}
          width={20}
          height={20}
        />
      ) : (
        <IconComponent className="w-5 h-5" style={{ color: "#959595" }} />
      )}
    </a>
  );
};
