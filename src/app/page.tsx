


import Header from "@/components/Header";
import { TemplateGallery } from "@/components/Home/Templates";
import { RecentFilesTable } from "@/components/Home/Documents";

import HomeHeader from "@/components/Home/HomeHeader";
import Hero from "@/components/Home/Hero";
import HeroCreateDocumentButton from "@/components/Home/HeroCreateDocumentButton";


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
             <HeroCreateDocumentButton/>
            </div>
          </div>
        </section>
        <TemplateGallery />
        <RecentFilesTable />
      </main>
    </div>
  );
}
