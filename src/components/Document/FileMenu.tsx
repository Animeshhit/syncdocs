"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Copy, Printer, Download, Trash2, FileText } from "lucide-react";

interface FileMenuProps {
  documentId: string;
}

export function FileMenu({ documentId }: FileMenuProps) {
  const router = useRouter();
  const document = useQuery(api.document.getById, { id: documentId as any });
  const updateTitle = useMutation(api.document.updateById);
  const deleteDoc = useMutation(api.document.deleteById);

  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const openRename = () => {
    setRenameValue(document?.title ?? "");
    setRenameOpen(true);
  };

  const submitRename = () => {
    const trimmed = renameValue.trim();
    if (trimmed) updateTitle({ id: documentId as any, title: trimmed });
    setRenameOpen(false);
  };

  const handlePrint = () => window.print();

  const handleDownload = (format: "pdf" | "docx" | "txt") => {
    if (format === "pdf") {
      // Uses the browser's native print dialog ("Save as PDF"). Works today.
      window.print();
      return;
    }
    // TODO: .docx / .txt need the editor's raw content (e.g. editor.getHTML() /
    // editor.getText() from your Tiptap instance). Hook that in here, then
    // generate the file client-side (e.g. with the `docx` npm package for
    // Word, or a plain Blob + <a download> for .txt).
    alert(`Exporting as .${format} is coming soon`);
  };

  const handleDelete = () => {
    if (!confirm("Move this document to trash?")) return;
    deleteDoc({ id: documentId as any }).then(() => router.push("/"));
  };

  return (
    <>
      <Menubar className="h-auto border-none bg-transparent p-0 shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="rounded-md px-2 py-1 text-sm font-medium text-foreground hover:bg-accent data-[state=open]:bg-accent">
            File
          </MenubarTrigger>
          <MenubarContent align="start" className="w-56">
            <MenubarItem onClick={openRename}>
              <Pencil className="mr-2 h-4 w-4" />
              Rename
            </MenubarItem>
            <MenubarItem disabled>
              <Copy className="mr-2 h-4 w-4" />
              Make a copy
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>
                <Download className="mr-2 h-4 w-4" />
                Download
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={() => handleDownload("pdf")}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF Document (.pdf)
                </MenubarItem>
                <MenubarItem onClick={() => handleDownload("docx")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Word Document (.docx)
                </MenubarItem>
                <MenubarItem onClick={() => handleDownload("txt")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Plain Text (.txt)
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Move to trash
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitRename()}
            autoFocus
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRenameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitRename}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}