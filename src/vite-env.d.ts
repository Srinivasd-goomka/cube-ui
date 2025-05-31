interface ImportMetaEnv {
  VITE_API_URL: string;
  readonly VITE_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.css" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare const __COMMIT_HASH__: string;
declare const __COMMIT_DATE__: string;
