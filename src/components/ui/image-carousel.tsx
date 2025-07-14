"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

export function ImageCarousel({ images, interval = 3000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setIsVisible(false);

      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsVisible(true);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative max-w-6xl w-full mx-auto h-80 md:h-96 lg:h-[32rem] overflow-hidden rounded-md bg-gray-100 shadow-lg">
      <div
        className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Carousel image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority={currentIndex === 0}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
