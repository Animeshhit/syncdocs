"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarRtl() {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) return null;

  return (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <AvatarGroup>
        {currentUser && (
          <Avatar className="ring-2 ring-background">
            <AvatarImage src={currentUser.info.avatar} alt={`@${currentUser.info.name}`} />
            <AvatarFallback>{currentUser.info.name?.[0]}</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-500" />
          </Avatar>
        )}

        {users.map((user) => (
          <Avatar key={user.connectionId} className="ring-2 ring-background">
            <AvatarImage src={user.info.avatar} alt={`@${user.info.name}`} />
            <AvatarFallback>{user.info.name?.[0]}</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-500" />
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}