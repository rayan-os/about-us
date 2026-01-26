"use client";

import { Separator } from "@/components/ui/separator";

import { CountDown } from "@/components/ui/count-down";
import {
  CompanyInfo,
  CopyRight,
  FooterSection,
  SocialLink,
} from "./components";

import {
  companyLinks,
  socialLinks,
  supportLinks,
} from "./constants";

export const Footer = () => {
  return (
    <footer className="text-white py-16 bg-[#151515]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <CompanyInfo />

          <div className="grid grid-cols-1 sm:grid-cols-2 col-span-2 gap-12">
            <FooterSection title="Company" links={companyLinks} />
            <FooterSection title="Support" links={supportLinks} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-3 mb-12 gap-8">
          <p className="text-lg text-white/50 text-center">
            By 2030, our goal is to change the lives of 1,000,000 people
          </p>
          <CountDown targetDate={new Date(2030, 0, 1)} />
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <CopyRight />

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <SocialLink key={social.name} social={social} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
