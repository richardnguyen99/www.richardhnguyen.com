export interface GlossaryContextType {
  terms: GlossaryDictType;
}

export interface GlossaryItemType {
  fullTerm: string;
  definition: string;
  definitionHtml: string;
  refs: string[];
}

export interface GlossaryDictType {
  [key: string]: GlossaryItemType;
}

export type RawGlossaryItem = Omit<GlossaryItemType, "definitionHtml">;
export type RawGlossaryDict = Record<string, RawGlossaryItem>;
