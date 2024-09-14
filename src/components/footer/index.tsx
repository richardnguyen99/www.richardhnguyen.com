import Image from "next/image";
import * as React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-black text-white md:mt-20 lg:mt-28">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <p className="text-center text-sm">
            richardhnguyen.com - © 2024 - {new Date().getFullYear()}
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
            </a>

            <a
              className="rounded-full p-2 hover:bg-neutral-700"
              target="_blank"
              href="https://github.com/richardnguyen99"
            >
              <Image
                src="/github.svg"
                alt="GitHub Simple Logo"
                className="invert"
                width={24}
                height={24}
                priority
              />
            </a>

            <a
              className="rounded-full p-2 hover:bg-neutral-700"
              target="_blank"
              href="https://www.linkedin.com/in/richardmhnguyen/"
            >
              <Image
                src="/linkedin.svg"
                alt="LinkedIn Simple Logo"
                className="invert"
                width={24}
                height={24}
                priority
              />
            </a>

            <a
              className="rounded-full p-2 hover:bg-neutral-700"
              target="_blank"
              href="https://stackoverflow.com/users/12915739/richard-h-nguyen"
            >
              <Image
                src="/stack-overflow.svg"
                alt="Stack Overflow Simple Logo"
                className="invert"
                width={24}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
