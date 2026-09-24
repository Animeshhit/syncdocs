"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoading from "@/components/FullScreenLoading";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoading/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}