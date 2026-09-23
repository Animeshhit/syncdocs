import Documents from "@/components/Document/Documents";
import TemplatesComponent from "@/components/Document/Templates";
import HomeNavbar from "@/components/HomeNavbar";
import {auth} from "@clerk/nextjs/server";

export default async function Home() {
  await auth.protect();
  return (
    <main>
      <HomeNavbar/>
      <TemplatesComponent/>
      <Documents/>
    </main>
  )
}