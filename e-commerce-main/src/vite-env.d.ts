/// <reference types="vite/client" />
/// <reference types="mui-theme.d.ts" />
declare interface WrappedComponentProps {
  children?: React.ReactNode;
}

type ViteTypeOptions = {};

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  // add your environment variables here with VITE_ prefix for type safety
  // readonly VITE_MY_VARIABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare type ViewMode = 'view' | 'edit' | 'quick-view' | undefined;
