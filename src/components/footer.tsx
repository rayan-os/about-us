"use client";

import staticPassageLogo from "@/assets/icons/static-passage-logo.svg";
import { motion, useInView } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerLinks: Record<string, FooterSection> = {
  company: {
    title: "Company",
    links: [
      { name: "About us", href: "https://www.passage.com/about" },
      { name: "Blog", href: "https://www.passage.com/blog" },
      { name: "Careers", href: "https://www.passage.com/about#about-career" },
      { name: "Student stories", href: "https://www.passage.com/stories" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Help center", href: "https://help.passage.com/en/" },
      { name: "Status", href: "https://status.passage.com/" },
      { name: "Contact", href: "https://www.passage.com/contact" },
    ],
  },
};

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a15] to-background" />

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-32">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 sm:gap-10 lg:gap-12">
          {/* Logo column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-xs"
          >
            <a href="/ai" className="inline-block mb-4">
              <Image
                src={staticPassageLogo}
                alt="Passage"
                width={119}
                height={27}
                className="h-[22px] sm:h-[27px] w-auto"
                priority
              />
            </a>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              The most advanced AI engine for processing applications. We
              connect talent to life-changing opportunities through intelligent
              automation.
            </p>
            <a
              href="https://www.google.com/maps/place/Bay+Adelaide+Centre,+333+Bay+St.,+Toronto,+ON+M5H+2R2/@43.6502657,-79.3806089,20.21z"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-white/70 text-xs sm:text-sm transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>333 Bay St, Toronto, ON, Canada</span>
            </a>
          </motion.div>

          {/* Link columns */}
          <div className="flex gap-10 sm:gap-16 md:gap-20">
            {Object.entries(footerLinks).map(([key, section], sectionIndex) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h3 className="text-white font-medium text-sm sm:text-base mb-3 sm:mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: sectionIndex * 0.1 + linkIndex * 0.05,
                      }}
                    >
                      <a
                        href={link.href}
                        className="text-white/50 hover:text-white transition-colors text-xs sm:text-sm flex items-center gap-1 group"
                      >
                        {link.name}
                        {link.external && (
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Large wordmark */}
      <div className="relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="relative w-[85%] sm:w-[75%] md:w-[70%] flex items-baseline justify-center"
        >
          {/* Official Passage Logo SVG */}
          <svg
            viewBox="0 0 103 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[80px] sm:h-[120px] md:h-[160px] lg:h-[218px] w-auto opacity-[0.03]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0V17.9088H3.66102V13.0245H6.91526C8.64141 13.0245 10.2969 12.3384 11.5174 11.1171C12.738 9.89586 13.4237 8.23944 13.4237 6.51227C13.4237 4.78511 12.738 3.12869 11.5174 1.9074C10.2969 0.686113 8.64141 0 6.91526 0H0ZM6.50915 9.76841H3.66102V3.25614H6.50848C7.37156 3.25614 8.19928 3.59919 8.80957 4.20983C9.41986 4.82048 9.76271 5.64869 9.76271 6.51227C9.76271 7.37585 9.41986 8.20406 8.80957 8.81471C8.19944 9.4252 7.37199 9.76823 6.50915 9.76841Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.9322 18.3158C16.4746 18.3158 13.4237 15.2632 13.4237 11.3965C13.4237 7.52985 16.4746 4.47719 19.9322 4.47719C22.3729 4.47719 23.1864 5.29122 23.7966 5.90175L24.2034 4.88424H27.2542V17.9088H24.2034L23.7966 16.8912C23.1864 17.5017 22.3729 18.3158 19.9322 18.3158ZM16.8814 11.3965C16.8814 9.36142 18.5906 7.73335 20.6245 7.73335C22.6584 7.73335 24.2034 9.36142 24.2034 11.3965C24.2034 13.4316 22.5763 15.0597 20.5424 15.0597C18.5085 15.0597 16.8814 13.4316 16.8814 11.3965Z"
              fill="white"
            />
            <path
              d="M31.6543 11.9605L31.6487 11.9583L31.6429 11.9564C29.9447 11.4136 28.6164 10.3345 28.6164 8.66824C28.6164 6.1765 30.8838 4.47719 33.573 4.47719C34.4274 4.47719 35.5808 4.64785 36.5551 5.23451C37.4758 5.78886 38.2486 6.72078 38.4569 8.27262H34.9554C34.9312 8.11736 34.8771 7.91589 34.7376 7.73366C34.525 7.45585 34.1501 7.26403 33.525 7.26403C33.06 7.26403 32.7232 7.41161 32.5021 7.63282C32.2846 7.85045 32.1936 8.12542 32.1936 8.35606C32.1936 8.82386 32.5163 9.15947 32.9149 9.40322C33.3172 9.6492 33.8492 9.83537 34.3793 9.9921L34.3827 9.99304C35.519 10.3075 36.6472 10.624 37.4958 11.2074C38.3263 11.7783 38.8896 12.6059 38.8896 13.9753C38.8896 16.6312 36.5551 18.3105 33.669 18.3105C32.6868 18.3105 31.4616 18.0874 30.4442 17.4472C29.4809 16.841 28.6944 15.856 28.4746 14.2989H32.0353C32.1669 14.8761 32.5206 15.19 32.8767 15.3522C33.2529 15.5237 33.6245 15.5236 33.7157 15.5236H33.717C34.0881 15.5236 34.4766 15.4183 34.7782 15.216C35.0823 15.012 35.3124 14.697 35.3124 14.2875C35.3124 14.0505 35.2662 13.8417 35.1588 13.6551C35.0522 13.4699 34.8942 13.322 34.6953 13.1919C34.3128 12.9418 33.7314 12.7294 32.9544 12.4457L32.9248 12.4349C32.5527 12.299 32.131 12.1449 31.6543 11.9605Z"
              fill="white"
            />
            <path
              d="M42.6374 11.9605L42.6317 11.9583L42.6259 11.9564C40.9277 11.4136 39.5994 10.3345 39.5994 8.66824C39.5994 6.1765 41.8669 4.47719 44.556 4.47719C45.4105 4.47719 46.5638 4.64785 47.5381 5.23451C48.4588 5.78886 49.2316 6.72078 49.44 8.27262H45.9384C45.9143 8.11736 45.8601 7.91589 45.7207 7.73366C45.508 7.45585 45.1331 7.26403 44.508 7.26403C44.0431 7.26403 43.7063 7.41161 43.4852 7.63282C43.2677 7.85045 43.1766 8.12542 43.1766 8.35606C43.1766 8.82386 43.4993 9.15947 43.898 9.40322C44.3002 9.6492 44.8322 9.83537 45.3624 9.9921L45.3658 9.99304C46.5021 10.3075 47.6303 10.624 48.4788 11.2074C49.3093 11.7783 49.8726 12.6059 49.8726 13.9753C49.8726 16.6312 47.5381 18.3105 44.652 18.3105C43.6698 18.3105 42.4447 18.0874 41.4273 17.4472C40.464 16.841 39.6775 15.856 39.4576 14.2989H43.0184C43.15 14.8761 43.5037 15.19 43.8597 15.3522C44.2359 15.5237 44.6075 15.5236 44.6987 15.5236H44.7C45.0711 15.5236 45.4597 15.4183 45.7613 15.216C46.0654 15.012 46.2954 14.697 46.2954 14.2875C46.2954 14.0505 46.2492 13.8417 46.1419 13.6551C46.0353 13.4699 45.8772 13.322 45.6784 13.1919C45.2959 12.9418 44.7145 12.7294 43.9375 12.4457L43.9079 12.4349C43.5358 12.299 43.114 12.1449 42.6374 11.9605Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M50.4407 11.3965C50.4407 15.2632 53.4915 18.3158 56.9492 18.3158C59.3898 18.3158 60.2034 17.5017 60.8136 16.8912L61.2204 17.9088H64.2712V4.88424H61.2204L60.8136 5.90175C60.2034 5.29122 59.3898 4.47719 56.9492 4.47719C53.4915 4.47719 50.4407 7.52985 50.4407 11.3965ZM57.6414 7.73335C55.6075 7.73335 53.8983 9.36142 53.8983 11.3965C53.8983 13.4316 55.5254 15.0597 57.5593 15.0597C59.5932 15.0597 61.2204 13.4316 61.2204 11.3965C61.2204 9.36142 59.6753 7.73335 57.6414 7.73335Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M72 18.3158C68.5424 18.3158 65.4915 15.2632 65.4915 11.3965C65.4915 7.52985 68.5424 4.47719 72 4.47719C74.4407 4.47719 75.2543 5.29122 75.8644 5.90175L76.2712 4.88424H79.3221V17.5017C79.3028 18.2928 79.2068 19.2437 78.8425 20.173C78.3886 21.3312 77.5462 22.37 76.1426 23.0853C73.9013 24.2275 69.8439 24.6429 66.4555 22.2688L68.3222 19.6016C70.565 21.173 73.3104 20.8745 74.6657 20.1838C75.3373 19.8415 75.6404 19.4244 75.813 18.9841C76.0103 18.4807 76.0678 17.8645 76.0678 17.0947V16.8912C75.4576 17.5017 74.4407 18.3158 72 18.3158ZM68.9492 11.3965C68.9492 9.36142 70.6584 7.73335 72.6923 7.73335C74.7262 7.73335 76.2712 9.36142 76.2712 11.3965C76.2712 13.4316 74.6441 15.0597 72.6102 15.0597C70.5763 15.0597 68.9492 13.4316 68.9492 11.3965Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M80.5424 11.3965C80.5424 15.2179 83.6385 18.3158 87.4577 18.3158C87.9528 18.3159 90.7196 18.3164 93.0132 16.2764L90.8512 13.8427C89.4998 15.0447 87.8044 15.0596 87.4576 15.0596C85.9522 15.0596 84.6714 14.0403 84.1968 12.6175H94.2656C94.3361 12.2212 94.3729 11.8131 94.3729 11.3965C94.3729 7.57506 91.2768 4.47719 87.4577 4.47719C83.6385 4.47719 80.5424 7.57506 80.5424 11.3965ZM90.7185 10.1754C90.2439 8.75267 88.9631 7.73332 87.4577 7.73332C85.9522 7.73332 84.6714 8.75267 84.1968 10.1754H90.7185Z"
              fill="white"
            />
            <ellipse
              cx="99.7697"
              cy="15.3"
              rx="2.99825"
              ry="3"
              fill="#FF6F00"
            />
          </svg>

          {/* Gradient overlay on wordmark */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a15] via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-white/30 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Passage AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <a
                href="https://www.passage.com/about#about-career"
                className="text-white/30 hover:text-white/50 text-xs sm:text-sm transition-colors"
              >
                Careers
              </a>
              <a
                href="https://www.passage.com/privacy"
                className="text-white/30 hover:text-white/50 text-xs sm:text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.passage.com/terms"
                className="text-white/30 hover:text-white/50 text-xs sm:text-sm transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
