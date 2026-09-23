import { Loader2 } from "lucide-react";
import Image from "next/image";
interface FullScreenLoaderProps {
  label?: string;
  className?: string;
}

function FullScreenLoading({ label, className }: FullScreenLoaderProps) {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <div className="relative w-50 h-12.5">
        <Image
          loading="eager"
          src="/syncdocs-logo.svg"
          className="object-contain"
          alt="syncDocs"
          fill
        />
      </div>

      <Loader2 className="animate-spin" />
    </div>
  );
}

export default FullScreenLoading;
