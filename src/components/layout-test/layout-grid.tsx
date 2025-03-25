"use client";
import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => setSelected(card);
  const handleOutsideClick = () => setSelected(null);

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-8xl mx-auto gap-4 relative">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className={cn(card.className, "w-full h-full min-h-[300px] cursor-pointer overflow-hidden relative")}
          onClick={() => handleClick(card)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.15 }}>
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
              <motion.div
                layoutId={`content-${selected?.id}`}
                // initial={{
                //   opacity: 0,
                //   y: 100,
                // }}
                // animate={{
                //   opacity: 1,
                //   y: 0,
                // }}
                // exit={{
                //   opacity: 0,
                //   y: 100,
                // }}
                // transition={{
                //   duration: 0.3,
                //   ease: "easeInOut",
                // }}
                className="relative px-8 py-8 z-[70]">
                {selected?.content}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
