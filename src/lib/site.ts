/** Direct link to the latest Windows build (GitHub Releases). */
export const DOWNLOAD_EXE_URL =
  "https://github.com/elev1e1nSure/zapret-gui/releases/latest/download/zapret-gui.exe";

/** Desktop GUI (Tauri) app repository. */
export const REPO_GUI_APP = "https://github.com/elev1e1nSure/zapret-gui";

/** GitHub REST: latest public release (no auth token). */
export const ZAPRET_GUI_RELEASES_LATEST_API =
  "https://api.github.com/repos/elev1e1nSure/zapret-gui/releases/latest";

/**
 * URL the client uses to read the latest release.
 * In dev, same-origin `/__gh-api` via Vite proxy (CORS + API rate limits; Node sets `User-Agent`).
 */
export const ZAPRET_GUI_RELEASES_LATEST_FETCH_URL = import.meta.env.DEV
  ? "/__gh-api/repos/elev1e1nSure/zapret-gui/releases/latest"
  : ZAPRET_GUI_RELEASES_LATEST_API;

/**
 * When the API is unavailable, this string is parsed as the release tag.
 * Set in CI/deploy: `VITE_ZAPRET_GUI_FALLBACK_VERSION=v1.2.3`.
 */
export const ZAPRET_GUI_VERSION_FALLBACK_RAW = import.meta.env.VITE_ZAPRET_GUI_FALLBACK_VERSION?.trim() ?? "";

/** This marketing site repository. */
export const REPO_WEBSITE = "https://github.com/elev1e1nSure/zapret-gui-web";

/** Upstream core used for Discord/YouTube bypass strategies. */
export const REPO_ZAPRET_DISCORD_YT = "https://github.com/Flowseal/zapret-discord-youtube";

export const TELEGRAM_NEWS_URL = "https://t.me/zapret_gui_news";

export const AUTHOR_GITHUB_URL = "https://github.com/elev1e1nSure";
