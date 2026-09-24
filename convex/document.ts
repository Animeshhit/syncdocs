import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const get = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) return null;
    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(args.paginationOpts);
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("unauthorized");
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled document",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});

export const getById = query({
  args: { id: v.id("documents") },
  handler: async (ctx, { id }) => {
    const document = ctx.db.get(id);

    return document;
  },
});

export const deleteById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, { id }) => {
    const document = ctx.db.get("documents", id);
    if (!document) {
      return new ConvexError("Document not found");
    }
    await ctx.db.delete("documents", id);
  },
});

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const document = ctx.db.get("documents", args.id);
    if (!document) {
      return new ConvexError("Document not found");
    }
    return ctx.db.patch("documents", args.id, { title: args.title });
  }
});
