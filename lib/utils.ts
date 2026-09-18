import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceInPaisa: number): string {
  const rupees = priceInPaisa / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function generateCertificateNo(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `VL-${year}-${random}`;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  if (!videoId) return "";
  // If it's already an embed URL
  if (videoId.includes("youtube.com/embed/")) return videoId;
  // If it's a full watch URL
  if (videoId.includes("youtube.com/watch?v=")) {
    const id = videoId.split("v=")[1]?.split("&")[0];
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
  }
  // If it's a youtu.be short URL
  if (videoId.includes("youtu.be/")) {
    const id = videoId.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
  }
  // Default assuming clean video ID
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export function getYouTubeThumbnail(videoId: string): string {
  if (!videoId) return "";
  let cleanId = videoId;
  if (videoId.includes("v=")) {
    cleanId = videoId.split("v=")[1]?.split("&")[0] || videoId;
  } else if (videoId.includes("youtu.be/")) {
    cleanId = videoId.split("youtu.be/")[1]?.split("?")[0] || videoId;
  }
  return `https://img.youtube.com/vi/${cleanId}/maxresdefault.jpg`;
}

export function calculateProgress(completed: number, total: number): number {
  if (!total || total === 0) return 0;
  return Math.min(100, Math.round((completed / total) * 100));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
