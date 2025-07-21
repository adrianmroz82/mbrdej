import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a string of image URLs into an array.
 * Handles both JSON arrays and single strings.
 * Returns an empty array if the input is null or invalid.
 *
 * @param {string | null} imageUrls - The string containing image URLs.
 * @returns {string[]} An array of image URLs.
 */
export function parseImageUrls(imageUrls: string | null): string[] {
  if (!imageUrls) return [];

  try {
    const parsed = JSON.parse(imageUrls);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    if (typeof parsed === "string") {
      return [parsed];
    }
  } catch {
    if (typeof imageUrls === "string") {
      return [imageUrls];
    }
  }

  return [];
}
