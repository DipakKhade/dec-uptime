import { Check, X, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WebsiteStatus } from "@/app/types/website";

interface WebsiteStatusIconProps {
  status: WebsiteStatus;
  size?: number;
  className?: string;
}

export function WebsiteStatusIcon({
  status,
  size = 16,
  className,
}: WebsiteStatusIconProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full w-6 h-6 transition-all",
        status === "good"
          ? "bg-monitor-up text-white"
          : status === "bad"
            ? "bg-monitor-down text-white"
            : "bg-monitor-unknown text-white",
        className,
      )}
    >
      {status === "good" && <Check className="text-green-500" size={size} />}
      {status === "bad" && <X className="text-red-500" size={size} />}
      {status === "unknown" && <HelpCircle size={size} />}
    </div>
  );
}
