import { ReactNode } from "react";

import { Header } from "@/components/ui/header";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex flex-col  justify-between mt-4">
        <Header />
        {children}
      </main>
    </>
  );
}
