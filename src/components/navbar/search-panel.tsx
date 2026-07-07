"use client";

import React, { type JSX } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import type {
  InternalSearchHit,
  InternalSearchHitWithParent,
  InternalSearchState,
  InternalStoredSearchHit,
} from "@/types/algolia";
import { cn } from "@/lib/utils";
import { createStoredSearches } from "./create-stored-searches";
import useMemoizedAutocomplete, { isModifierEvent } from "./use-autocomplete";
import SearchScreen from "./search-screen";
import SearchFooter from "./search-footer";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function SearchPanel({ onClose }: Props): JSX.Element {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;
  const { push } = useRouter();

  // Callback ref: stores the DOM node in state instead of a ref, so it can
  // be safely read during render and passed directly to Algolia's API.
  const [inputElement, setInputElement] =
    React.useState<HTMLInputElement | null>(null);

  const [autocompleteState, setAutocompleteState] = React.useState<
    InternalSearchState<InternalSearchHitWithParent>
  >({
    query: "",
    isOpen: false,
    activeItemId: null,
    collections: [],
    status: "idle",
    context: {},
    completion: null,
  });

  // Lazy initializer: runs exactly once on mount, never during render.
  // Both stores are created together so favoriteSearches is available
  // when computing recentSearches' limit — no ref reads needed.
  const [{ favoriteSearches, recentSearches }] = React.useState(() => {
    const favoriteSearches = createStoredSearches<InternalStoredSearchHit>({
      key: `__AUTOCOMPLETE_FAVORITE_SEARCHES__${indexName}`,
      limit: 10,
    });
    const recentSearches = createStoredSearches<InternalStoredSearchHit>({
      key: `__AUTOCOMPLETE_RECENT_SEARCHES__${indexName}`,
      limit: favoriteSearches.getAll().length === 0 ? 7 : 4,
    });
    return { favoriteSearches, recentSearches };
  });

  // Both stores are stable references (from useState), so this callback
  // is also effectively stable and never needs to be recreated.
  const saveRecentSearch = React.useCallback(
    function saveRecentSearch(item: InternalSearchHit) {
      if (
        item &&
        favoriteSearches
          .getAll()
          .findIndex((x) => x.objectID === item.objectID) === -1
      ) {
        recentSearches.add(item);
      }
    },
    [favoriteSearches, recentSearches],
  );

  const autocomplete = useMemoizedAutocomplete(
    autocompleteState,
    setAutocompleteState,
    indexName,
    onClose,
    recentSearches,
    favoriteSearches,
    saveRecentSearch,
    push,
  );

  return (
    <div className="ais">
      <div className="ais-header">
        <h2 className="text-lg font-semibold">Search</h2>
        <p className="hidden text-sm text-slate-500 sm:block">
          Search through the content of this site.
        </p>
      </div>

      <div className="ais-container">
        <form
          className="ais-form"
          {...autocomplete.getFormProps({ inputElement })}
        >
          <Search className="ais-svg" />
          <input
            ref={setInputElement}
            className={cn("ais-search")}
            {...(autocomplete.getInputProps({
              inputElement,
              autoFocus: true,
            }) as unknown as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        </form>

        <SearchScreen
          {...autocomplete}
          state={autocompleteState}
          recentSearches={recentSearches}
          favoriteSearches={favoriteSearches}
          onItemClick={(item, evt) => {
            saveRecentSearch(item);
            push(`/blogs/${item.objectID}`);

            if (!isModifierEvent(evt)) {
              onClose();
            }
          }}
        />

        <SearchFooter />
      </div>
    </div>
  );
}
