import { Activity } from "lucide-react"
import { ModeToggle } from "./ui/mode-toggle"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export const Appbar = () => {
    return <>
     <nav className="flex items-center space-x-1 justify-between px-4 py-4">
            <Link href="/">
        <div className="flex gap-2">
        <Activity className="h-6 w-6 text-solana" />
        <span className="font-bold text-xl gradient-text">dec-uptime</span>
        </div>
        </Link>
        <div>
        <div className="flex items-center space-x-1">
              <Link href="/websites" className="text-sm font-medium transition-colors hover:text-solana px-3 py-2">
                Your Websites
              </Link>
             
              <ModeToggle />
              <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
        </div>
     </nav>
    </>
}

