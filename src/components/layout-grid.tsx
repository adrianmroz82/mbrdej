"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Grid2X2, Grid3X3 } from "lucide-react";
import Image from "next/image";
import { type JSX, type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: JSX.Element | ReactNode | string;
  thumbnail: string;
  orientation?: "landscape" | "portrait";
  className?: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [isGalerySizeSmaller, setIsGalerySizeSmaller] = useState(true);

  const handleClick = (card: Card) => setSelected(card);
  const handleOutsideClick = () => setSelected(null);

  const toggleLayout = () => {
    // e.stopPropagation();
    setIsGalerySizeSmaller((prev) => !prev);
    // fix user-select when clicking the toggle button
  };

  return (
    <>
      {isGalerySizeSmaller ? (
        <Grid3X3
          className="w-12 h-12 p-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event propagation
            toggleLayout();
          }}
          color="black"
        />
      ) : (
        <Grid2X2
          className="w-12 h-12 p-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event propagation
            toggleLayout();
          }}
          color="black"
        />
      )}
      <div className="w-full h-full py-8 flex flex-wrap mx-auto relative">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={cn(
              card.className,
              ` w-full md:w-1/2 2xl:w-1/3 ${isGalerySizeSmaller ? "aspect-[4/3]" : "aspect-[3/2]"} cursor-pointer relative overflow-hidden min-h-[300px] xl:min-h-[450px] 2xl:min-h-[500px] h-full`
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

        {/* Overlay and Expanded Card */}
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
                  // objectFit="cover"
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
