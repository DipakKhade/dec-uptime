export type WebsiteStatus = "good" | "bad" | "unknown";

export interface Website {
  id: string;
  url: string;
  status: WebsiteStatus;
  lastChecked: Date;
  ticks: {
    status: WebsiteStatus;
    latency: number;
    createdAt: Date;
  }[];
}
