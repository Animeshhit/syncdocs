"use client";

import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { useAuth, useUser, SignInButton } from "@clerk/nextjs";
import {
  Building2,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash2,
  ExternalLink,
  LogIn,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DocType = {
  _id: string;
  _creationTime: number;
  ownerId?: string;
  organizationId?: string;
  title: string;
};

export function RecentFilesTable() {
  const { isLoaded: userIsLoaded, isSignedIn } = useUser();
  const { isLoaded: authIsLoaded } = useAuth();

  const shouldLoadDocuments =
    userIsLoaded && authIsLoaded && isSignedIn === true;

  const { results, status, loadMore } = usePaginatedQuery(
    api.document.get,
    shouldLoadDocuments ? {} : "skip",
    { initialNumItems: 5 },
  );

  const deleteItem = useMutation(api.document.deleteById);
  const renameItem = useMutation(api.document.updateById);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const startRename = (doc: DocType) => {
    setEditingId(doc._id);
    setEditValue(doc.title);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const saveRename = (id: string) => {
    const trimmed = editValue.trim();
    setEditingId(null);
    if (!trimmed) return;
    renameItem({ id: id as any, title: trimmed });
  };

  const cancelRename = () => setEditingId(null);

  const handleDelete = (id: string) => deleteItem({ id: id as any });

  const handleOpenInNewTab = (id: string) =>
    window.open(`/document/${id}`, "_blank");

  const authChecking = !userIsLoaded || !authIsLoaded;
  const isLoading = shouldLoadDocuments && results === undefined;
  const noDocumentsFound =
    shouldLoadDocuments && results && results.length === 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Card className="overflow-hidden rounded-[28px] border-0 bg-card">
        <CardHeader className="flex flex-row items-center justify-between gap-4 border-b px-5 py-5 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Your workspace
            </p>
            <CardTitle className="mt-2 text-xl tracking-tight">
              Recent files
            </CardTitle>
          </div>
          {isSignedIn && (
            <Button variant="outline" size="sm">
              View all
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-0">
          {/* Not signed in */}
          {!authChecking && !isSignedIn && (
            <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/8 text-primary">
                <LogIn className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium">You're not signed in</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create an account or sign in to see your documents.
                </p>
              </div>
              <SignInButton mode="modal">
                <Button size="sm" className="cursor-pointer">
                  Sign in
                </Button>
              </SignInButton>
            </div>
          )}

          {/* Auth state resolving */}
          {authChecking && (
            <div className="divide-y divide-border">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-4 sm:px-6"
                >
                  <Skeleton className="size-9 bg-gray-400 animate-pulse rounded-lg" />
                  <Skeleton className="h-4 w-40 bg-gray-400 animate-pulse rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Signed in: table */}
          {isSignedIn && (
            <Table>
              <TableHeader className="hidden sm:table-header-group">
                <TableRow>
                  <TableHead className="pl-6">Name</TableHead>
                  <TableHead>Ownership</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="py-4 pl-5 sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Skeleton className="size-9 bg-gray-400 animate-pulse rounded-lg" />
                          <Skeleton className="h-4 bg-gray-400 animate-pulse w-40 rounded" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton className="h-4 bg-gray-400 animate-pulse w-20 rounded" />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton className="h-4 bg-gray-400 animate-pulse w-24 rounded" />
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  ))}

                {!isLoading && noDocumentsFound && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      No documents found.
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading &&
                  results?.map((doc) => {
                    const isOrganization = !!doc.organizationId;
                    const isEditing = editingId === doc._id;

                    return (
                      <TableRow key={doc._id} className="group cursor-pointer">
                        <TableCell
                          className="py-4 pl-5 sm:pl-6"
                          onClick={() =>
                            !isEditing &&
                            (window.location.href = `/document/${doc._id}`)
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                              <FileText className="size-4" />
                            </div>
                            <div className="min-w-0">
                              {isEditing ? (
                                <input
                                  ref={inputRef}
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      saveRename(doc._id);
                                    } else if (e.key === "Escape") {
                                      e.preventDefault();
                                      cancelRename();
                                    }
                                  }}
                                  onBlur={() => saveRename(doc._id)}
                                  className="w-full bg-background border border-input rounded px-1.5 py-0.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                                />
                              ) : (
                                <p className="truncate font-medium">
                                  {doc.title}
                                </p>
                              )}
                              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground sm:hidden">
                                <span className="inline-flex items-center gap-1">
                                  <Building2 className="size-3" />
                                  {isOrganization ? "Organization" : "me"}
                                </span>
                                <span>·</span>
                                <span>
                                  {format(doc._creationTime, "MMM d, yyyy")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">
                          <Badge
                            variant="secondary"
                            className="gap-1 font-normal"
                          >
                            <Building2 className="size-3" />
                            {isOrganization ? "Organization" : "me"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">
                          {format(doc._creationTime, "MMM d, yyyy")}
                        </TableCell>
                        <TableCell
                          className="pr-3 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              className="cursor-pointer"
                              aria-label={`More options for ${doc.title}`}
                            >
                              <MoreHorizontal />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-48 rounded-sm"
                            >
                              <DropdownMenuItem
                                className="cursor-pointer py-2"
                                onClick={() => startRename(doc)}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer py-2"
                                onClick={() => handleOpenInNewTab(doc._id)}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Open in new tab
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(doc._id)}
                                className="text-destructive py-2 cursor-pointer hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}

          {isSignedIn && status === "CanLoadMore" && (
            <div className="flex justify-center border-t py-3">
              <Button variant="ghost" size="sm" onClick={() => loadMore(5)}>
                Load more
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
