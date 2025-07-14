import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn-ui/accordion";
import { PageConfig } from "@/page.config";

interface Props {
  content: PageConfig["faq"];
}

export function FAQ({ content }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      {content.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
