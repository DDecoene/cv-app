// src/lib/cv-config.ts
import yaml from "js-yaml";
import { promises as fs } from "fs";
import { CVData } from "./types";

export async function loadCVData(): Promise<CVData> {
  // Use CV_DATA_FILE env variable if set, otherwise use default
  const cvFileName = process.env.CV_DATA_FILE || 'cv-data.yaml';
  const cvPath = process.cwd() + "/public/" + cvFileName;
  
  try {
    const file = await fs.readFile(cvPath, "utf8");
    return yaml.load(file) as CVData;
  } catch (error) {
    console.error(`Error loading CV data from ${cvPath}:`, error);
    // Fallback to default if specified file not found
    if (cvFileName !== 'cv-data.yaml') {
      console.warn('Falling back to default cv-data.yaml');
      const defaultFile = await fs.readFile(process.cwd() + "/public/cv-data.yaml", "utf8");
      return yaml.load(defaultFile) as CVData;
    }
    throw error;
  }
}