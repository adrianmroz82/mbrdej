// TODO: apply rwd

import { PrefetchLink } from "@/components/prefetch-link";
import { LogoIcon } from "@/components/ui/logo-icon";
import { config } from "@/page.config";

export function Header() {
  const { navigation } = config;

  return (
    <header className="backdrop-blur-xs nav-border-reveal sticky top-0 z-50 bg-white/90">
      <nav>
        <div className="flex items-center justify-between p-6 px-36">
          <div className="text-lg font-semibold">
            <PrefetchLink href="/">
              <LogoIcon />
            </PrefetchLink>
          </div>

          <div className="flex space-x-8 text-lg">
            {navigation.map(({ title, href }) => (
              <PrefetchLink key={href} href={href} className="hover:underline">
                {title}
              </PrefetchLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
