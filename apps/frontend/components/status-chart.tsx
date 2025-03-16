
import { WebsiteStatus } from "@/app/types/website";
import { cn } from "@/lib/utils";

interface StatusChartProps {
  history: { date: Date; status: WebsiteStatus }[];
  className?: string;
}

export function StatusChart({ history, className }: StatusChartProps) {
  // Ensure we have data to display
  const displayHistory = history.length > 0 
    ? history 
    : Array(30).fill({ status: 'unknown' as WebsiteStatus });

  return (
    <div className={cn("grid gap-2 grid-cols-30 w-full", className)}>
      {displayHistory.map((entry, index) => (
        <div
          key={index}
          className={cn(
            "h-[20px] border rounded-md duration-300 ease-in-out",
            entry.status === 'up' ? "bg-red-400" : 
            entry.status === 'down' ? "bg-green-400" : 
            "bg-gray-400"
          )}
          style={{
            animationDelay: `${index * 10}ms`
          }}
        />
      ))}
    </div>
  );
}