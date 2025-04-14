"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  CarouselApi,
  Carousel as CarouselContainer,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AdSlide } from "@/types";

export default function Carousel({
  locale,
  items,
}: {
  locale: string;
  items: AdSlide[];
}) {
  const dir = locale === "en" ? "ltr" : "rtl";
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div>
      <CarouselContainer
        setApi={setApi}
        plugins={[plugin.current]}
        className="relative w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          direction: dir,
        }}
      >
        <CarouselContent className="h-full">
          {items.map((item, index) => (
            <CarouselItem className="mx-0 px-0" key={index}>
              <div
                className="w-full h-[30rem] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              ></div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`
              size-4 md:size-5 xl:size-6 rounded-full border-2 border-white
              ${current === index ? "bg-white" : "bg-transparent"}
              transition-colors duration-300
            `}
            />
          ))}
        </div>
      </CarouselContainer>
    </div>
  );
}
