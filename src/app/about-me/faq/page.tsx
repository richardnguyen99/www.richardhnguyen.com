import React, { type JSX } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Tabs from "../tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Faq(): JSX.Element {
  return (
    <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
      <h1 className="text-center text-lg font-semibold leading-[110%] tracking-tight md:text-xl lg:text-3xl xl:text-5xl">
        Frequently Asked Questions
      </h1>

      <Tabs activeTab="faq">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            className="[&>div]:[font-size:_inherit] [&>div]:[line-height:_inherit] [&_button]:[font-size:_inherit] [&_button]:[line-height:_inherit]"
          >
            <AccordionTrigger>
              <span className="line-clamp-1 text-left">Where do I live?</span>
            </AccordionTrigger>
            <AccordionContent>I reside in Washington, US.</AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="[&>div]:[font-size:_inherit] [&>div]:[line-height:_inherit] [&_button]:[font-size:_inherit] [&_button]:[line-height:_inherit]"
          >
            <AccordionTrigger>
              <span className="line-clamp-1 text-left">
                What tech stack does this site use?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Here is the tech stack:
              <Table className="mt-8 px-8 [&_tr]:!border-border">
                <TableHeader className="font-bold">
                  <TableRow>
                    <TableHead className="w-fit">Techstack</TableHead>
                    <TableHead className="">What for?</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>NextJS</TableCell>
                    <TableCell>
                      Core framework engine that runs this site.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>TailwindCSS</TableCell>
                    <TableCell>
                      Utility-first CSS framework that styles the site.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>ShadCN</TableCell>
                    <TableCell>
                      Production-ready WAI-ARIA-compatible React components with
                      TailwindCSS.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>MDX</TableCell>
                    <TableCell>
                      Used for writing content in Markdown and JSX.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>ShikiJS</TableCell>
                    <TableCell>
                      Code syntax highlighter built for server environments.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Next-Theme</TableCell>
                    <TableCell>NextJS tool for dark-mode.</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Algolia</TableCell>
                    <TableCell>
                      Searching andd indexing tool for finding posts quickly.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Cloudinary</TableCell>
                    <TableCell>
                      Image hosting and transformation service.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>GitHub</TableCell>
                    <TableCell>Source control and versioning.</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Vercel</TableCell>
                    <TableCell>
                      Where this site is hosted and deployed.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="[&>div]:[font-size:_inherit] [&>div]:[line-height:_inherit] [&_button]:[font-size:_inherit] [&_button]:[line-height:_inherit]"
          >
            <AccordionTrigger>
              <span className="line-clamp-1 text-left">
                What do I use for developing?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <h3>Software</h3>
                  <ul>
                    <li>
                      Operating system:{" "}
                      <a
                        href="https://docs.fedoraproject.org/en-US/releases/f41/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Fedora 41
                      </a>
                      .
                    </li>
                    <li>
                      Text editor:{" "}
                      <a
                        href="https://code.visualstudio.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visual Studio Code
                      </a>
                      .
                    </li>
                    <li>
                      Browser:{" "}
                      <a
                        href="https://www.mozilla.org/en-US/firefox/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Firefox
                      </a>
                      .
                    </li>
                    <li>
                      Terminal:{" "}
                      <a
                        href="https://gnome-terminator.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GNOME Terminal
                      </a>
                      .
                    </li>

                    <li>
                      Design Tool:{" "}
                      <a
                        href="https://www.gma.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Figma
                      </a>
                      .
                    </li>
                  </ul>
                </li>

                <li>
                  <h3>Hardware</h3>
                  <ul>
                    <li>
                      Machine:{" "}
                      <a
                        href="https://www.dell.com/support/manuals/en-us/inspiron-15-7501-laptop/inspiron-7501-setup-and-specifications/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Dell Inspiron 15 7501
                      </a>
                      .
                    </li>
                    <li>
                      Keyboard :{" "}
                      <a
                        href="https://www.keychron.com/products/keychron-q6-qmk-custom-mechanical-keyboard"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Keychron Q6 QMK
                      </a>
                      .
                    </li>
                    <li>
                      Mouse:{" "}
                      <a
                        href="https://www.logitech.com/en-us/shop/p/mx-master-3s.910-006556"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Logitech MX Master 3S
                      </a>
                      .
                    </li>
                  </ul>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="[&>div]:[font-size:_inherit] [&>div]:[line-height:_inherit] [&_button]:[font-size:_inherit] [&_button]:[line-height:_inherit]"
          >
            <AccordionTrigger>
              <span className="line-clamp-1 text-left">How to reach me?</span>
            </AccordionTrigger>
            <AccordionContent>
              <p>
                You can shoot me an email at{" "}
                <a href="mailto:richard@richardhnguyen.com">
                  richard@richardhnguyen.com
                </a>{" "}
                for any inquiries. You can also find me on social media:
              </p>

              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/in/richardnguyen99/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/RichardNgu65749"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X/Twitter
                  </a>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className="tetx-sm text-muted-foreground">(updated Mar 6, 2025)</p>
      </Tabs>
    </div>
  );
}
