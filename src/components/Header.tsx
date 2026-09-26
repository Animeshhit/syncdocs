"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/theme-toggle";

import { MobileOrgSwitcher } from "./MobileOrgSwitcher";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const AuthHeader = dynamic(() => import("./AuthHeader"),{ssr:false,loading:() => <Skeleton className="bg-gray-400 w-6 h-6 animate-pulse" />});
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {children}
        <div className="flex items-center gap-2">
          {/* Icon-only org switcher, mobile only */}

          <div className="md:hidden flex">
            <MobileOrgSwitcher/>
          </div>
       

          <AuthHeader />

          <div className="hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell data-icon="inline-start" />
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}