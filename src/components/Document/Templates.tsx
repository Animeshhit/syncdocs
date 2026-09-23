import { templates, type TemplateType } from "@/lib/templates";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function TemplatesComponent() {
  return (
    <div className="bg-blue-200 py-3">
      <div className="container mx-auto px-6">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {templates.map((t: TemplateType, index: number) => (
              <CarouselItem
                key={index}
                className="basis-1/3 pl-3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/7"
              >
                <div className="w-full flex flex-col gap-2 aspect-square">
                  <Image
                    className="object-cover"
                    src={t.thumbnail}
                    alt={t.name}
                    width={150}
                    height={80}
                  />
                  <span className="">{t.name}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
