/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Fallback release tag when the browser cannot reach the GitHub API. */
  readonly VITE_ZAPRET_GUI_FALLBACK_VERSION?: string;
}
