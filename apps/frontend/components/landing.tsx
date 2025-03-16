import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Shield, Clock, Activity, CheckCircle, Server, Zap, ArrowRight } from "lucide-react"

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
                    Global Website Monitoring <span className="gradient-text">Powered by Solana</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Monitor your website's uptime with our decentralized network of Solana validators. Get real-time
                    alerts and detailed analytics.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="px-8 solana-gradient hover:opacity-90 transition-opacity group">
                    Start Monitoring
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 gradient-border">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-xl border bg-card p-6 shadow-lg w-full max-w-md gradient-border animate-float">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold gradient-text">Start Monitoring Now</h3>
                      <p className="text-sm text-muted-foreground">Enter your website URL to begin monitoring</p>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Input
                          type="url"
                          placeholder="https://yourwebsite.com"
                          className="rounded-lg border-input bg-background h-12 transition-all focus-visible:ring-2 focus-visible:ring-solana"
                        />
                      </div>
                      <Button className="w-full h-12 bg-green-400 cursor-pointer hover:opacity-90 transition-opacity">
                        Check Uptime
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      No credit card required. Start with our free plan.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

