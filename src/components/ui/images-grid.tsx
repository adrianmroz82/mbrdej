"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { type JSX, type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

interface Card {
  id: number;
  content: JSX.Element | ReactNode | string;
  thumbnail: string;
  className?: string;
}

export const ImagesGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => setSelected(card);
  const handleOutsideClick = () => setSelected(null);

  return (
    <>
      <div className="w-full gap-2 h-full py-8 flex flex-wrap mx-auto relative justify-between">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={cn(
              card.className,
              `w-full md:w-[calc(50%-0.5rem)] 2xl:w-[calc(33.333%-0.66rem)] cursor-pointer relative overflow-hidden min-h-[300px] lg:min-h-[350px] xl:max-h-[700px] 2xl:max-h-[750px]`
            )}
            onClick={() => handleClick(card)}
            transition={{ duration: 0.15 }}>
            <Image
              width={800}
              height={800}
              src={card.thumbnail}
              loading="lazy"
              className="object-cover w-full h-full"
              alt="thumbnail"
            />
          </motion.div>
        ))}

        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleOutsideClick}>
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <motion.div
                className="relative z-60 max-h-[100vh] max-w-[100vw] bg-white rounded-lg shadow-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ willChange: "transform, opacity" }}
                onClick={(e) => e.stopPropagation()}>
                <Image
                  width={800}
                  height={800}
                  src={selected.thumbnail}
                  loading="lazy"
                  className="object-contain h-full w-full max-h-[80vh] max-w-[80vw]"
                  alt="expanded-thumbnail"
                />
                <motion.div layoutId={`content-${selected?.id}`} className="relative px-8 py-8 z-[70]">
                  {selected?.content}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
