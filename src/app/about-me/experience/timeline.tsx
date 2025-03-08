"use client";

import React, { type JSX } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

type TimelineItemProps = {
  number: number;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
  techstack: string[];
};

const TimelineItem = ({
  number,
  title,
  children,
  techstack,
  isLast = false,
}: TimelineItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative flex w-full gap-6">
      {/* Number with square brackets */}
      <div className="relative z-10 flex-shrink-0">
        <div className="relative z-20 flex h-7 w-7 items-center justify-center bg-background font-mono">
          {/* Left bracket */}
          <div className="absolute bottom-0 left-0 top-0 w-[4px] border-b-2 border-l-2 border-t-2 border-primary"></div>

          {/* Number */}
          <span className="font-bold">{number}</span>

          {/* Right bracket */}
          <div className="absolute bottom-0 right-0 top-0 w-[4px] border-b-2 border-r-2 border-t-2 border-primary"></div>
        </div>

        {/* Connecting line */}
        {!isLast && (
          <div className="absolute left-1/2 top-0 z-10 h-full w-0.5 -translate-x-1/2 bg-border" />
        )}
      </div>

      {/* Content */}
      <div className="w-full flex-grow pb-10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-2 flex w-full items-center text-left text-2xl font-bold hover:text-primary focus:outline-none"
        >
          <div className="line-clamp-1">{title}</div>
          <ChevronDown
            className={`ml-2 h-5 w-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="text-muted-foreground">{children}</div>

          {/* Tech stack */}
          <div className="mt-4 flex items-center gap-2">
            <Label>Tech Stack: </Label>
            <div className="flex flex-wrap gap-2">
              {techstack.map((tech) => (
                <Badge
                  className="bg-lime-600 text-secondary dark:bg-lime-400"
                  key={tech}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Timeline({ className }: Props): JSX.Element {
  const timelineItems = [
    {
      number: 1,
      title: "Teacher Assistant (2020-2023)",
      techstack: ["Python", "Java", "C++", "PostgresQL"],
      content: (
        <React.Fragment>
          <p>
            I worked as a teacher assistant for the Computer Science department
            at both campuses. At Highline College, I assisted students with
            entry courses such as Python & Java Programming and Data Structures.
          </p>

          <p>
            At Seattle University, I assisted students with higher-level courses
            such as Algorithms, Operating System Programming, Language Theory
            and Database. I mainly helped students with their problems using
            C++, Python and PostgresQL.
          </p>

          <p>
            As a teacher assistant, I hosted office hours and workshops to help
            students with their assignments and projects. My main job was to
            help with designing over 50 programming projects and grading over
            1000 assignments with constructive feedback.
          </p>
        </React.Fragment>
      ),
    },
    {
      number: 2,
      title: "Intern at SDI Engineering Inc. (2022-2023)",
      techstack: ["C++", "Qt", "QML", "Agile", "Scrum"],
      content: (
        <React.Fragment>
          <p>
            In my senior year, I had a chance to work on a capstone project with{" "}
            <a
              href="https://www.sdi-eng.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SDI Engineering Inc.
            </a>{" "}
            in a group of 5 students, mentored by{" "}
            <a
              href="https://www.seattleu.edu/directory/profiles/yingwu-zhu.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              Professor Yingwu Zhu
            </a>
            . I worked on migrating a legacy desktop application,{" "}
            <a
              href="https://www.sdi-eng.com/gearsim"
              target="_blank"
              rel="noopener noreferrer"
            >
              GearSim
            </a>
            , that performs landing gear simulation and subsystem analysis tools
            to prevent expensive and time-consuming physical testing. Our
            team&apos;s goal was to migrate to using C++ and Qt Framework for a
            more modern and efficient desktop application.
          </p>

          <p>
            After that, I extended to intern at SDI Engineering Inc. My work was
            to continue the migration process and implement new features such as
            dynamic page rendering based on different aircraft models and
            simulations. By using{" "}
            <a
              href="https://doc.qt.io/qt-6/qtquick-index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Qt Quick and QML
            </a>
            , I was able to create a dynamic and responsive UI that can be
            easily customized from the user side and be well integrated with new
            incoming models from the manufacturer side.
          </p>
        </React.Fragment>
      ),
    },
    {
      number: 3,
      title: "Software Engineer at Data Annotation Tech (2023-present)",
      techstack: ["C++", "Python", "AWS", "Java", "TypeScript", "React"],
      content: (
        <React.Fragment>
          <p>
            Right after SDI Engineering Inc., I&apos;ve worked at{" "}
            <a
              href="https://www.dataannotation.tech/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Annotation Tech
            </a>{" "}
            as a contracting software engineer. My main job is to work with a
            variety of AI coding bot to provide programming annotation and
            solutions for generative machine learning models.
          </p>

          <p>
            By applying the{" "}
            <a
              href="https://www.ovaledge.com/blog/data-quality-metrics"
              target="_blank"
              rel="noopener noreferrer"
            >
              7-Dimension Metric of Data Quality
            </a>
            , I improve and fine-tune the AI coding bots to provide more
            accurate and efficient solutions for programming and coding prompts.
            My work is mainly focusing on instructing the AI coding bot to
            fulfill complex and enterprise-level coding tasks by either
            providing or fixing the code snippets to meet the user&apos;s
            requirements.
          </p>

          <p>
            My tasks include working with a variety of programming languages and
            frameworks such as C++, Python, Java, TypeScript and React. I also
            work with many cloud services on AWS to deploy and manage machine
            learning models. This includes setting up EC2 instances, managing S3
            buckets, and utilizing Lambda functions for serverless computing.
          </p>
        </React.Fragment>
      ),
    },
  ];

  return (
    <div
      className={cn("container w-full max-w-none px-4 py-8 lg:px-0", className)}
    >
      <div className="w-full space-y-0">
        {timelineItems.map((item, index) => (
          <TimelineItem
            key={item.number}
            number={item.number}
            title={item.title}
            isLast={index === timelineItems.length - 1}
            techstack={item.techstack}
          >
            <div>{item.content}</div>
          </TimelineItem>
        ))}
      </div>
    </div>
  );
}
