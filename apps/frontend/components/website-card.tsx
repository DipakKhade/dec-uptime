
import { Website } from "@/app/types/website";
import { formatDistanceToNow } from "date-fns";
import { WebsiteStatusIcon } from "./website-status-icon";
import { StatusChart } from "./status-chart";
import { Trash2 } from "lucide-react";
import { BACKEND_URL } from "@/config";
import axios from "axios";

interface WebsiteCardProps {
  website: Website;
}

export function WebsiteCard({ website }: WebsiteCardProps) {

    const deleteWebsite = async() => {
        const res = await axios.delete(`${BACKEND_URL}/api/v1/deletesite`, {
            data: {
                url: website.id
            }
        });
        console.log(res.data);
    };
  return (
    <div className="bg-monitor-card rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg border border-gray-700 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <WebsiteStatusIcon status={website.status} />
          <h3 className="font-medium text-lg text-white">{website.url}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            {website.uptime.toFixed(2)}% uptime
          </p>
          <p className="text-xs text-gray-500">
            Last checked {formatDistanceToNow(website.lastChecked)} ago
          </p>
        </div>
          <Trash2 className="text-gray-400 cursor-pointer hover:text-red-500" onClick={deleteWebsite} />
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>90 days ago</span>
        </div>
        <StatusChart history={website.history} />
      </div>
    </div>
  );
}
