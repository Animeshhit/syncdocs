import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import DocumentFileNameSetter from "./DocumentFileNameSetter";
import { AvatarRtl } from "./Avatar";

interface DocumentNavbarProps {
  documentId: string;
}

function DocumentNavbar({ documentId }: DocumentNavbarProps) {
  return (
    <header className="print:hidden bg-blue-200">
      <div className="w-full container mx-auto py-2 px-4">
        <div className="flex items-center justify-between">
          <DocumentFileNameSetter documentId={documentId} />
          
          <div className="flex items-center gap-2">
            <AvatarRtl/>
            <OrganizationSwitcher
              afterLeaveOrganizationUrl="/"
              afterSelectOrganizationUrl="/"
              afterSelectPersonalUrl="/"
              afterCreateOrganizationUrl="/"
            />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default DocumentNavbar;
