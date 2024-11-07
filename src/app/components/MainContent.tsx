import { Education, Experience } from "@/lib/types";

interface MainContentProps {
  profile: string[];
  education: Education[];
  experience: Experience[];
}

export default function MainContent({ profile, education, experience }: MainContentProps) {
  return (
    <div className="flex-1 p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-semibold text-metal mb-4">Profiel</h2>
        <div className="space-y-4">
          {profile.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-metal mb-4">Opleidingen</h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{edu.study}</h3>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
              <span className="text-metal">{edu.period}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-metal mb-4">Werkervaring</h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{exp.company}</h3>
                {exp.location && <p className="text-gray-600">{exp.location}</p>}
                <p>{exp.work}</p>
              </div>
              <div className="text-right">
                <span className="text-metal">{exp.period}</span>
                <p className="text-gray-600">Duur: {exp.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}