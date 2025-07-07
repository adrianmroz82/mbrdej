import { PrefetchLink } from "@/components/prefetch-link";
import { LogoIcon } from "@/components/ui/logo-icon";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { config } from "@/page.config";

export function Header() {
  const { navigation } = config;

  return (
    <header className="backdrop-blur-xs nav-border-reveal sticky top-0 z-50 bg-white/90">
      <nav>
        <div className="flex items-center justify-between px-12 lg:px-32 py-6 mx-auto">
          <div className="font-semibold hidden md:block">
            <PrefetchLink href="/">
              <LogoIcon />
            </PrefetchLink>
          </div>

          <div className="hidden md:flex space-x-8 text-lg">
            {navigation.map(({ title, href }) => (
              <PrefetchLink key={href} href={href} className="hover:underline">
                {title}
              </PrefetchLink>
            ))}
          </div>

          <div className="md:hidden">
            <MobileMenu items={navigation} />
          </div>
        </div>
      </nav>
    </header>
  );
}
