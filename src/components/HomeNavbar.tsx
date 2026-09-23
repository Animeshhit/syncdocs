import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const HomeNavbar = () => {
  return (
    <header className="px-5 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="relative w-50 h-12.5">
            <Image
              loading="eager"
              src="/syncdocs-logo.svg"
              className="object-contain"
              alt="syncDocs"
              fill
            />
          </div>
        </Link>

        <UserButton />
      </div>
    </header>
  );
};

export default HomeNavbar;
