"use client";

import { useAuth, useUser } from "@clerk/nextjs";

import dynamic from "next/dynamic";

function RecentFilesAuthLayout() {
  const RecentFilesTable = dynamic(
    () => import("./RecentFiles").then((mod) => mod.RecentFilesTable),
    {
      ssr: false,
    },
  );
  const { isLoaded: userIsLoaded, isSignedIn } = useUser();
  const { isLoaded: authIsLoaded } = useAuth();

  const shouldLoadDocuments =
    userIsLoaded && authIsLoaded && isSignedIn === true;

  if (!shouldLoadDocuments) return null;

  return <RecentFilesTable />;
}

export default RecentFilesAuthLayout;
