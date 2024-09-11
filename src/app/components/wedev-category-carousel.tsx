"use client";
import * as React from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { type FrontMatter } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useIsFirstRender } from "@uidotdev/usehooks";

type Props = React.PropsWithChildren<
  {
    frontMatters: FrontMatter[];
  } & React.HTMLAttributes<HTMLDivElement>
>;

const WebDevCategoryCarousel: React.FC<Props> = ({
  frontMatters,
  className,
  ...rest
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(
    null,
  );
  const [disableNextState, setDisableNextState] = React.useState(false);

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.on("slidesInView", (api, _evt) => {
      const slidesInView = api.slidesInView();

      if (
        slidesInView.length === 3 &&
        slidesInView[2] === frontMatters.length - 1
      ) {
        setDisableNextState(true);
      } else {
        setDisableNextState(false);
      }
    });

    setIsVisible(true);
  }, [carouselApi, frontMatters.length]);

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
          "--carousel-items": `${frontMatters.length}`,
        } as React.CSSProperties
      }
      {...rest}
      className={cn("", className)}
    >
      <div className="">
        <div className="container relative flex items-center justify-between p-8">
          <h2 className="text-2xl font-semibold">Web Development</h2>
          <div className="flex items-center gap-4">
            <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0">
              <ChevronLeftIcon className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext
              disabled={disableNextState}
              className="relative right-0 top-0 translate-x-0 translate-y-0"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </CarouselNext>
          </div>
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
          {frontMatters.map((frontMatter) => (
            <CarouselItem
              key={frontMatter.title}
              className="min-w-0 flex-[0_0_calc(var(--document-size)/2-8px)] pl-0 pr-4 lg:flex-[0_0_calc((1024px/2)-16px)]"
            >
              <Card className="p-0">
                <CardContent>
                  <div className="flex h-full flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold">{frontMatter.title}</h2>
                    <p className="text-sm">Some description</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
};

export default WebDevCategoryCarousel;
