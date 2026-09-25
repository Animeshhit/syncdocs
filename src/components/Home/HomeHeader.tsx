// import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";





function HomeHeader() {
  return (
     <Link href="/">
      <div className="flex items-center justify-center gap-1">
      <div className="relative w-6 h-6">
        <Image src="/icon-removebg-preview.png" alt="syncDocs" fill/>
      </div>
      <p className="font-semibold">Sync<span className="text-primary">Docs</span></p>
</div>
     </Link>
  )
}

export default HomeHeader