"use client";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Website, WebsiteStatus } from "@/app/types/website";
import { AddWebsiteDialog } from "./add-website";
import { WebsiteCard } from "./website-card";
import axios from 'axios';
import { BACKEND_URL } from "@/config";

// Generate random status for demo purposes
const getRandomStatus = (): WebsiteStatus => {
  const statuses: WebsiteStatus[] = ['up', 'down', 'unknown'];
  const weights = [0.7, 0.2, 0.1]; // 70% up, 20% down, 10% unknown
  
  const random = Math.random();
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) return statuses[i];
  }
  
  return 'unknown';
};

const generateHistory = (days: number = 90): { date: Date; status: WebsiteStatus }[] => {
  return Array(days).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    return {
      date,
      status: getRandomStatus()
    };
  });
};

export function WebsiteMonitor() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [refreshWebsites,SetFefreshWebsites] = useState<boolean>(false);

  useEffect(() => {
    fetchWebsites();
  }, [refreshWebsites]);

  const fetchWebsites = async() => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/getsites`);
    console.log(res.data);
    setWebsites( res.data.map((site: Partial<Website>) => {
        return {
            ...site,
            status: 'unknown',
            lastChecked: new Date(),
            history: generateHistory(),
            uptime: 100
        }
    }))
  };

  const handleAddWebsite = async(url: string) => {
    const formattedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    const res = await axios.post(`${BACKEND_URL}/api/v1/addsite`, { url: formattedUrl });
    console.log(res.data);
    if(res.data.status === 'success'){
        fetchWebsites();
    }
  };
  
  const hasDownWebsites = websites?.some(site => site.status === 'down');
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {hasDownWebsites && (
        <div className="bg-monitor-down/10 border border-monitor-down/20 rounded-lg p-6 mb-8 flex items-center gap-4 animate-fade-in">
          <AlertCircle className="text-monitor-down" size={24} />
          <div>
            <h2 className="text-xl font-medium text-white">Some services are down</h2>
            <p className="text-gray-300">
              Last updated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-white">Current status by service</h1>
        <AddWebsiteDialog onAddWebsite={handleAddWebsite} refreshWebSiteList={SetFefreshWebsites} />
      </div>
      
      <div className="space-y-6">
        {websites?.map(website => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </div>
  );
}
