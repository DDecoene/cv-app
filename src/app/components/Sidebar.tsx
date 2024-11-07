import { PersonalInfo } from "@/lib/types";
import Image from "next/image";

interface SidebarProps {
  personal: PersonalInfo;
  languages: { [key: string]: number };
}

const LanguageLevel = ({ level }: { level: number }) => {
  const dots = [];
  const total = 5;

  for (let i = 0; i < total; i++) {
    dots.push(
      <div
        key={i}
        className={`w-3 h-3 rounded-full ${
          i < level ? "bg-metal" : "bg-gray-300"
        }`}
      />
    );
  }

  return <div className="flex gap-1">{dots}</div>;
};

// SVG Components
const TopCurve = () => (
  <span className="absolute top-0 left-0 right-0 w-full text-metal">
    <div className="bg-metal pt-10">&nbsp;</div>
    <svg
      className="w-full"
      height="120"
      viewBox="0 0 300 120"
      preserveAspectRatio="none"
      fill="currentcolor"
    >
      <path d="M0,0 L300,0 L300,80 Q150,120 0,80 Z" />
    </svg>
  </span>
);

const BottomCurve = () => (
  <div className="absolute bottom-0 left-0 right-0 w-full text-metal">
    <svg
      className="w-full"
      height="80"
      viewBox="0 0 300 80"
      preserveAspectRatio="none"
      fill="currentcolor"
    >
      <path d="M0,0 Q150,80 300,0 L300,80 L0,80 Z" />
    </svg>
  </div>
);

export default function Sidebar({ personal, languages }: SidebarProps) {
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="relative pt-32 bg-gray-100 p-6 w-72 print:w-64 min-h-screen">
      <TopCurve />
      <div className="p-6 text-white print:p-6 absolute top-0 left-0 text-center w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold">{personal.name}</h1>
        {/* Profile Picture */}
        <div className="mt-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
            <Image
              src="/profile_pic_maxime.jpeg"
              alt="Profile picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="space-y-6 mt-32">
        <h2 className="text-2xl font-semibold text-metal">Personalia</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-metal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </span>
            <span>{personal.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-metal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            <span>{personal.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-metal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </span>
            <span>{personal.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-metal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </span>
            <span>{personal.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-metal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>{personal.birthDate}</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-metal mt-8">Talen</h2>
        <div className="space-y-4">
          {Object.entries(languages).map(([language, level]) => (
            <div key={language} className="flex justify-between items-center">
              <span>{language}</span>
              <LanguageLevel level={level} />
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-metal mt-8">
          Hobby&apos;s en interesses
        </h2>
        <div className="space-y-2">
          {personal.hobbies.split(", ").map((hobby) => (
            <div key={hobby} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-metal"></span>
              <span>{hobby}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full bg-metal text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download CV
        </button>
      </div>
      <BottomCurve />
    </div>
  );
}
