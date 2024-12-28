/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BLOCKCHAIN_API_URL: string;
    // Add other env variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }