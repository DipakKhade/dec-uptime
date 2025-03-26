import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroAddWebsite } from "./hero-add-website";

export default function LandingPage() {
  return (
    <div className="">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] dark:opacity-[0.1]"></div>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-solana/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-0 -right-4 w-72 h-72 bg-solana-purple/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Global Website Monitoring{" "}
                    <span className="gradient-text">Powered by Solana</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Monitor your website&apos;s uptime with our decentralized
                    network of Solana validators. Get real-time alerts and
                    detailed analytics.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href={'/monitor'}>
                  <Button
                    size="lg"
                    className="px-8 solana-gradient hover:opacity-90 transition-opacity group cursor-pointer"
                  >
                    Start Monitoring
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  </Link>
                </div>
              </div>
              <HeroAddWebsite/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
