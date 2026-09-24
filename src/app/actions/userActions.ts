"use server";


import {auth,clerkClient} from "@clerk/nextjs/server";

export async function getUsers() {
    const {sessionClaims} = await auth();
    const clerk = await clerkClient();



    const res = await clerk.users.getUserList({
        organizationId:[sessionClaims?.o?.id as string]
    })
    

    const users = res.data.map(u => ({
        id:u.id,
        name:u.fullName ?? u.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar:u.imageUrl
    }))

  return users;
}
