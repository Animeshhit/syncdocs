"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CloudSync } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface DocumentNavbarFileNameSetter {
  documentId: string;
}

function DocumentFileNameSetter({ documentId }: DocumentNavbarFileNameSetter) {
  const document = useQuery(api.document.getById, { id: documentId as any });

  const [fileName, setFileName] = useState("Loading...");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // sync local state once the query resolves (and whenever the title changes elsewhere)
  useEffect(() => {
    if (document === undefined) return; // still loading
    setFileName(document?.title ?? "Untitled Document");
  }, [document]);

  const handleActivate = () => {
    setIsEditing(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (fileName.trim() === "") {
      setFileName("Untitled Document");
    }
    // TODO: call your rename mutation here to persist fileName
  };

  return (
    <div className="flex items-center gap-2">
      <Link href="/">
        <Image
          src="/icon-removebg-preview.png"
          alt="syncdocs"
          width={40}
          height={40}
        />
      </Link>
      <Input
        ref={inputRef}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        onClick={handleActivate}
        onFocus={handleActivate}
        onBlur={handleBlur}
        readOnly={!isEditing}
        className="border-none placeholder:text-zinc-500 dark:placeholder:text-gray-300"
      />
      <Button variant="ghost" className="cursor-pointer">
        <CloudSync width={20} height={20} />
      </Button>
    </div>
  );
}

export default DocumentFileNameSetter;