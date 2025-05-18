import { PrefetchLink } from "@/components/prefetch-link";

export function Header() {
  return (
    <header className="backdrop-blur-xs nav-border-reveal sticky top-0 z-50 bg-white/90">
      <nav>
        <div className="flex items-center justify-between p-6 px-12">
          <div className="text-lg font-semibold">
            <PrefetchLink href="/" className="hover:underline">
              Logo
            </PrefetchLink>
          </div>

          <div className="flex space-x-8 text-lg">
            <PrefetchLink href="/about" className="hover:underline">
              About
            </PrefetchLink>
            <PrefetchLink href="/work" className="hover:underline">
              Work
            </PrefetchLink>
            <PrefetchLink href="/blog" className="hover:underline">
              Blog
            </PrefetchLink>
            <PrefetchLink href="/contact" className="hover:underline">
              Contact
            </PrefetchLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
