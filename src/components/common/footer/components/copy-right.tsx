import { companyLinks, legalLinks } from "../constants";
import { Links } from "./legal-links";

export const CopyRight = ({ droppedLinks }: { droppedLinks?: string[] }) => {
  const currentYear = new Date().getFullYear();

  const links = legalLinks.filter((link) => !droppedLinks?.includes(link.name));

  const careersLink = companyLinks.find((link) => link.name === "Careers");

  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-white/30">
      <div>© {currentYear} Passage. All rights reserved.</div>
      <Links
        links={[
          {
            name: "Careers",
            href: careersLink?.href ?? "#",
          },
          ...links,
        ]}
      />
    </div>
  );
};
