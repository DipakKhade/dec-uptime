"use client";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Website, WebsiteStatus } from "@/app/types/website";
import { AddWebsiteDialog } from "./add-website";
import { WebsiteCard } from "./website-card";

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

const initialWebsites: Website[] = [
  {
    id: "awdasda",
    url: 'example.com',
    status: 'up',
    lastChecked: new Date(),
    history: generateHistory(),
    uptime: 99.98
  },
  {
    id: "awdasda",
    url: 'mywebsite.com',
    status: 'down',
    lastChecked: new Date(Date.now() - 15 * 60 * 1000), // 15 mins ago
    history: generateHistory(),
    uptime: 95.62
  },
  {
    id: "awdasda",
    url: 'another-site.org',
    status: 'unknown',
    lastChecked: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    history: generateHistory(),
    uptime: 97.33
  }
];

export function WebsiteMonitor() {
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);
  
  const handleAddWebsite = (url: string) => {
    const formattedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    
    const newWebsite: Website = {
      id: "awdasda",
      url: formattedUrl,
      status: 'unknown',
      lastChecked: new Date(),
      history: generateHistory(),
      uptime: 100
    };
    
    setWebsites(prev => [...prev, newWebsite]);
    
    // Simulate status check after adding
    setTimeout(() => {
      setWebsites(prev => 
        prev.map(site => 
          site.id === newWebsite.id 
            ? { ...site, status: getRandomStatus() } 
            : site
        )
      );
    }, 2000);
  };
  
  const hasDownWebsites = websites.some(site => site.status === 'down');
  
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
        <AddWebsiteDialog onAddWebsite={handleAddWebsite} />
      </div>
      
      <div className="space-y-6">
        {websites.map(website => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </div>
  );
}
