"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";




interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: JSX.Element;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9 py-4",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  {/* <link.icon className="h-4 w-4" /> */}
                  {link.icon}
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{link.label}</Badge>
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: "lg" }),
                "py-6",
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              {/* <link.icon className="mr-2 h-4 w-4" /> */}
              <span className="flex items-center justify-between">
                <span className="flex items-center">
                  {link.icon}
                  {link.title}
                </span>
                <span className="flex">
                  {link.label && (
                    <span
                      className={cn(
                        "ml-auto",
                        link.variant === "default" &&
                      "text-background dark:text-white"
                      )}
                    >
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{link.label}</Badge>
                    </span>
                  )}
                </span>
              </span>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}