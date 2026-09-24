"use server";


import {auth,clerkClient} from "@clerk/nextjs/server";

export async function getUsers() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const org =
    sessionClaims && typeof sessionClaims === "object" && "o" in sessionClaims
      ? (sessionClaims.o as { id?: string } | undefined)
      : undefined;

  const orgId = org?.id;

  const res = await clerk.users.getUserList({
    organizationId: orgId ? [orgId] : [],
  });
    

    const users = res.data.map(u => ({
        id:u?.id,
        name:u.fullName ?? u.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar:u.imageUrl
    }))

  return users;
}
