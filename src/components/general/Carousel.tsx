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

const itemsStatic = [
  {
    id: 1,
    title: "slide1",
    image:
      "https://images.unsplash.com/photo-1578349035260-9f3d4042f1f7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "slide2",
    image:
      "https://images.unsplash.com/photo-1587323655395-b1c77a12c89a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "slide3",
    image:
      "https://images.unsplash.com/photo-1567746455504-cb3213f8f5b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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
          {itemsStatic.map((item, index) => (
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
          {itemsStatic.map((_, index) => (
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
