export type WebsiteStatus = "up" | "down" | "unknown";

export interface Website {
  id: string;
  url: string;
  status: WebsiteStatus;
  uptime: number;
  lastChecked: Date;
  history: {
    date: Date;
    status: WebsiteStatus;
  }[];
}
