import { UserButton } from "@clerk/nextjs";
import DocumentFileNameSetter from "./DocumentFileNameSetter";
import { ThemeToggle } from "../tiptap-templates/simple/theme-toggle";

function DocumentNavbar() {
  return (
    <header className="print:hidden">
      <div className="w-full container mx-auto py-2 px-4">
        <div className="flex items-center justify-between">
          <DocumentFileNameSetter />
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
