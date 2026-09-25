"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CloudSync } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface DocumentNavbarFileNameSetter {
  documentId: string;
}

function DocumentFileNameSetter({ documentId }: DocumentNavbarFileNameSetter) {
  const document = useQuery(api.document.getById, { id: documentId as any });
  const updateName = useMutation(api.document.updateById);

  const [fileName, setFileName] = useState(() => document?.title ?? "Untitled Document");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleActivate = () => {
    setIsEditing(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setIsEditing(false);
    const nextTitle = fileName.trim() || "Untitled Document";
    setFileName(nextTitle);
    updateName({ id: documentId as any, title: nextTitle });
  };

  const inputValue = isEditing ? fileName : document?.title ?? fileName;

  return (
    <div className="flex min-w-0 items-center gap-2">
      <Link href="/" className="shrink-0">
        <Image
          src="/icon-removebg-preview.png"
          alt="syncdocs"
          width={40}
          height={40}
          className="h-7 w-7 sm:h-10 sm:w-10"
        />
      </Link>
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setFileName(e.target.value)}
        onClick={handleActivate}
        onFocus={handleActivate}
        onBlur={handleBlur}
        readOnly={!isEditing}
        className="min-w-0 flex-1 border-none bg-transparent text-base text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring sm:text-lg"
      />
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
      >
        <CloudSync className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
}

export default DocumentFileNameSetter;