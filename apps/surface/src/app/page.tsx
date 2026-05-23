import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Pricing from "@/components/pricing";
import { Navbar } from "@/components/navbar";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import BackgroundWrapper from "@/components/background-wrapper";

export default function Home() {
  return (
    <>
      <main>
        <BackgroundWrapper>
          <Navbar />
          <Hero className="pt-32 xs:pt-30 sm:pt-34" />
        </BackgroundWrapper>
        <Features />
        <Pricing />
        <FAQ />
        <Testimonials />
        {/* <CTABanner /> */}
        <CTA />
        <Footer />
      </main>
    </>
  );
}
