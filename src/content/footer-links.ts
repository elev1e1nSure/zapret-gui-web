import type { LucideIcon } from "lucide-react";
import { Github, Send } from "lucide-react";

import { REPO_GUI_APP, REPO_ZAPRET_DISCORD_YT, TELEGRAM_NEWS_URL } from "@/lib/site";

import { footerCopy } from "./site-copy";

export type FooterLinkItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  title: string;
};

export const footerLinks: readonly FooterLinkItem[] = [
  {
    href: REPO_GUI_APP,
    label: footerCopy.linkGuiRepo,
    icon: Github,
    title: "zapret-gui — исходный код приложения",
  },
  {
    href: REPO_ZAPRET_DISCORD_YT,
    label: footerCopy.linkCoreRepo,
    icon: Github,
    title: "zapret-discord-youtube — ядро для Discord и YouTube",
  },
  {
    href: TELEGRAM_NEWS_URL,
    label: footerCopy.linkTelegramChannel,
    icon: Send,
    title: "Официальный канал с новостями и релизами",
  },
];
