import { Activity } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const Appbar = () => {
  return (
    <>
      <nav className="flex items-center space-x-1 justify-between px-4 py-4">
        <Link href="/">
          <div className="flex gap-2">
            <Activity className="h-6 w-6 text-solana" />
            <span className="font-bold text-xl gradient-text">dec-uptime</span>
          </div>
        </Link>
        <div>
          <div className="flex items-center space-x-1">
            <Link
              href="/moniter"
              className="text-sm font-medium transition-colors hover:text-solana px-3 py-2"
            >
              Moniter
            </Link>
            <div className="flex space-x-3.5">
              <ModeToggle />
              <div className="pt-1">
                <SignedOut>
                  <Link href="/signin">
                    <Button className="text-sm font-medium transition-colors hover:text-solana px-3 py-2 cursor-pointer">
                      Sign In
                    </Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
