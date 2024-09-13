"use client";

import * as React from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useMediaQuery } from "@uidotdev/usehooks";

import { type FrontMatter } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryCard from "./category-card";

type Props = React.PropsWithChildren<
  {
    sectionHeading: string;
    metadatas: (FrontMatter & { excerpt: string | null })[];
  } & React.HTMLAttributes<HTMLDivElement>
>;

const CategoryCarousel: React.FC<Props> = ({
  metadatas,
  sectionHeading,
  className,
  ...rest
}) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 576px)");
  const [isVisible, setIsVisible] = React.useState(false);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(
    null,
  );

  // States to control the previous and next button actions and make sure the
  // carousel scroll to the first and the last element in view.
  // The viewport contains 2 slides with 0,1, or 2 overflow, partially visible
  // slides. For example. if there are 3 slides, the next count is 1, which
  // allows the next button to scroll to the last slide and make it visible.

  const [prevCount, setPrevCount] = React.useState(0);
  const [nextCount, setNextCount] = React.useState(
    metadatas.length - (isSmallDevice ? 1 : 2),
  );

  const handlePrevClick = React.useCallback(() => {
    if (carouselApi) {
      setPrevCount((prev) => prev - 1);
      setNextCount((next) => next + 1);

      carouselApi.scrollPrev();
    }
  }, [carouselApi]);

  const handleNextClick = React.useCallback(() => {
    if (carouselApi) {
      setPrevCount((prev) => prev + 1);
      setNextCount((next) => next - 1);

      carouselApi.scrollNext();
    }
  }, [carouselApi]);

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setIsVisible(true);
  }, [carouselApi, metadatas.length]);

  return (
    <Carousel
      setApi={setCarouselApi}
      opts={{
        align: "start",
        // Scroll 1 item at a time instead of the container
        containScroll: false,
      }}
      plugins={[WheelGesturesPlugin({})]}
      style={
        {
          "--carousel-items": `${metadatas.length}`,
        } as React.CSSProperties
      }
      {...rest}
      className={cn("", className)}
    >
      <div className="container relative flex items-center justify-between p-8">
        <h2 className="text-lg font-normal md:text-2xl md:font-semibold lg:text-3xl lg:font-extrabold">
          {sectionHeading}
        </h2>
        <div className="flex items-center gap-4">
          <CarouselPrevious
            disabled={prevCount === 0}
            aria-disabled={prevCount === 0}
            onClick={handlePrevClick}
            className="relative left-0 top-0 translate-x-0 translate-y-0"
          />
          <CarouselNext
            disabled={nextCount <= 0}
            aria-disabled={nextCount <= 0}
            onClick={handleNextClick}
            className="relative right-0 top-0 translate-x-0 translate-y-0"
          />
        </div>
      </div>

      <div
        className="mx-auto w-[var(--document-size)] max-w-full"
        style={{
          visibility: isVisible ? "visible" : "hidden",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <CarouselContent className="ml-[var(--gutter-size)] flex touch-pan-y">
          {metadatas.map((metadata) => (
            <CategoryCard key={metadata.slug} metadata={metadata} />
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
};

export default CategoryCarousel;
