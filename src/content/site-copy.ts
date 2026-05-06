/**
 * Landing UI copy (Russian). Keep `FEATURE_ICONS` in `Features.tsx` in sync with `featuresSectionCopy.cards`.
 */

/** Navbar: show header glass tint after scrolling past this Y. */
export const NAV_GLASS_SCROLL_THRESHOLD_PX = 400;
/** Navbar: scrolling up above this offset clears auxiliary nav mode when hero download is in view. */
export const NAV_SCROLL_SHOW_DOWNLOAD_PX = 220;
/** Show floating “scroll to top” control past this scroll Y. */
export const NAV_SCROLL_TOP_SHOW_PX = 320;

export const navCopy = {
  linkFeatures: "Возможности",
  linkHowItWorks: "Как работает",
  scrollToTop: "Наверх",
} as const;

export const heroCopy = {
  title: "ZAPRET",
  subtitle:
    "Доступ к YouTube и Discord без лишних настроек. Программа сама подберёт нужную стратегию и параметры под вашу сеть. Нажал один раз — и всё работает.",
  downloadWindows: "Скачать для Windows",
  heroGithub: "GitHub",
  heroTelegram: "Telegram",
  versionFetchErrorTitle: "Не удалось получить версию с GitHub",
} as const;

/** Shared download icon sizing/motion — hero and navbar CTAs use the same markup. */
export const primaryDownloadIconClassName =
  "size-4 shrink-0 transition-transform duration-heroChevron ease-out-alt group-hover:-translate-y-px";

export const featuresSectionCopy = {
  kicker: "— Возможности",
  title: "Обход без сложностей.",
  lead: "Всё, что раньше требовало перебора десятков стратегий и сложной настройки — теперь в одном приложении.",
  /** Order aligns with `FEATURE_ICONS`: Zap → Shuffle → Cpu → Eye → ShieldCheck → Sparkles. */
  cards: [
    {
      title: "Автоподбор",
      description: "Автоматически находит рабочую стратегию на вашем ПК без необходимости ручного подбора",
    },
    {
      title: "Переключение стратегий",
      description: "Переключайтесь между стратегиями парой кликов без перебора bat-файлов",
    },
    {
      title: "Системный трей и автозагрузка",
      description: "Настраиваемые системный трей и автозапуск при включении ПК",
    },
    {
      title: "Живой интерфейс",
      description: "Минималистичные анимации и отзывчивый UI на Tauri.",
    },
    {
      title: "Безопасно",
      description: "Полностью локально. Не собирает данные, открытый исходный код.",
    },
    {
      title: "Лёгковесно",
      description: "Весит меньше 10 МБ и практически не нагружает систему.",
    },
  ],
} as const;

export const howSectionCopy = {
  kicker: "— Как это работает",
  title: "Три шага",
  steps: [
    {
      number: "01",
      title: "Скачай",
      description: "Полная портативность. Запускай откуда угодно, никаких зависимостей в системе.",
    },
    {
      number: "02",
      title: "Запусти",
      description: "Открой приложение и запусти обход  — автоподбор сделает всё сам.",
    },
    {
      number: "03",
      title: "Пользуйся",
      description: "Наслаждайся просмотром YouTube и общением в Discord без ограничений.",
    },
  ],
} as const;

export const footerCopy = {
  copyright: "© 2026 ZAPRET GUI",
  createdByPrefix: "Автор:",
  authorName: "elev1e1nSure",
  linksNavLabel: "Репозитории проекта и канал",
  linkGuiRepo: "Приложение",
  linkCoreRepo: "Ядро обхода",
  linkTelegramChannel: "Канал в Telegram",
  disclaimer: "Не аффилированы с Google или Discord.",
} as const;

export const notFoundCopy = {
  code: "404",
  message: "Oops! Page not found",
  backHome: "Return to Home",
} as const;
