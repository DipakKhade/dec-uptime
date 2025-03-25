import { Website, WebsiteStatus } from "@/app/types/website";
import { formatDistanceToNow } from "date-fns";
import { WebsiteStatusIcon } from "./website-status-icon";
import { StatusChart } from "./status-chart";
import { Trash2 } from "lucide-react";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export const WebsiteCard = ({
  website,
  status,
  refreshWebSiteList,
}: {
  website: Website;
  status:WebsiteStatus,
  refreshWebSiteList: (val: boolean) => void;
}) => {
  console.log('hello from asd website',website);
  console.log('hello from asd status',status);
  const { getToken } = useAuth();

  const deleteWebsite = async () => {
    const token = await getToken();
    const res = await axios.delete(`${BACKEND_URL}/api/v1/deletesite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: website.id,
      },
    });
    if (res.status === 200) {
      refreshWebSiteList(true);
    }
  };
  return (
    <div className="bg-monitor-card text-slate-950 rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg border border-gray-700 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <WebsiteStatusIcon status={status} />
          <h3 className="font-medium text-lg dark:text-white min-w-3xs">{website.url}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm dark:text-gray-400">
            100% uptime
          </p>
          <p className="text-xs text-gray-500">
            Last checked {formatDistanceToNow(website.lastChecked)} ago
          </p>
        </div>
        <Trash2
          className="text-gray-400 cursor-pointer hover:text-red-500"
          onClick={deleteWebsite}
        />
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs dark:text-gray-500 mb-1">
          <span>90 days ago</span>
        </div>
        <StatusChart history={website.ticks} />
      </div>
    </div>
  );
};
