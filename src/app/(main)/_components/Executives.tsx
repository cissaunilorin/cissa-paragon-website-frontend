"use client";

import {
  Facebook,
  Twitter,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { executives } from "../../../lib/executives";

export default function Executives() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(checkScroll, 300);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div id="executives" className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Meet Our <span className="text-primary">Executives</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Get to know the dedicated team leading CISSA towards excellence
          </p>
        </div>

        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-primary shadow-lg ${
              !canScrollLeft
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-110"
            } transition-all hidden md:flex`}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-primary shadow-lg ${
              !canScrollRight
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-110"
            } transition-all hidden md:flex`}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={carouselRef}
            onScroll={checkScroll}
            className="carousel carousel-center w-full p-4 space-x-4 rounded-box"
          >
            {executives.map((executive, index) => (
              <div
                key={index}
                className="carousel-item w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <div className="card bg-base-100 shadow-lg w-full">
                  <figure className="px-4 pt-4 relative h-64 w-full">
                    <Image
                      src={executive.image}
                      alt={executive.name}
                      fill
                      className="rounded-xl object-contain"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h3 className="card-title font-bold">{executive.name}</h3>
                    <p className="text-base-content/70">{executive.position}</p>
                    <div className="flex gap-4 mt-2">
                      {executive.socials?.facebook && (
                        <a
                          href={executive.socials.facebook}
                          className="text-primary hover:text-primary/80"
                        >
                          <Facebook size={20} />
                        </a>
                      )}
                      {executive.socials?.twitter && (
                        <a
                          href={executive.socials.twitter}
                          className="text-primary hover:text-primary/80"
                        >
                          <Twitter size={20} />
                        </a>
                      )}
                      {executive.socials?.linkedin && (
                        <a
                          href={executive.socials.linkedin}
                          className="text-primary hover:text-primary/80"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`btn btn-circle btn-primary ${
                !canScrollLeft ? "opacity-50" : ""
              }`}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`btn btn-circle btn-primary ${
                !canScrollRight ? "opacity-50" : ""
              }`}
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
