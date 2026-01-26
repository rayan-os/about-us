"use client";

import StaticPassageLogo from "@/assets/icons/static-passage-logo.svg";
import Orb from "@/components/ui/orb";
import ShinyText from "@/components/ui/shiny-text";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

function SplitHalfCard({
  title,
  description,
  image,
  href,
  imagePosition = "center",
  customBackground,
}: {
  title: string;
  description: string;
  image?: string;
  href: string;
  imagePosition?: string;
  customBackground?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative block min-h-[300px] sm:min-h-[350px] md:min-h-0 w-full overflow-hidden rounded-xl"
    >
      {customBackground ? (
        <div className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
          {customBackground}
        </div>
      ) : image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: imagePosition }}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 z-10">
        <h3 className="text-xl sm:text-2xl md:text-2xl font-body font-semibold text-white">
          {title}
        </h3>
        <p className="text-white/80 text-sm sm:text-base mt-1.5 sm:mt-2 max-w-md leading-relaxed">
          {description}
        </p>
        <span className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-white/90 text-sm font-medium group-hover:text-white transition-colors">
          Explore
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-4 sm:h-4"
          >
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            <path d="m21 3-9 9" />
            <path d="M15 3h6v6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-black flex flex-col p-4 sm:p-5 md:p-6">
      {/* Header - compact */}
      <header className="flex-shrink-0 pb-4 sm:pb-5 md:pb-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 sm:grid sm:grid-cols-3 sm:items-center sm:gap-0">
          <div className="self-center sm:self-auto sm:justify-self-start">
            <Image
              src={StaticPassageLogo}
              alt="Passage"
              className="h-[20px] sm:h-[26px] w-auto"
            />
          </div>
          <div className="sm:justify-self-center">
            <ShinyText
              text="Providing access to life-changing opportunities"
              className="text-xs md:text-sm text-center select-none sm:whitespace-nowrap"
              color="#777"
              shineColor="#fff"
              speed={3}
            />
          </div>
          <div
            className="hidden sm:block sm:justify-self-end opacity-0"
            aria-hidden
          >
            <Image
              src={StaticPassageLogo}
              alt=""
              className="h-[20px] sm:h-[26px] w-auto"
            />
          </div>
        </div>
      </header>

      {/* 50/50 split - with rounded corners and gap */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 min-h-0 w-full">
        <SplitHalfCard
          title="Admission and Financing for International Students"
          description="Financing up to $65,000 for the most ambitious international students to study in Canada"
          image="/assets_ai/college-2.png"
          imagePosition="center 40%"
          href="https://www.passage.com/students"
        />
        <SplitHalfCard
          title="Passage AI for Universities & Colleges"
          description="Deliver a faster, smoother application experience with 24/7 multilingual AI counseling and real-time document and eligibility screening"
          href="/ai"
          customBackground={
            <div className="absolute font-display inset-0 bg-[#111111] flex items-center justify-center">
              <div
                className="relative"
                style={{
                  width: "min(150%, 800px)",
                  height: "min(150%, 800px)",
                }}
              >
                <Orb
                  hoverIntensity={0.25}
                  rotateOnHover={false}
                  hue={0}
                  forceHoverState={false}
                  backgroundColor="#333333"
                />
                <div className="absolute inset-0 flex items-center justify-center"></div>
              </div>
            </div>
          }
        />
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 pt-4 sm:pt-5 md:pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/50">
          <span>©{new Date().getFullYear()} Passage. All rights reserved.</span>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="https://www.passage.com/about#about-career"
              className="hover:text-white/80 transition-colors"
            >
              Careers
            </Link>
            <Link
              href="https://www.passage.com/privacy"
              className="hover:text-white/80 transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              href="https://www.passage.com/terms"
              className="hover:text-white/80 transition-colors"
            >
              Terms of service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
