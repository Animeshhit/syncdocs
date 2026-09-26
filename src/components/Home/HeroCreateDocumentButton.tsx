"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { ArrowUpRight, FilePlus2, Loader2 } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { ConvexError } from "convex/values";
import { useRouter } from "next/navigation";

function HeroCreateDocumentButton() {
  //convex functions
  const ConvexCreateDocument = useMutation(api.document.create);
  //state
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createDocument = async () => {
    setIsLoading(true);
    try {
      const createdDocumentId = await ConvexCreateDocument({
        title: "Untitle Document",
        initialContent: "",
      });

      router.push(`/document/${createdDocumentId}`);
      
    } catch (err) {
      if (err instanceof ConvexError) {
        showToast.error(err.data ?? "Something went wrong!!!", {
          position: "bottom-right",
          sound: false,
        });
      } else {
        showToast.error("Something went wrong!!", {
          position: "bottom-right",
          sound: false,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={createDocument}
      disabled={isLoading}
      className="w-fit gap-2 rounded-[28px] bg-foreground px-5 text-background hover:bg-foreground/90"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> <span>Loading..</span>
        </div>
      ) : (
        <>
          <FilePlus2 data-icon="inline-start" /> New document{" "}
          <ArrowUpRight data-icon="inline-end" />
        </>
      )}
    </Button>
  );
}

export default HeroCreateDocumentButton;
