"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoading from "@/components/FullScreenLoading";
import { getUsers } from "@/app/actions/userActions";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<
    { id: string; name: string; avatar: string }[]
  >([]);

  const fetchUsers = useCallback(async () => {
    try {
      const list = await getUsers();
      setUsers(list);
    } catch (err) {
      console.error("failed to fetch users", err);
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const resolveUsers = useCallback(
    ({ userIds }: { userIds: string[] }) =>
      userIds.map(
        (userId) => users.find((user) => user.id === userId) ?? undefined,
      ),
    [users],
  );

  const resolveMentionSuggestions = useCallback(
    ({ text }: { text: string }) => {
      const filteredUsers = text
        ? users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase()),
          )
        : users;

      return filteredUsers.map((user) => user.id);
    },
    [users],
  );

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
