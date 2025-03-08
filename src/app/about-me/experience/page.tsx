import React, { type JSX } from "react";
import { type Metadata } from "next";

import Tabs from "../tabs";
import Timeline from "./timeline";
import DownloadButton from "./download-button";
import { sharedMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Work Experience",
  description: "Work Experience section of Richard H. Nguyen Site",
  openGraph: {
    ...sharedMetadata.openGraph,
    title: "Work Experience",
    description: "Work Experience section of Richard H. Nguyen Site",
    url:
      process.env.NODE_ENV === "production"
        ? "/about-me/experience"
        : undefined,
    type: "website",
    images: [
      {
        url: "/work-experience.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Work Experience's OG Image",
        type: "image/png",
      },
    ],
  },
  twitter: {
    ...sharedMetadata.twitter,
    card: "summary_large_image",
    title: "Work Experience",
    description: "Work Experience section of Richard H. Nguyen Site",
    images: [
      {
        url: "/work-experience.png",
        width: 1470,
        height: 980,
        alt: "Richard H. Nguyen Work Experience's Twitter Card",
        type: "image/png",
      },
    ],
  },
};

export default function Experience(): JSX.Element {
  return (
    <div className="mx-[var(--gutter-size)] w-[var(--container-size)]">
      <h1 className="text-center text-5xl font-semibold leading-[110%] tracking-tight">
        Work Experience
      </h1>

      <Tabs activeTab="exp">
        <p>
          I graduatedd from{" "}
          <a
            href="https://www.highline.edu/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Highline College
          </a>{" "}
          with an Associate of Applied Science in Computer Science in 2021, and
          from{" "}
          <a
            href="https://www.seattleu.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Seattle University
          </a>{" "}
          with a bachelor&apos;s degree in Computer Science in 2023.
        </p>

        <Timeline className="mt-8" />

        <div className="mb-8">
          <h2 className="mt-0">Skills</h2>

          <ul>
            <li>
              <strong>Languages</strong>: Python, Java, C++,HTML, CSS, C,
              TypeScript, JavaScript, React, NextJS, Flask, Express, NestJS,
              Django, PostgresQL, MongoDB, GraphQL.
            </li>
            <li>
              <strong>Concepts</strong>: Web Application Development (SPA, CSR,
              SSR, SSG), Web Architecture (REST API, Microservice, MVC),
              Databases, Data Structures, Algorithms, Operating Systems
              (Linux/Windows), Network protocol (HTTP(s), TCP/IP, UDP, SSH,
              DNS), Authentication (OAuth 2, SSO, JWT, Session), Webpack,
              Docker, CI/CD, AWS infrastructure (S3, EC2, RDS), Testing (Unit,
              Integration, E2E), Software Development (Agile, Scrum).
            </li>
          </ul>
        </div>

        <div>
          <DownloadButton />
        </div>
      </Tabs>
    </div>
  );
}
