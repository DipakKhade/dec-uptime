import { WebsiteStatus } from "@/app/types/website";
import { cn } from "@/lib/utils";

interface StatusChartProps {
  history: { date: Date; status: WebsiteStatus }[];
  className?: string;
}

export function StatusChart({ history, className }: StatusChartProps) {
  console.log(history);
  return (
    <div className={cn("grid gap-2 grid-cols-30 w-full", className)}>
      {history?.map((entry, index) => (
        <div
          key={index}
          className={cn(
            "h-[10px] border rounded-md duration-300 ease-in-out",
            entry.status === "up"
              ? "bg-red-400"
              : entry.status === "down"
                ? "bg-green-400"
                : "bg-gray-400",
          )}
          style={{
            animationDelay: `${index * 10}ms`,
          }}
        />
      ))}
    </div>
  );
}
