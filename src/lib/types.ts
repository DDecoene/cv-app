export interface PersonalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  birthDate: string;
  birthPlace: string;
  gender: string;
  nationality: string;
  maritalStatus: string;
  driversLicense: string;
  hobbies: string;
}

export interface Education {
  period: string;
  study: string;
  institution: string;
}

export interface Experience {
  company: string;
  location?: string;
  period: string;
  duration: string;
  work: string;
}

export interface CVData {
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  languages: {
    [key: string]: number;  // Changed from string to number
  };
}