"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/templates";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { api } from "../../../convex/_generated/api";

export function TemplateGallery() {
  const rowRef = useRef<HTMLDivElement>(null);
  const scroll = (amount: number) =>
    rowRef.current?.scrollBy({ left: amount, behavior: "smooth" });

  const router = useRouter();

  const [isCreating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useMutation(api.document.create);

  const onTemplateClick = (title: string, initialContent: string) => {
    setError(null);
    setCreating(true);
    create({ title, initialContent })
      .then((documentId) => {
        router.push(`/document/${documentId}`);
      })
      .catch((err) => {
        if (err instanceof ConvexError) {
          setError(err.data as string);
        } else {
          setError("Something went wrong. Please try again.");
        }
      })
      .finally(() => {
        setCreating(false);
      });
  };

  return (
    <section className="border-y bg-muted relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Start from a template
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Create something great
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
              aria-label="Previous templates"
              onClick={() => scroll(-420)}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
              aria-label="Next templates"
              onClick={() => scroll(420)}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive"
          >
            {error === "Unauthorized"
              ? "You need to be signed in to create a document."
              : error}
          </div>
        )}

        <div
          ref={rowRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex min-w-max gap-4">
            {templates.map(({ name, thumbnail, initialContent }) => (
              <button
                disabled={isCreating}
                type="button"
                onClick={() => onTemplateClick(name, initialContent)}
                key={name}
                className="group cursor-pointer w-28 shrink-0 snap-start text-left sm:w-32 md:w-36 lg:w-40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="overflow-hidden bg-card transition duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5">
                  <div className="relative aspect-[3/4] w-full overflow-hidden border bg-background">
                    <Image
                      src={thumbnail}
                      alt={name}
                      fill
                      sizes="(min-width: 1024px) 160px, (min-width: 768px) 144px, (min-width: 640px) 128px, 112px"
                      className="object-contain p-1.5 dark:invert-0"
                    />
                  </div>
                </div>
                <p className="mt-3 truncate px-1 text-sm font-medium text-foreground">
                  {name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isCreating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
          <div className="flex items-center gap-2 rounded-md border bg-card px-4 py-2 shadow-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Creating document…</span>
          </div>
        </div>
      )}
    </section>
  );
}