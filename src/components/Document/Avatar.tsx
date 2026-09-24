"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarRtl() {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length == 0) return null;

  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <AvatarGroup>
        {currentUser && (
          <Avatar>
            <AvatarImage
              src={currentUser.info.avatar}
              alt={`@${currentUser.info.name}`}
            />
            <AvatarFallback>{currentUser.info.name}</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        )}

        {users.map((i) => (
          <Avatar>
            <AvatarImage
              src={i.info.avatar}
              alt={`@${i.info.name}`}
            />
            <AvatarFallback>{i.info.name}</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}
