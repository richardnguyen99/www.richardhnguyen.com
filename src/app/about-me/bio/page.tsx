import React, { type JSX } from "react";
import Tabs from "../tabs";
import Image from "next/image";

export default function Bio(): JSX.Element {
  return (
    <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
      <h1 className="text-center text-5xl font-semibold leading-[110%] tracking-tight">
        Biography
      </h1>

      <Tabs activeTab="bio">
        <div className="flex gap-8">
          <Image
            src="/profile.jpg"
            alt="Richard H. Nguyen"
            className="rounded-full"
            width={240}
            height={240}
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
      </Tabs>
    </div>
  );
}
