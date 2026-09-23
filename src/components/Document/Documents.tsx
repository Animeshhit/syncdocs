"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
  FileText,
} from "lucide-react";

type DocType = {
  _id: string;
  _creationTime: number;
  ownerId?: string;
  organizationId?: string;
  title: string;
};

const GRID = "grid-cols-[1fr_2rem] sm:grid-cols-[1fr_7rem_8rem_2rem]";

function Documents() {
  const docs = useQuery(api.document.get) as DocType[] | undefined;

  const handleRename = (id: string) => console.log("rename", id);
  const handleDelete = (id: string) => console.log("delete", id);
  const handleOpenInNewTab = (id: string) =>
    window.open(`/document/${id}`, "_blank");

  const isLoading = docs === undefined;

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div
          className={`hidden sm:grid ${GRID} items-center gap-4 px-4 py-2.5 text-xs font-medium text-muted-foreground bg-muted/30`}
        >
          <div>Name</div>
          <div>Ownership</div>
          <div>Created At</div>
          <div />
        </div>

        {/* Body */}
        <div className="divide-y divide-border">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`grid ${GRID} items-center gap-4 px-4 py-3`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Skeleton className="h-8 w-8 rounded-md bg-gray-300 shrink-0" />
                  <Skeleton className="h-4 w-40 rounded bg-gray-300" />
                </div>
                <Skeleton className="hidden sm:block h-4 w-16 rounded bg-gray-300" />
                <Skeleton className="hidden sm:block h-4 w-20 rounded bg-gray-300" />
                <Skeleton className="h-8 w-8 rounded-md bg-gray-300 justify-self-end" />
              </div>
            ))}

          {!isLoading && docs.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No documents found.
            </div>
          )}

          {!isLoading &&
            docs.map((doc) => {
              const isOrganization = !!doc.organizationId;

              return (
                <Link
                  href={`/document/${doc._id}`}
                  key={doc._id}
                  className={`group cursor-pointer hover:bg-gray-300 grid ${GRID} items-center gap-4 px-4 py-3 hover:bg-accent/50 transition-colors`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="text-gray-400" />
                    <span className="block truncate text-sm">{doc.title}</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
                    {isOrganization && (
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                    )}
                    {isOrganization ? "Organization" : "me"}
                  </div>

                  <div className="hidden sm:block text-sm text-muted-foreground">
                    {format(doc._creationTime, "MMM d, yyyy")}
                  </div>

                  <div className="justify-self-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex cursor-pointer h-8 w-8 items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-foreground transition-all focus:opacity-100 data-[state=open]:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          className="cursor-pointer py-2"
                          onClick={() => handleRename(doc._id)}
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
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Documents;
