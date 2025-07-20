import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseImageUrls(imageUrls: string | null): string[] {
  let imageArray: string[] = [];
  const parsed = JSON.parse(imageUrls || "null");

  if (Array.isArray(parsed)) {
    imageArray = parsed;
  } else if (typeof parsed === "string") {
    imageArray = [parsed];
  }

  return imageArray;
}
