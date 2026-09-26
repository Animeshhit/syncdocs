"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/theme-toggle";

import AuthHeader from "./AuthHeader";


interface HeaderProps {
  children: React.ReactNode;
}

//TODO: IMPLEMENT THE ORG SWITCHER FOR MOBILE DEVICES 

export default function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b-[1px] border-zinc-200 dark:border-zinc-800 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {children}
        <div className="flex items-center gap-1">
          <AuthHeader/>
          
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell data-icon="inline-start" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
