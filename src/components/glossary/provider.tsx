import React, { type JSX } from "react";

import GlossaryContext from "./context";
import { GlossaryDictType } from "./types";

interface GlossaryProviderProps {
  children: JSX.Element;
  glossaryDict: GlossaryDictType;
}

export default function GlossaryProvider({
  children,
  glossaryDict,
}: GlossaryProviderProps): JSX.Element {
  return (
    <GlossaryContext.Provider value={{ terms: glossaryDict }}>
      {children}
    </GlossaryContext.Provider>
  );
}
