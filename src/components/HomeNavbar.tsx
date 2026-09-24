import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const HomeNavbar = () => {
  return (
    <header className="px-3 py-3 sm:px-5">
      <div className="container mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="self-start sm:self-auto">
          <div className="relative h-10 w-36 sm:h-12 sm:w-48 md:w-52">
            <Image
              loading="eager"
              src="/syncdocs-logo.svg"
              className="object-contain"
              alt="syncDocs"
              fill
            />
          </div>
        </Link>

        <div className="flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
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
};

export default HomeNavbar;
