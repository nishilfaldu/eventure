import type { ClassValue } from "clsx";
import {  clsx } from "clsx";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function constructMetadata({
  title = "Eventure - Your Ultimate Event Management Platform",
  description = "Plan, manage, and host successful events effortlessly with Eventure.",
  image = "/images/eventure-banner.png",
  icons = "/images/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@FalduNishil and @AnushaChitranshi",
    },
    icons,
    metadataBase: new URL("https://www.eventure.network"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
