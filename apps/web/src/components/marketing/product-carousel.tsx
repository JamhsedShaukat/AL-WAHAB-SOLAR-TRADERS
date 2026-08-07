"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductSummary } from "@wahab/types";
import { cn } from "@wahab/utils";
import { ProductCard } from "@/components/catalog/product-card";

/**
 * Scroll-snap carousel. Deliberately a thin decoration over server-rendered
 * cards: the products arrive as props from a Server Component, so Googlebot sees
 * the full list in the initial HTML even though the scrolling is client-side.
 */
export function ProductCarousel({ products }: { products: ProductSummary[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateEdges() {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    // One "page" of cards, so the control feels proportional on any width.
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateEdges}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-64 shrink-0 snap-start sm:w-72"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {products.length > 2 && (
        <div className="mt-4 flex justify-end gap-2">
          <CarouselButton
            direction="left"
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
          />
          <CarouselButton
            direction="right"
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
          />
        </div>
      )}
    </div>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous products" : "Next products"}
      className={cn(
        "focus-ring glass grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition-colors",
        "hover:bg-white/8 hover:text-white",
        disabled && "pointer-events-none opacity-40",
      )}
    >
      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
    </button>
  );
}
