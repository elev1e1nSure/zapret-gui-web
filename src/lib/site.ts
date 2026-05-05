/** Direct link to the latest Windows build (GitHub Releases). */
export const DOWNLOAD_EXE_URL =
  "https://github.com/elev1e1nSure/zapret-gui/releases/latest/download/zapret-gui.exe";

/** Desktop GUI (Tauri) — основной репозиторий приложения. */
export const REPO_GUI_APP = "https://github.com/elev1e1nSure/zapret-gui";

/** GitHub REST: последний релиз zapret-gui (публичный репозиторий, без токена). */
export const ZAPRET_GUI_RELEASES_LATEST_API =
  "https://api.github.com/repos/elev1e1nSure/zapret-gui/releases/latest";

/**
 * URL, с которого React запрашивает релиз.
 * В `pnpm dev` — тот же origin через Vite proxy (меньше проблем с CORS и лимитом, корректный User-Agent со стороны Node).
 */
export const ZAPRET_GUI_RELEASES_LATEST_FETCH_URL = import.meta.env.DEV
  ? "/__gh-api/repos/elev1e1nSure/zapret-gui/releases/latest"
  : ZAPRET_GUI_RELEASES_LATEST_API;

/**
 * Если GitHub API недоступен (лимит, блокировщик, сеть), подставляется эта строка как `tag`.
 * В CI/деплое: `VITE_ZAPRET_GUI_FALLBACK_VERSION=v1.2.3`.
 */
export const ZAPRET_GUI_VERSION_FALLBACK_RAW = import.meta.env.VITE_ZAPRET_GUI_FALLBACK_VERSION?.trim() ?? "";

/** Исходники этого лендинга. */
export const REPO_WEBSITE = "https://github.com/elev1e1nSure/zapret-gui-web";

/** Upstream «zapret-discord-youtube» — ядро обхода. */
export const REPO_ZAPRET_DISCORD_YT = "https://github.com/Flowseal/zapret-discord-youtube";

export const TELEGRAM_NEWS_URL = "https://t.me/zapret_gui_news";

export const AUTHOR_GITHUB_URL = "https://github.com/elev1e1nSure";
