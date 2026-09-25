

import { ArrowUpRight, Clock3, FilePlus2 } from "lucide-react";
import Header from "@/components/Header";
import { TemplateGallery } from "@/components/Home/Templates";
import { RecentFilesTable } from "@/components/Home/Documents";
import { Button } from "@/components/ui/button";
import HomeHeader from "@/components/Home/HomeHeader";
import Hero from "@/components/Home/Hero";


export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header>
        <HomeHeader/>
      </Header>
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <div className="rounded-[28px] home-bg-pattern px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div>
                <Hero/>
                <p className="mt-5 max-w-lg text-base leading-7 text-gray-300/70">
                  Everything your team is working on, in one calm and connected
                  place.
                </p>
              </div>
              <Button className="w-fit gap-2 rounded-[28px] bg-foreground px-5 text-background hover:bg-foreground/90">
                <FilePlus2 data-icon="inline-start" /> New document{" "}
                <ArrowUpRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </section>
        <TemplateGallery />
        <RecentFilesTable />
      </main>
    </div>
  );
}
