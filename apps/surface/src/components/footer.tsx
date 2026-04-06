import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "./navbar/logo";

const footerLinks = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
  {
    title: "Privacy",
    href: "#privacy",
  },
];

const Footer = () => {
  return (
    <footer className="dark:border-t mt-40 dark bg-background text-foreground overflow-hidden pt-16 sm:pt-24 lg:pt-32">
      <div className="max-w-screen-xl mx-auto px-6 xl:px-0">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24 mb-16 lg:mb-24">
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <h6 className="text-xl font-semibold">Stay up to date</h6>
            <form className="flex items-center gap-2">
              <Input type="email" placeholder="Enter your email" className="h-12" />
              <Button className="h-12" size="lg">Subscribe</Button>
            </form>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-lg mb-2">Links</h4>
              {footerLinks.map(({ title, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="text-muted-foreground hover:text-foreground text-sm sm:text-base font-medium transition-colors"
                >
                  {title}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold text-lg mb-2">Socials</h4>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm sm:text-base font-medium transition-colors">
                <TwitterIcon className="h-5 w-5" /> Twitter
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm sm:text-base font-medium transition-colors">
                <DribbbleIcon className="h-5 w-5" /> Dribbble
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm sm:text-base font-medium transition-colors">
                <TwitchIcon className="h-5 w-5" /> Twitch
              </Link>
              <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm sm:text-base font-medium transition-colors">
                <GithubIcon className="h-5 w-5" /> GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
          
      {/* Big text section */}
      <div className="w-full flex justify-center items-center pb-6 md:pb-8 select-none pointer-events-none px-4 overflow-hidden">
        <h1 className="text-[20vw] xl:text-[21vw] leading-[0.8] font-black tracking-tighter bg-linear-to-b from-foreground to-foreground/20 bg-clip-text text-transparent whitespace-nowrap scale-y-110 origin-bottom">
          QueueUp
        </h1>
      </div>

      <Separator />
      
      <div className="max-w-screen-xl mx-auto">
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-y-4 px-6 xl:px-0">
          <span className="text-muted-foreground text-sm text-center sm:text-start">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-foreground transition-colors">
              QueueUp
            </Link>
            . All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <Link href="#privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
