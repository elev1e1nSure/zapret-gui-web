/**
 * Тексты лендинга — правьте по желанию.
 * Порядок карточек «Возможности» должен совпадать с порядком иконок в `Features.tsx`.
 */

export const NAV_SCROLL_SHOW_DOWNLOAD_PX = 220;
/** Прокрутка ниже этой отметки — показываем кнопку «наверх» (справа снизу). */
export const NAV_SCROLL_TOP_SHOW_PX = 320;

export const navCopy = {
  linkFeatures: "Возможности",
  linkHowItWorks: "Как работает",
  headerDownload: "Скачать",
  /** Плавающая кнопка прокрутки вверх. */
  scrollToTop: "Наверх",
} as const;

export const heroCopy = {
  title: "ZAPRET",
  subtitleBeforeBreak: "GUI-обёртка для обхода блокировок Discord и YouTube.",
  subtitleAfterBreak: "Один клик вместо bat-файлов.",
  downloadWindows: "Скачать для Windows",
  heroGithub: "GitHub",
  heroTelegram: "Telegram",
  /** title на блоке версии при ошибке загрузки с GitHub */
  versionFetchErrorTitle: "Не удалось получить версию с GitHub",
} as const;

export const featuresSectionCopy = {
  kicker: "— Возможности",
  title: "Обход без сложностей.",
  lead: "Всё, что раньше требовало перебора десятков стратегий и сложной настройки — теперь в одном приложении.",
  /**
   * Карточки по порядку: Zap → Shuffle → Cpu → Eye → ShieldCheck → Sparkles
   * (см. массив иконок в components/Features.tsx).
   */
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
  /** Подпись перед ссылкой на автора */
  createdByPrefix: "Автор:",
  authorName: "elev1e1nSure",
  linksNavLabel: "Репозитории проекта и канал",
  /** zapret-gui — клиентское приложение */
  linkGuiRepo: "Приложение",
  /** zapret-discord-youtube — ядро обхода */
  linkCoreRepo: "Ядро обхода",
  linkTelegramChannel: "Канал в Telegram",
  disclaimer: "Не аффилированы с Google или Discord.",
} as const;

export const notFoundCopy = {
  code: "404",
  message: "Oops! Page not found",
  backHome: "Return to Home",
} as const;
