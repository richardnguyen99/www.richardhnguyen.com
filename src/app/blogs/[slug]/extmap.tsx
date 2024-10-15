import * as React from "react";

import ReactTSIcon from "@/components/icons/reactts";
import JsIcon from "@/components/icons/js";
import TextIcon from "@/components/icons/text";
import DefaultIcon from "@/components/icons/default";
import PythonIcon from "@/components/icons/python";
import ShellIcon from "@/components/icons/shell";
import GraphQLIcon from "@/components/icons/graphql";
import ProtobufIcon from "@/components/icons/protobuf";

interface ExtensionObject {
  text: string;
  component: React.ReactNode;
}

type ExtensionRecord = readonly [string, ExtensionObject];

const iterable: ExtensionRecord[] = [
  [
    "tsx",
    {
      text: "React TypeScript",
      component: <ReactTSIcon />,
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
      text: "Default",
      component: <DefaultIcon />,
    },
  ],
];

const extMap = new Map<string, ExtensionObject>(iterable);

export default extMap;
