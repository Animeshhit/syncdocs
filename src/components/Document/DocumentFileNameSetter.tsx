"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CloudSync } from "lucide-react";
import { useState, useRef, RefObject } from "react";
import Link from "next/link";

function DocumentFileNameSetter() {
  const [fileName, setFileName] = useState("Untitled Document");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleActivate = () => {
    setIsEditing(true);
    if (!inputRef.current) return;
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (fileName.trim() === "") {
      setFileName("Untitled Document");
    }
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
