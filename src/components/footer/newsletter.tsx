import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter: React.FC = () => {
  return (
    <div className="relative h-full w-full">
      <div className="flex items-center gap-4">
        <div className="h-7 w-7 bg-white"></div>
        <h3 className="text-lg">richardhnguyen.com</h3>
      </div>

      <div className="relative mt-3 md:mt-6 lg:mt-8">
        <p className="text-sm">
          Subscribe to the newsletter for updates on new articles
        </p>

        <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
          <Input
            className="ease-curve-d transform-gpu border border-transparent bg-neutral-900 ring-0 transition-[background,_box_shadow] duration-300 hover:bg-neutral-800 hover:ring-1 hover:ring-neutral-700 focus-visible:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-500"
            type="email"
            placeholder="Email"
          />
          <Button
            className="ease-curve-d relative transform-gpu border border-transparent bg-neutral-900 text-white transition-[transform,box_shadow] duration-300 hover:bg-neutral-800 hover:ring-1 hover:ring-neutral-700 active:bg-neutral-700 active:ring-2 active:ring-neutral-500"
            type="submit"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
