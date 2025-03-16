import { Activity } from "lucide-react"
import { ModeToggle } from "./ui/mode-toggle"
import { Button } from "./ui/button"
import Link from "next/link"

export const Appbar = () => {
    return <>
     <nav className="flex items-center space-x-1 justify-around pt-4">
        <div className="flex gap-2">
        <Activity className="h-6 w-6 text-solana" />
        <span className="font-bold text-xl gradient-text">dec-uptime</span>
        </div>
        <div>
        <div className="flex items-center space-x-1">
              <Link href="#features" className="text-sm font-medium transition-colors hover:text-solana px-3 py-2">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-solana px-3 py-2">
                Pricing
              </Link>
              <Link href="#about" className="text-sm font-medium transition-colors hover:text-solana px-3 py-2">
                About
              </Link>
              <Link href="#contact" className="text-sm font-medium transition-colors hover:text-solana px-3 py-2">
                Contact
              </Link>
              <ModeToggle />
              <Button className="solana-gradient hover:opacity-90 transition-opacity">Sign In</Button>
            </div>
        </div>
     </nav>
    </>
}

