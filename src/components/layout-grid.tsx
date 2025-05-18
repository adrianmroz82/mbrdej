"use client";

import { useState, type ReactNode, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Grid2X2, Grid3X3 } from "lucide-react";

type Card = {
  id: number;
  content: JSX.Element | ReactNode | string;
  className?: string;
  thumbnail: string;
  orientation?: "landscape" | "portrait";
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
      <div className="w-full h-full p-8 flex flex-wrap max-w-8xl mx-auto gap-4 relative">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            // className={cn(card.className, "w-auto h-full min-h-[500px] cursor-pointer overflow-hidden relative")}
            className={cn(
              card.className,
              `w-auto ${!isGalerySizeSmaller && "h-full"} cursor-pointer overflow-hidden relative ${
                isGalerySizeSmaller ? "min-h-[350px]" : "min-h-[500px]"
              }`
            )}
            onClick={() => handleClick(card)}
            // whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
            style={{
              flex: "1 1 auto",
              minWidth: "200px",
              maxWidth: isGalerySizeSmaller ? "calc(20% - 1rem)" : "calc(33.33% - 1rem)",
            }} // Ensures responsiveness
          >
            <Image
              width={800}
              height={800}
              src={card.thumbnail}
              loading="lazy"
              className="object-cover h-full w-full"
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
