"use client";

import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
// import { Stats } from "@/components/stats";
import { Agents } from "@/components/agents";
import { Footer } from "@/components/common/footer";
import { ContactFormProvider } from "@/components/contact-form-provider";
import { CTA } from "@/components/cta";
import { ProductSection } from "@/components/product-section";
import { Signals } from "@/components/signals";
import { Statement } from "@/components/statement";

export default function Home() {
  return (
    <ContactFormProvider>
      <main className="relative overflow-hidden">
        {/* Grain overlay for entire page */}
        <div className="grain pointer-events-none fixed inset-0 z-[100]" />

        {/* Navigation */}
        <Navigation />

        {/* Sections */}
        <Hero />
        <ProductSection />
        {/* <Partners /> */}
        {/* <PassportScrollerHero /> */}
        <Agents />
        {/* <ProductTabs /> */}
        {/* <ProductTabsVertical /> */}
        {/* <Solutions /> */}
        <Statement />
        {/* <Workflow /> */}
        {/* <Testimonials /> */}
        <Signals />
        {/* <PassportScroller /> */}
        {/* <Stats /> */}
        <CTA />
        <Footer />
      </main>
    </ContactFormProvider>
  );
}
