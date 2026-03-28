import { MetadataRoute } from "next";

const BASE_URL = "https://meetingagent.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL,                           lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/demo`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/how-it-works`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/integrations`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/pricing`,              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/waitlist`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
