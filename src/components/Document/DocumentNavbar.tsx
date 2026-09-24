import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import DocumentFileNameSetter from "./DocumentFileNameSetter";
import { AvatarRtl } from "./Avatar";

interface DocumentNavbarProps {
  documentId: string;
}

function DocumentNavbar({ documentId }: DocumentNavbarProps) {
  return (
    <header className="print:hidden bg-blue-200">
      <div className="container mx-auto w-full px-3 py-2 sm:px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <DocumentFileNameSetter documentId={documentId} />
          </div>

          <div className="flex items-center justify-end gap-2 self-end sm:self-auto">
            <AvatarRtl />
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
