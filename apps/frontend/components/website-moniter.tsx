"use client";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Website } from "@/app/types/website";
import { AddWebsiteDialog } from "./add-website";
import { WebsiteCard } from "./website-card";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function WebsiteMonitor() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [refreshWebsites, SetFefreshWebsites] = useState<boolean>(false);
  const { getToken, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      fetchWebsites()
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshWebsites]);

  const fetchWebsites = async () => {
    const token = await getToken();
    const res = await axios.get(`${BACKEND_URL}/api/v1/getsites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setWebsites(
      res.data.map((site: Partial<Website>) => {
        return {
          ...site,
          status: "unknown",
          lastChecked: new Date(),
          history:site?.ticks!.map((tick)=>{
            return {
              date: tick.createdAt,
              status: tick.status,
            }
          }),
          uptime: 100,
        };
      }),
    );
  };

  const handleAddWebsite = async (url: string) => {
    const token = await getToken();
    const res = await axios.post(`${BACKEND_URL}/api/v1/addsite`, {
        url
    },{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      fetchWebsites();
    }
  };

  const uptimePercentage = (website:Website)=>{
   const {ticks} = website;
   return Math.ceil((ticks.filter(t=>t.status === "good")).length/ticks.length*100);
  };

  const hasDownWebsites = websites?.some((site) => site.status === "bad");

  const getCurrentStatus = (website: Website) => {
    const {ticks} = website;
    return ticks[ticks.length - 1]?.status ?? "unknown";
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {hasDownWebsites && (
        <div className="bg-monitor-down/10 border border-monitor-down/20 rounded-lg p-6 mb-8 flex items-center gap-4 animate-fade-in">
          <AlertCircle className="text-monitor-down" size={24} />
          <div>
            <h2 className="text-xl font-medium text-white">
              Some services are down
            </h2>
            <p className="text-gray-300">
              Last updated 
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Current status by service
        </h1>
        <AddWebsiteDialog
          onAddWebsite={handleAddWebsite}
          refreshWebSiteList={SetFefreshWebsites}
        />
      </div>

      <div className="space-y-6">
        {websites?.map((website) => (
          <WebsiteCard
            key={website.id}
            website={website}
            status={getCurrentStatus(website)}
            refreshWebSiteList={SetFefreshWebsites}
            uptimePercentage={uptimePercentage(website)}
          />
        ))}
      </div>
    </div>
  );
}
