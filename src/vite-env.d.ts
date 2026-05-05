/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Запасная версия для лендинга, если браузер не смог запросить GitHub API. */
  readonly VITE_ZAPRET_GUI_FALLBACK_VERSION?: string;
}
