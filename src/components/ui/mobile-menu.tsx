import { Menu, X } from "lucide-react";

import { PrefetchLink } from "@/components/prefetch-link";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/shadcn-ui/drawer";
import { PageConfig } from "@/page.config";

interface Props {
  items: PageConfig["navigation"];
}

export function MobileMenu({ items }: Props) {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu className="cursor-pointer" size={28} />
      </DrawerTrigger>
      <DrawerContent className="left-0 right-auto top-0 mt-0 h-screen w-full rounded-none">
        <DrawerClose className="px-5">
          <X size={28} />
        </DrawerClose>
        <div className="mx-auto w-full py-5 mt-6">
          <div className="mb-2 flex flex-col gap-4 py-2 text-center pb-2">
            {items.map(({ title, href }) => (
              <PrefetchLink key={href} href={href}>
                <DrawerClose>
                  <DrawerTitle className="text-2xl hover:underline">{title}</DrawerTitle>
                </DrawerClose>
              </PrefetchLink>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
