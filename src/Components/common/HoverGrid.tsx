"use client";

import { cn } from "@/utils/cn";
import { ServiceCard } from "../UI/ServiceCard";

export const HoverGrid = ({
  cards,
  className,
}: {
  cards: any[];
  className?: string;
}) => {

  return (
    <div
      className={cn(
        "w-full grid grid-cols-1 md:grid-cols-2 mt-16 gap-4",
        className
      )}
    >
      {cards.map((item, idx) => (
        <div
          key={item?.id}
          className="relative group  block p-2 h-full w-full"
        >
          <ServiceCard item={item} />
        </div>
      ))}
    </div>
  );
};
