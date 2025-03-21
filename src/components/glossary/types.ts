import { type JSX, type ReactNode } from "react";

export interface GlossaryContextType {
  terms: Record<string, JSX.Element | ReactNode>;
}
