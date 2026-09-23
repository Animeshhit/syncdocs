"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
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
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  User,
  Building2,
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";

function Documents() {
  const docs = useQuery(api.document.get);

  const handleRename = (id: string) => {
    // TODO: implement rename
    console.log("rename", id);
  };

  const handleDelete = (id: string) => {
    // TODO: implement delete
    console.log("delete", id);
  };

  const handleOpenInNewTab = (id: string) => {
    window.open(`/document/${id}`, "_blank");
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Ownership</TableHead>
            <TableHead className="hidden sm:table-cell">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {docs?.map((doc) => {
            console.log(doc);
            const isOrganization = doc.organizationId;
            const isPersonal = doc.ownerId;

            return (
              <TableRow key={doc._id}>
                <TableCell className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  {isOrganization ? (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      Organization
                    </div>
                  ) : isPersonal ? (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Personal
                    </div>
                  ) : null}
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(doc._creationTime).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleRename(doc._id)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleOpenInNewTab(doc._id)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in new tab
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(doc._id)}
                        className="text-destructive focus:text-destructive"
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
    </div>
  );
}

export default Documents;
