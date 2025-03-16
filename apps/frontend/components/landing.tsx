import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Shield, Clock, Activity, CheckCircle, Server, Zap, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
     
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
                      <Button className="w-full h-12 solana-gradient hover:opacity-90 transition-opacity">
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

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] dark:opacity-[0.1]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full solana-gradient px-4 py-1.5 text-sm font-medium text-white">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Powered by <span className="gradient-text">Solana Validators</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our global network of Solana validators provides the most reliable and decentralized uptime monitoring
                  available.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="rounded-full bg-solana/10 p-3 animate-glow">
                  <Globe className="h-6 w-6 text-solana" />
                </div>
                <h3 className="text-xl font-bold">Global Coverage</h3>
                <p className="text-center text-muted-foreground">
                  Monitors from multiple locations across the world using our decentralized Solana validator network.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="rounded-full bg-solana/10 p-3 animate-glow">
                  <Clock className="h-6 w-6 text-solana" />
                </div>
                <h3 className="text-xl font-bold">Real-time Alerts</h3>
                <p className="text-center text-muted-foreground">
                  Receive instant notifications via email, SMS, or webhook when your site goes down.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="rounded-full bg-solana/10 p-3 animate-glow">
                  <Shield className="h-6 w-6 text-solana" />
                </div>
                <h3 className="text-xl font-bold">Decentralized Security</h3>
                <p className="text-center text-muted-foreground">
                  Leveraging Solana's blockchain for secure, tamper-proof uptime records.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="rounded-full bg-solana/10 p-3 animate-glow">
                  <CheckCircle className="h-6 w-6 text-solana" />
                </div>
                <h3 className="text-xl font-bold">Status Pages</h3>
                <p className="text-center text-muted-foreground">
                  Create beautiful, customizable status pages to share with your users.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="rounded-full bg-solana/10 p-3 animate-glow">
                  <Server className="h-6 w-6 text-solana" />
                </div>
                <h3 className="text-xl font-bold">Detailed Analytics</h3>
                <p className="text-center text-muted-foreground">
                  Comprehensive reports and insights about your website's performance.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="rounded-full bg-solana/10 p-3 animate-glow">
                  <Zap className="h-6 w-6 text-solana" />
                </div>
                <h3 className="text-xl font-bold">Fast Response</h3>
                <p className="text-center text-muted-foreground">
                  Solana's high-speed network ensures the fastest possible detection of downtime.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute top-0 -right-4 w-72 h-72 bg-solana/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-full solana-gradient px-4 py-1.5 text-sm font-medium text-white">
                    How It Works
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    How Our <span className="gradient-text">Solana Validator Network</span> Works
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our revolutionary approach uses Solana validators distributed globally to check your website's
                    uptime from multiple locations simultaneously.
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 transition-colors hover:bg-muted">
                    <div className="rounded-full bg-solana/10 p-1">
                      <CheckCircle className="h-5 w-5 text-solana" />
                    </div>
                    <div>
                      <strong>Decentralized Monitoring:</strong> No single point of failure in our monitoring
                      infrastructure.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 transition-colors hover:bg-muted">
                    <div className="rounded-full bg-solana/10 p-1">
                      <CheckCircle className="h-5 w-5 text-solana" />
                    </div>
                    <div>
                      <strong>Blockchain Verification:</strong> All uptime data is cryptographically secured on the
                      Solana blockchain.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 transition-colors hover:bg-muted">
                    <div className="rounded-full bg-solana/10 p-1">
                      <CheckCircle className="h-5 w-5 text-solana" />
                    </div>
                    <div>
                      <strong>Global Consensus:</strong> Multiple validators must agree on your site's status for
                      maximum accuracy.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl solana-gradient opacity-70 blur-lg"></div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="Solana validator network diagram"
                    className="relative rounded-xl object-cover shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] dark:opacity-[0.1]"></div>
          <div className="absolute bottom-0 -left-4 w-72 h-72 bg-solana-purple/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full solana-gradient px-4 py-1.5 text-sm font-medium text-white">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Simple, <span className="gradient-text">Transparent Pricing</span>
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for you and your websites.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col rounded-xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground">For personal projects and small websites</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>1 website</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>5-minute check interval</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>Email alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>24 hours of history</span>
                  </li>
                </ul>
                <Button className="mt-6 solana-gradient hover:opacity-90 transition-opacity">Get Started</Button>
              </div>
              <div className="flex flex-col rounded-xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full solana-gradient px-3 py-1 text-xs font-medium text-white">
                  Popular
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-muted-foreground">For businesses and multiple websites</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold gradient-text">$29</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>10 websites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>1-minute check interval</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>Email, SMS, webhook alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>30 days of history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>Custom status page</span>
                  </li>
                </ul>
                <Button className="mt-6 solana-gradient hover:opacity-90 transition-opacity">Subscribe</Button>
              </div>
              <div className="flex flex-col rounded-xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">For large organizations and mission-critical sites</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>Unlimited websites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>30-second check interval</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>All alert types + API</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>1 year of history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>Priority Solana validators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-solana" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Button className="mt-6 gradient-border" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-solana/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full solana-gradient px-4 py-1.5 text-sm font-medium text-white">
                  Get Started
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to <span className="gradient-text">Get Started?</span>
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of websites already being monitored by our Solana validator network.
                </p>
              </div>
              <div className="mx-auto w-full max-w-md space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="rounded-lg border-input bg-background h-12 transition-all focus-visible:ring-2 focus-visible:ring-solana"
                    />
                  </div>
                  <Button type="submit" className="h-12 px-8 solana-gradient hover:opacity-90 transition-opacity">
                    Sign Up Free
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">No credit card required. Start with our free plan.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] dark:opacity-[0.05]"></div>
        <div className="container flex flex-col gap-6 py-8 md:py-12 lg:flex-row relative">
          <div className="flex flex-col gap-2 lg:w-1/3">
            <div className="flex gap-2 items-center">
              <Activity className="h-6 w-6 text-solana" />
              <span className="font-bold text-xl gradient-text">dec-uptime</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Decentralized website monitoring powered by Solana validators. Get real-time alerts when your site goes
              down.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-solana transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} dec-uptime. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-solana transition-colors">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-solana transition-colors">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-solana transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

