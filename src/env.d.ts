// src/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      CV_DATA_FILE?: string;
    }
  }