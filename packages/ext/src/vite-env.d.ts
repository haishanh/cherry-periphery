/// <reference types="svelte" />
/// <reference types="vite/client" />

declare const __APP_ENV__: string;

interface ImportMetaEnv {
  readonly VITE_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
