import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  CraftButton,
  CraftButtonIcon,
  CraftButtonLabel,
} from "@/components/ui/craft-button";
import { BackgroundPattern } from "@/components/bacckground-pattern";

const Hero = ({ className }: { className?: string }) => {
  return (
    <div
      data-aos="fade-up"
      className={`min-h-screen flex flex-col items-center justify-center py-20 px-6 ${className}`}
    >
      <BackgroundPattern />
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <Badge className="bg-primary rounded-full py-1 border-none">
            v1.0.0 is available now! 🚀
          </Badge>
          <h1 className="mt-6 mx-auto max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.2]! tracking-tight">
            Customized Shadcn UI Blocks & Components
          </h1>
          <p className="mt-6 mx-auto max-w-[60ch] xs:text-lg">
            Explore a collection of Shadcn UI blocks and components, ready to
            preview and copy. Streamline your development workflow with
            easy-to-implement examples.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Link href="/auth/signup">
              <CraftButton size="lg">
                <CraftButtonLabel>Get Started</CraftButtonLabel>
                <CraftButtonIcon>
                  <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
                </CraftButtonIcon>
              </CraftButton>
            </Link>
            {/* <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base shadow-none"
            >
              <CirclePlay className="h-5! w-5!" /> Watch Demo
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
