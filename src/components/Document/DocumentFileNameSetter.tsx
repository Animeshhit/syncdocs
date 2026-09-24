"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CloudSync } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
// import type { Id } from "convex/server";
import { api } from "../../../convex/_generated/api";

interface DocumentNavbarFileNameSetter {
  documentId: string;
}

function DocumentFileNameSetter({ documentId }: DocumentNavbarFileNameSetter) {
  const document = useQuery(api.document.getById, {
    id: documentId as any,
  });
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
        className="min-w-0 flex-1 border-none text-base placeholder:text-zinc-500 sm:text-lg dark:placeholder:text-gray-300"
      />
      <Button variant="ghost" className="shrink-0 cursor-pointer">
        <CloudSync width={20} height={20} />
      </Button>
    </div>
  );
}

export default DocumentFileNameSetter;