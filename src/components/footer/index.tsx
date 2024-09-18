import * as React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-black text-white md:mt-20 lg:mt-28">
      <div className="container">
        <div className="grid grid-cols-12 grid-rows-2 py-12 lg:grid-rows-1">
          <div className="col-span-5 col-start-1 row-start-1">
            <div className="relative h-full w-full">
              <div className="flex items-center gap-4">
                <div className="h-7 w-7 bg-white"></div>
                <h3 className="text-lg">richardhnguyen.com</h3>
              </div>

              <div className="relative">
                <p className="text-sm">
                  Subscribe to the newsletter for updates on new articles
                </p>

                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="email" placeholder="Email" />
                  <Button type="submit">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 col-start-1 row-start-2 lg:col-span-12 lg:col-start-5 lg:row-start-1">
            <div>Footer Navigation</div>
          </div>
        </div>

        <div className="flex items-center justify-between py-4">
          <p className="text-center text-sm">
            richardhnguyen.com - © {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-3 text-sm">
            <a
              className="rounded-full p-2 hover:bg-neutral-700"
              target="_blank"
              href="#"
            >
              <Image
                src="/x.svg"
                alt="X Simple Logo"
                className="invert"
                width={24}
                height={24}
                priority
              />
              <p className="sr-only">X simple logo</p>
            </a>

            <a
              className="rounded-full p-2 hover:bg-neutral-700"
              target="_blank"
              href="https://github.com/richardnguyen99"
              rel="noopener"
            >
              <Image
                src="/github.svg"
                alt="GitHub Simple Logo"
                className="invert"
                width={24}
                height={24}
                priority
              />

              <p className="sr-only">GitHub simple logo</p>
            </a>

            <a
              className="rounded-full p-2 hover:bg-neutral-700"
              target="_blank"
              href="https://www.linkedin.com/in/richardmhnguyen/"
              rel="noopener"
            >
              <Image
                src="/linkedin.svg"
                alt="LinkedIn Simple Logo"
                className="invert"
                width={24}
                height={24}
                priority
              />

              <p className="sr-only">LinkedIn simple logo</p>
            </a>

            <a
              className="rounded-full p-2 hover:bg-neutral-700"
              target="_blank"
              href="https://stackoverflow.com/users/12915739/richard-h-nguyen"
              rel="noopener"
            >
              <Image
                src="/stack-overflow.svg"
                alt="Stack Overflow Simple Logo"
                className="invert"
                width={24}
                height={24}
                priority
              />

              <p className="sr-only">Stack Overflow simple logo</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
