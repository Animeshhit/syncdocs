import { NextRequest, NextResponse } from "next/server";
import { Liveblocks } from "@liveblocks/node";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { sessionClaims } = await auth();
    if (!sessionClaims) {
      return NextResponse.json("Unauthorized");
    }

    const user = await currentUser();

    if (!user) {
      return NextResponse.json("Unauthorized");
    }

    const { room } = await req.json();

    const document = await convex.query(api.document.getById, { id: room });

    if (!document) {
      return NextResponse.json("unAuthorized");
    }

    //    const isOwner = document.ownerId === user.id;

    //    if(!isOwner){
    //     return NextResponse.json("Unauthorized");
    //    }

    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.fullName ?? "no username",
        avatar: user.imageUrl,
      },
    });

    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    return new Response(body, {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 },
    );
  }
}
