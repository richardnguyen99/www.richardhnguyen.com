"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";

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

type Props = React.PropsWithChildren<
  {
    metadatas: (FrontMatter & { excerpt: string | null })[];
  } & React.HTMLAttributes<HTMLDivElement>
>;

const WebDevCategoryCarousel: React.FC<Props> = ({
  metadatas,
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
        slidesInView[2] === metadatas.length - 1
      ) {
        setDisableNextState(true);
      } else {
        setDisableNextState(false);
      }
    });

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
          {metadatas.map((metadata) => (
            <CarouselItem
              key={metadata.title}
              className="ease-curve-a group aspect-[4/3] h-[calc((((var(--document-size)_-_2rem_-_(1rem_*_2))_*_3_/_4)_/_3))] min-w-0 flex-[0_0_calc(var(--document-size)/2-8px)] transform-gpu rounded-lg pl-0 pr-4 transition duration-300 lg:flex-[0_0_calc((1024px/2)-16px)]"
            >
              <Card className="h-full w-full">
                <Link href={`/blog/${metadata.slug}`}>
                  <CardContent className="relative h-full w-full p-0">
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-10">
                      <div className="relative z-50 h-full w-full">
                        <div className="text-4 absolute left-0 top-[1rem] flex w-full flex-wrap items-center gap-2 text-gray-200">
                          <div className="ml-4 truncate">
                            <span className="block text-xs leading-[1.3]">
                              {metadata.category}
                            </span>
                          </div>
                          <DotFilledIcon className="h-2 w-2" />
                          <span className="break-none block truncate text-xs leading-[1.3]">
                            {metadata.date.toLocaleDateString("en-us", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="ease-curve-d absolute bottom-[1rem] left-[1rem] right-[1rem] text-balance leading-snug transition-[bottom] duration-300 group-hover:bottom-[calc(100%-6rem)]">
                          <div className="text-[15px] text-white">
                            <div className="mt-4 line-clamp-2 items-start text-balance text-lg font-bold leading-[1.3] md:mt-6 lg:text-2xl">
                              {metadata.title}
                            </div>
                          </div>
                        </div>

                        <div className="ease-curve-d absolute bottom-[-4rem] left-[1rem] right-[1rem] text-balance leading-snug transition-[bottom] duration-300 group-hover:bottom-[calc(100%-11rem)]">
                          <div className="text-[15px] text-gray-200">
                            <div className="leading mt-4 line-clamp-3 items-start text-balance text-sm md:mt-6">
                              {metadata.excerpt}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="[&_img]:ease-curve-d [&_video]:ease-curve-d ease-curve-c relative z-[1] mx-auto h-full w-full overflow-hidden transition-opacity duration-300 [&_img]:scale-100 [&_img]:transform-gpu [&_img]:transition-[transform,filter] [&_img]:duration-300 group-hover:[&_img]:scale-105 group-hover:[&_img]:blur-[25px] group-hover:[&_img]:drop-shadow-[0_0_120px_rgba(0,0,0,1)] [&_video]:transform-gpu [&_video]:transition-transform [&_video]:duration-300 group-hover:[&_video]:scale-105">
                      <div className="relative aspect-[4/3] h-full w-full">
                        <div className="ease-curve-c absolute bottom-0 left-0 right-0 top-0 z-50 rounded-lg bg-transparent transition-colors duration-300 group-hover:bg-black/25"></div>
                        <div className="ease-curve-d relative z-[40] aspect-[4/3] h-full w-full overflow-hidden rounded-lg bg-transparent transition-[background] duration-300">
                          <Image
                            src={metadata.thumbnail}
                            alt={metadata.title}
                            className="object-cover object-center"
                            loading="lazy"
                            fill={true}
                            sizes="(max-width: 1024px) 100vw, 1024px"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
};

export default WebDevCategoryCarousel;
