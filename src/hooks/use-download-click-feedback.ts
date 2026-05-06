import { useCallback, useEffect, useRef, useState } from "react";

export const DOWNLOAD_CLICK_FEEDBACK_MS = 2200;

/** После клика «Скачать» кратко показываем полоску внизу кнопки (класс `btn-download-fill--downloading`). */
export function useDownloadClickFeedback() {
  const [downloading, setDownloading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const onDownloadActivate = useCallback(() => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setDownloading(true);
    timerRef.current = setTimeout(() => {
      setDownloading(false);
      timerRef.current = null;
    }, DOWNLOAD_CLICK_FEEDBACK_MS);
  }, []);

  return { downloading, onDownloadActivate };
}
