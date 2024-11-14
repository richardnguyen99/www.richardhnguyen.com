import * as React from "react";
import { TerminalIcon } from "@primer/octicons-react";

import ReactTSIcon from "@/components/icons/reactts";
import JsIcon from "@/components/icons/js";
import TextIcon from "@/components/icons/text";
import PythonIcon from "@/components/icons/python";
import ShellIcon from "@/components/icons/shell";
import GraphQLIcon from "@/components/icons/graphql";
import ProtobufIcon from "@/components/icons/protobuf";
import TsIcon from "@/components/icons/ts";
import MarkdownIcon from "@/components/icons/markdown";
import MdxIcon from "@/components/icons/mdx";
import CSSIcon from "@/components/icons/css";
import HTMLIcon from "@/components/icons/html";
import ReactJSIcon from "@/components/icons/reactjs";
import ScssIcon from "@/components/icons/scss";
import GnuMakefileIcon from "@/components/icons/gnu";

interface ExtensionObject {
  text: string;
  component: React.ReactNode;
}

type ExtensionRecord = readonly [string, ExtensionObject];

const iterable: ExtensionRecord[] = [
  [
    "makefile",
    {
      text: "Makefile",
      component: <GnuMakefileIcon />,
    },
  ],
  [
    "tsx",
    {
      text: "React TypeScript",
      component: <ReactTSIcon />,
    },
  ],
  [
    "jsx",
    {
      text: "React JavaScript",
      component: <ReactJSIcon />,
    },
  ],
  [
    "ts",
    {
      text: "TypeScript",
      component: <ReactTSIcon />,
    },
  ],
  [
    "js",
    {
      text: "JavaScript",
      component: <JsIcon />,
    },
  ],
  [
    "ts",
    {
      text: "TypeScript",
      component: <TsIcon />,
    },
  ],
  [
    "md",
    {
      text: "Markdown",
      component: <MarkdownIcon />,
    },
  ],
  [
    "css",
    {
      text: "CSS",
      component: <CSSIcon />,
    },
  ],
  [
    "scss",
    {
      text: "SCSS",
      component: <ScssIcon />,
    },
  ],
  [
    "html",
    {
      text: "HTML",
      component: <HTMLIcon />,
    },
  ],
  [
    "mdx",
    {
      text: "MDX",
      component: <MdxIcon />,
    },
  ],
  [
    "py",
    {
      text: "Python",
      component: <PythonIcon />,
    },
  ],
  [
    "graphql",
    {
      text: "GraphQL",
      component: <GraphQLIcon />,
    },
  ],
  [
    "proto",
    {
      text: "Protobuf",
      component: <ProtobufIcon />,
    },
  ],
  [
    "txt",
    {
      text: "Plain Text",
      component: <TextIcon />,
    },
  ],
  [
    "sh",
    {
      text: "Bash Shell",
      component: <ShellIcon />,
    },
  ],
  [
    "default",
    {
      text: "Terminal",
      component: <TerminalIcon />,
    },
  ],
];

const extMap = new Map<string, ExtensionObject>(iterable);

export default extMap;
