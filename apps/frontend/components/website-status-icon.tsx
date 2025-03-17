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
        status === "up"
          ? "bg-monitor-up text-white"
          : status === "down"
            ? "bg-monitor-down text-white"
            : "bg-monitor-unknown text-white",
        className,
      )}
    >
      {status === "up" && <Check size={size} />}
      {status === "down" && <X size={size} />}
      {status === "unknown" && <HelpCircle size={size} />}
    </div>
  );
}
