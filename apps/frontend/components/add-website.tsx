"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface AddWebsiteDialogProps {
  onAddWebsite: (url: string) => void;
}

export function AddWebsiteDialog({ onAddWebsite }: AddWebsiteDialogProps) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Add Website
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Add Website to Monitor</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the URL of the website you want to monitor
          </DialogDescription>
        </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right text-gray-300">
                URL
              </Label>
              <Input
                id="url"
                placeholder="example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="col-span-3 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                // Basic URL validation
                try {
                //   new URL(url.startsWith('http') ? url : `https://${url}`);
                  onAddWebsite(url);
                  setUrl("");
                  setOpen(false);
                } catch (error) {
                    console.error(error);
                }
              }}
            >
              Add to Monitoring
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
