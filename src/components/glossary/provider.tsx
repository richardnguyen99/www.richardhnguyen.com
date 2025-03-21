import React, { type JSX } from "react";

import GlossaryContext from "./context";
import { defaultTerms } from "./default-terms";

type Props = {
  children: JSX.Element;
};

export default function GlossaryProvider({ children }: Props): JSX.Element {
  return (
    <GlossaryContext.Provider value={{ terms: defaultTerms }}>
      {children}
    </GlossaryContext.Provider>
  );
}
