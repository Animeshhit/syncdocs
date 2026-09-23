"use client";

import { templates, type TemplateType } from "@/lib/templates";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

export default function TemplatesComponent() {
  const router = useRouter();

  const [isCreating, setCreating] = useState(false);

  const create = useMutation(api.document.create);

  const onTemplateClick = (title: string, initialContent: string) => {
    setCreating(true);
    create({ title, initialContent })
      .then((documentId) => {
        router.push(`/document/${documentId}`);
      })
      .finally(() => {
        setCreating(false);
      });
  };

  return (
    <div className="bg-blue-200 py-6">
      <div className="container mx-auto px-6">
        <Carousel className="w-full">
          <CarouselContent className="-ml-0.5 sm:-ml-1 lg:-ml-1.5">
            {templates.map((t: TemplateType, index: number) => (
              <CarouselItem
                key={`${t.name}-${index}`}
                className="basis-1/3 pl-0.5 sm:basis-1/4 sm:pl-1 md:basis-1/5 lg:basis-1/6 lg:pl-1.5 xl:basis-[14.2857%]"
              >
                <button
                  disabled={isCreating}
                  type="button"
                  onClick={() => onTemplateClick(t.name, t.initialContent)}
                  className="w-full flex flex-col gap-2 aspect-square cursor-pointer rounded-md transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  <Image
                    className="object-cover"
                    src={t.thumbnail}
                    alt={t.name}
                    width={150}
                    height={80}
                  />
                  <span className="text-xs sm:text-sm md:text-base">
                    {t.name}
                  </span>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-end gap-2 mt-3">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
