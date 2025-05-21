
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PI_API_KEY: string;
  readonly VITE_PI_SANDBOX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
