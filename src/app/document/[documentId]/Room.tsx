"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
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

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        console.log(list);
        setUsers(list);
      } catch (err) {
        alert("failed to fetch users");
      }
    },
    [],
  );

  useEffect(() => {
    fetchUsers();
  },[fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
      resolveUsers={({userIds}) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        )
      }}
      resolveMentionSuggestions={({text}) => {
        let filteredUsers = users;
        if(text){
          filteredUsers = users.filter((user) => 
            user.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
          )
        }

        return filteredUsers.map((user) => user.id);
      }}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
