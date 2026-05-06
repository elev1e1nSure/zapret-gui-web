import { footerCopy } from "@/content/site-copy";
import { footerLinks } from "@/content/footer-links";
import { AUTHOR_GITHUB_URL } from "@/lib/site";

export const SiteFooter = () => (
  <footer className="relative mt-4 bg-muted/25 pt-7 pb-4 text-center text-sm text-muted-foreground border-t border-border/15">
    <div className="container mx-auto max-w-lg px-6 space-y-2">
      <p className="leading-snug text-soft">
        <span className="font-medium text-foreground/85">{footerCopy.copyright}</span>
        <span className="mx-1.5 text-[1.05rem] font-medium leading-none text-muted-foreground/80 tabular-nums" aria-hidden>
          ·
        </span>
        <span>
          {footerCopy.createdByPrefix}{" "}
          <a
            href={AUTHOR_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            title="GitHub профиля автора"
          >
            {footerCopy.authorName}
          </a>
        </span>
      </p>
      <nav aria-label={footerCopy.linksNavLabel}>
        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-2 gap-y-1 p-0 leading-snug text-soft">
          {footerLinks.map(({ href, label, icon: Icon, title }, index) => (
            <li key={href} className="flex items-center gap-x-2">
              {index > 0 ? (
                <span
                  className="select-none text-[1.05rem] font-medium leading-none text-muted-foreground/80 tabular-nums"
                  aria-hidden
                >
                  ·
                </span>
              ) : null}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link inline-flex items-center gap-1.5"
                title={title}
              >
                <Icon className="size-3.5 shrink-0 opacity-80" strokeWidth={2} aria-hidden />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="pt-0.5 text-[0.62rem] sm:text-[0.65rem] text-muted-foreground/35 max-w-md mx-auto leading-normal select-none">
        {footerCopy.disclaimer}
      </p>
    </div>
  </footer>
);
