import React, { type JSX } from "react";
import Image from "next/image";
import { type Metadata } from "next";

import Tabs from "../tabs";
import { sharedMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Biography",
  description: "section of Richard H. Nguyen Site",
  openGraph: {
    ...sharedMetadata.openGraph,
    title: "Biography",
    description: "Biography section of Richard H. Nguyen Site",
    url:
      process.env.NODE_ENV === "production" ? "/about-me/biography" : undefined,
    type: "website",
    images: [
      {
        url: "/biography.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Biography's OG Image",
        type: "image/png",
      },
    ],
  },
  twitter: {
    ...sharedMetadata.twitter,
    card: "summary_large_image",
    title: "Biography",
    description: "Biography section of Richard H. Nguyen Site",
    images: [
      {
        url: "/biography.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Biography's Twitter Card",
        type: "image/png",
      },
    ],
  },
};

export default function Bio(): JSX.Element {
  return (
    <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
      <h1 className="text-center text-5xl leading-[110%] font-semibold tracking-tight">
        Biography
      </h1>

      <Tabs activeTab="bio">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <Image
            src="/profile.jpg"
            alt="Richard H. Nguyen"
            className="rounded-full"
            width={180}
            height={180}
          />

          <div>
            <p>Hi, I&apos;m Richard H. Nguyen 👋</p>
            <p>
              I&apos;m a software engineer from the Washington, US. Writing
              software and blogs that help people solve problems is my passion.
              My specialties are building fullstack web applications from modern
              frameworks such as NextJS and React, old school server-side
              rendered like Flask and Django to complete HTTP servers in C.
            </p>
          </div>
        </div>

        <h4>My story</h4>

        <p>I was born in Vietnam in 1999 and lived there unitl 2019.</p>

        <p>
          I was attending to{" "}
          <a
            href="https://uel.edu.vn/"
            target="_blank"
            rel="noopener noreferer"
          >
            University of Economics and Laws
          </a>{" "}
          for my second year with a Finance major. Although I love economy and
          finance, I hate using the tools that are available for me to work with
          such as Excel and Stata. Then, I found out about Python and its
          ecosystem for data analysis and data manipulation. Tools like Pandas,
          Numpy, and Matplotlib got me hooked into programming. Since then, I
          fell for it and discovered my passion for software engineering.
        </p>

        <figure className="!relative flex w-full flex-col items-center">
          <Image
            src="/vn_university.jpg"
            alt="Vietnam"
            width="600"
            height="600"
            className="rounded-md !object-cover"
          />
          <figcaption className="text-sm text-gray-500">
            My volunteer work at Green Summer Campaign in 2018
          </figcaption>
        </figure>

        <p>
          In 2019, my family and I moved to the US. I decided to switch my major
          to Computer Science and persue a career in software engineer. I went
          to{" "}
          <a
            href="https://www.highline.edu/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Highline College
          </a>{" "}
          for my associate degree in Computer Science. Then, I got transferred
          to{" "}
          <a
            href="https://www.seattleu.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Seattle University
          </a>{" "}
          and finished my bachelor degree in Computer Science in 2023.
        </p>

        <figure className="!relative flex w-full flex-col items-center">
          <Image
            src="/capstone.jpg"
            alt="Capstone Project"
            width="600"
            height="600"
            className="rounded-md !object-cover"
          />
          <figcaption className="text-sm text-gray-500">
            My Senior Capstone Project at Seattle University
          </figcaption>
        </figure>

        <p>
          I&apos;m currently working as a software engineer with a contracting
          job at{" "}
          <a
            href="https://www.dataannotation.tech/"
            target="_blank"
            rel="noopener noreffer"
          >
            Data Annotation
          </a>
          . I&apos;m also working on my personal projects and writing blogs to
          share my knowledge and experience with the community. You can check
          out
          <a
            href="https://github.com/richardnguyen99"
            target="_blank"
            rel="noopener noreferrer"
          >
            my OSS
          </a>{" "}
          for more information.
        </p>

        <p>
          In 2024, I was naturalized and have become a U.S citizen of America
          since then. 🇺🇸 🇺🇸{" "}
        </p>

        <h4>My work</h4>

        <p>My strength is building fullstack web applications.</p>

        <p>
          I have experience with modern frontend frameworks and tools like ESM,
          TypeScript, React NextJS. I&apos;m also capable of building backend
          services with Flask, Django and Express, from a complete server-side
          rendered application to a RESTful API server.
        </p>

        <p>
          I also write blogs about software engineering, programming and coding
          tips. That is the reason why I built this blog site. It&apos;s a place
          where I can share my knowledge and what I learned during my journey as
          a software engineer. I hope this site can inspired you to try new
          stuff. Or for some tech savvy, you can inspect{" "}
          <a
            href="https://github.com/richardnguyen99/www.richardhnguyen.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            this site&apos;s source code
          </a>{" "}
          to learn how I built it.
        </p>

        <h4>My hobbies</h4>

        <p>
          My favorite hobby is programming and writing OSS, very obvious right?
          When I&apos;m not coding, I like to hangout with my friends. My
          favorite activity is hiking and camping. Every summer, I hike{" "}
          <a
            href="https://www.nps.gov/mora/planyourvisit/trails-of-mount-rainier.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mount Rainier, Washington
          </a>
          .
        </p>

        <p>
          I also play video games. My two favorite games are{" "}
          <a
            href="https://store.steampowered.com/app/524220/NieRAutomata/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NieR: Automata
          </a>{" "}
          and{" "}
          <a
            href="https://store.steampowered.com/app/1113560/NieR_Replicant_ver122474487139/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NieR: Replicant
          </a>
          . I love these games because the philosophy and the story behind them,
          not to mention the music in Nier games are amazing.
        </p>

        <p>
          Reading books is also another hobby of mine. I mainly read books when
          I&apos;m on the bus, at the station or when I&apos;m waiting for
          someone. My genres are mostly fantasy and philosophical books. Here is
          my favorite book list if you are interested.
        </p>

        <ul>
          <li>Harry Potter Collection - By J.K. Rowling</li>
          <li>The Chronicles of Narnia - By C. S. Lewis</li>
          <li>1984 - By George Orwell</li>
          <li>Animal Farm - By George Orwell</li>
          <li>The Plague - By Albert Camus</li>
          <li>Book of Proverbs - From The Bible</li>
          <li>Book of Ecclesiastes - From The Bible</li>
          <li>Beyond Good and Evil - By Friedrich Nietzsche</li>
        </ul>
      </Tabs>
    </div>
  );
}
