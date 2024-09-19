import * as React from "react";
import Image from "next/image";

import Newsletter from "./newsletter";
import { getAllCategories, getAllTags } from "@/lib/mdx";
import FooterGrid from "./grid";
import FooterGridItem from "./grid-item";
import dynamic from "next/dynamic";

const FootWrapper = dynamic(() => import("./footer"), { ssr: false });

const Footer: React.FC = async () => {
  const categories = Array.from((await getAllCategories()).entries())
    .map(([category, data]) => ({
      category,
      postCount: data.postCount,
      url: data.url,
    }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  const tags = Array.from((await getAllTags()).entries())
    .map(([tag, data]) => ({
      tag,
      postCount: data.postCount,
      url: data.url,
    }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  return (
    <FootWrapper>
      <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
        <div className="my-12 flex flex-col gap-16 lg:flex-row">
          <div className="w-full lg:w-4/12">
            <Newsletter />
          </div>

          <div className="w-full lg:w-8/12">
            <div className="relative h-full w-full">
              <div className="relative w-full lg:flex lg:flex-row lg:gap-4">
                <FooterGrid title="Categories" className="w-full lg:w-4/12">
                  {categories.map(({ category, url, postCount }) => (
                    <FooterGridItem
                      key={category}
                      text={category}
                      url={url}
                      count={postCount}
                    />
                  ))}
                </FooterGrid>

                <FooterGrid title="Tags" className="w-full lg:w-4/12">
                  {tags.map(({ tag, url, postCount }) => (
                    <FooterGridItem
                      key={tag}
                      text={tag}
                      url={url}
                      count={postCount}
                    />
                  ))}
                </FooterGrid>

                <FooterGrid title="About" className="w-full lg:w-4/12">
                  <FooterGridItem text="Projects" />
                  <FooterGridItem text="Snippets" />
                  <FooterGridItem text="Quick tools" />
                  <FooterGridItem text="Miscellaneous" />
                </FooterGrid>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-700">
        <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
          <div className="flex items-center justify-between py-4">
            <p className="text-center text-sm">
              richardhnguyen.com - © 2023 - {new Date().getFullYear()}
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
      </div>
    </FootWrapper>
  );
};

export default Footer;
