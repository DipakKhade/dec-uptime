"use client";
import { useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";

export const HeroAddWebsite = () => {
    const [ url, setUrl ] = useState("");
    const {user} = useUser();
    const { getToken } = useAuth();
    const router = useRouter();

    const handleAddWebsite = async () => {
        if(!user){
            router.push('/signin');
            return;
        }
        if (!url || url.length === 0) return;
        const token = await getToken();
        const res = await axios.post(`${BACKEND_URL}/api/v1/addsite`, {
            url
        },{
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          router.push('/monitor');
        }
    }
    return <div className="flex items-center justify-center">
    <div className="rounded-xl border bg-card p-6 shadow-lg w-full max-w-md gradient-border animate-float">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold gradient-text">
            Start Monitoring Now
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter your website URL to begin monitoring
          </p>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <Input
              onChange={(e)=>setUrl(e.target.value)}
              type="url"
              placeholder="https://yourwebsite.com"
              className="rounded-lg border-input bg-background h-12 transition-all focus-visible:ring-2 focus-visible:ring-solana"
            />
          </div>
          <Button
            onClick={handleAddWebsite}
            className="w-full h-12 bg-green-400 cursor-pointer hover:opacity-90 transition-opacity">
            Add Website
          </Button>
        </div>
      </div>
    </div>
  </div>

}