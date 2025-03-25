"use client";
import { WebsiteMonitor } from "@/components/website-moniter";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    router.push("/signin");
  }
  return (
    <>
      <div className="min-h-screen bg-monitor-bg">
        <WebsiteMonitor />
      </div>
    </>
  );
}
