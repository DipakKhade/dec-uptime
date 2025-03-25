import { WebsiteStatus } from "@/app/types/website";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface StatusChartProps {
  history: {
    status: WebsiteStatus;
    latency: number;
    createdAt: Date;
  }[];
  className?: string;
}

export function StatusChart({ history, className }: StatusChartProps) {
  const [ currentHistry, SetCurrentHistry ] = useState<{
    status: WebsiteStatus;
    latency: number;
    createdAt: Date;
  }[] | undefined>();

  useEffect(()=>{
    SetCurrentHistry(()=>{
      if(history.length !== 12){
        for(let i = 0; i < 12 - (history.length ?? 0); i++){
         history.unshift({
          status: "unknown",
          latency: 0,
          createdAt: new Date()
         })
        }
        return [...history];
      }else{
        return [...history];
      }
    })
  },[history])

  console.log('currentHistry',currentHistry);

  return (
    <div className={cn("grid gap-2 grid-cols-30 w-full", className)}>
      {currentHistry?.map((entry, index) => (
        <div
          key={index}
          className={cn(
            "h-[10px] border rounded-md duration-300 ease-in-out",
            entry.status === "good"
              ? "bg-green-400"
              : entry.status === "bad"
                ? "bg-red-400"
                : "bg-gray-400",
          )}
          style={{
            animationDelay: `${index * 10}ms`,
          }}
        >
        </div>
      ))}
    </div>
  );
}
