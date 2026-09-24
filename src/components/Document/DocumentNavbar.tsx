import { UserButton } from "@clerk/nextjs";
import DocumentFileNameSetter from "./DocumentFileNameSetter";
import { ThemeToggle } from "../tiptap-templates/simple/theme-toggle";


interface DocumentNavbarProps {
    documentId: string;
}

function DocumentNavbar({documentId}:DocumentNavbarProps) {
  return (
    <header className="print:hidden">
      <div className="w-full container mx-auto py-2 px-4">
        <div className="flex items-center justify-between">
          <DocumentFileNameSetter documentId={documentId}/>
          <div className="flex items-center gap-2">
            <UserButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default DocumentNavbar;
