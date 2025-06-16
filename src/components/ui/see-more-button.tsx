"use client";

import { ArrowRightIcon } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/shadcn-ui/button";

export function RedirectButton({ text, href }: { text: string; href: string }) {
  return (
    <Button
      icon={ArrowRightIcon}
      effect="expandIcon"
      iconPlacement="right"
      className="w-2/5 p-[30px] text-lg rounded-[30px] font-helvetica"
      onClick={() => {
        redirect(href);
      }}>
      {text}
    </Button>
  );
}
