import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeKeywords(keyword: string): string {
  if (keyword.toLowerCase() === "grpc") return "gRPC";
  if (keyword.toLowerCase() === "api") return "API";
  if (keyword.toLowerCase() === "cpp") return "C++ (Programming Language)";
  if (keyword.toLowerCase() === "c") return "C (Programming Language)";

  return keyword.charAt(0).toUpperCase() + keyword.slice(1);
}

export function formatTag(
  tag: string,
  options?: {
    separator?: string;
    transform?: (_tag: string) => string;
  },
) {
  const { separator = "-", transform = (tag: string) => tag } = options || {};

  return tag.split(separator).map(transform).join(separator);
}
