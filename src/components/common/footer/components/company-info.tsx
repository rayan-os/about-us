import { MapPin } from "lucide-react";
import Image from "next/image";

import staticPassageLogo from "@/assets/icons/static-passage-logo.svg";

export const GoogleMapLink =
  "https://www.google.com/maps/place/Bay+Adelaide+Centre,+333+Bay+St.,+Toronto,+ON+M5H+2R2/@43.6502657,-79.3806089,20.21z/data=!4m10!1m2!2m1!1s333+Bay+St,+Toronto,+ON,+Canada!3m6!1s0x882b34cd369d5bbd:0xfe4cdc7c0cc6896b!8m2!3d43.6503406!4d-79.3805207!15sCh8zMzMgQmF5IFN0LCBUb3JvbnRvLCBPTiwgQ2FuYWRhkgERY29tcG91bmRfYnVpbGRpbmfgAQA!16s%2Fg%2F11byczjypv?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D";

export const CompanyInfo = () => {
  return (
    <div className="space-y-4 col-span-2">
      <div className="flex items-center space-x-2 ">
        <Image
          src={staticPassageLogo}
          alt="Passage"
          width={100}
          height={80}
          priority
        />
      </div>

      <p className="text-white/50 text-sm leading-relaxed">
        The most advanced AI engine for processing applications. We connect
        talent to life-changing opportunities through intelligent automation.
      </p>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="w-4 h-4 text-[#f76a1c]" />
          <a
            href={GoogleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white/70 transition-colors cursor-pointer underline-offset-4 hover:underline"
          >
            333 Bay St, Toronto, ON, Canada
          </a>
        </div>
      </div>
    </div>
  );
};
