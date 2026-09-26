"use client";

import { useEffect, useRef } from "react";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import DocumentFileNameSetter from "./DocumentFileNameSetter";
import { AvatarRtl } from "./Avatar";
import { FileMenu } from "./FileMenu";

interface DocumentNavbarProps {
  documentId: string;
}

function DocumentNavbar({ documentId }: DocumentNavbarProps) {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--doc-navbar-height",
        `${el.offsetHeight}px`
      );
    };

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 print:hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-3 py-2 sm:px-4 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <DocumentFileNameSetter documentId={documentId} />
          </div>

          <div className="flex items-center justify-end gap-2 self-end sm:self-auto">
            <AvatarRtl />
            <div className="hidden md:block">
              <OrganizationSwitcher
                afterLeaveOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                afterSelectPersonalUrl="/"
                afterCreateOrganizationUrl="/"
              />
            </div>
            <UserButton />
          </div>
        </div>

        <div className="mt-1.5 flex items-center">
          <FileMenu documentId={documentId} />
        </div>
      </div>
    </header>
  );
}

export default DocumentNavbar;