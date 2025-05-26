
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PI_API_KEY: string;
  readonly VITE_PI_SANDBOX: string;
  readonly VITE_VALIDATION_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
