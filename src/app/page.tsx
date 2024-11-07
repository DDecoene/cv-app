import yaml from "js-yaml";
import { promises as fs } from "fs";
import { CVData } from "@/lib/types";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/public/cv-data.yaml",
    "utf8"
  );
  const data = yaml.load(file) as CVData;

  return (
    <main className="min-h-screen bg-white max-w-5xl mx-auto shadow-lg print:shadow-none print:max-w-none">
      <div className="flex print:flex">
        <Sidebar 
          personal={data.personal} 
          languages={data.languages as { [key: string]: number }}
        />
        <MainContent
          profile={data.skills}
          education={data.education}
          experience={data.experience}
        />
      </div>
    </main>
  );
}