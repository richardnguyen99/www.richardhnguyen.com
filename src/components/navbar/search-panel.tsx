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

/**
 * The main panel of the search component when users open the search, either
 * by clicking or via keyboard shortcut.
 *
 * This component is responsible for controlling the logics of the search and
 * the rendering of the search UI.
 *
 * @param {Props} props - The properties of the component.
 * @returns {JSX.Element}
 */
export default function SearchPanel({ onClose }: Props): JSX.Element {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

  const { push } = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
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

  const favoriteSearches = React.useRef(
    createStoredSearches<InternalStoredSearchHit>({
      key: `__AUTOCOMPLETE_FAVORITE_SEARCHES__${indexName}`,
      limit: 10,
    }),
  ).current;

  const recentSearches = React.useRef(
    createStoredSearches<InternalStoredSearchHit>({
      key: `__AUTOCOMPLETE_RECENT_SEARCHES__${indexName}`,
      // We display 7 recent searches and there's no favorites, but only
      // 4 when there are favorites.
      limit: favoriteSearches.getAll().length === 0 ? 7 : 4,
    }),
  ).current;

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
          {...autocomplete.getFormProps({ inputElement: inputRef.current })}
        >
          <Search className="ais-svg" />
          <input
            ref={inputRef}
            className={cn("ais-search")}
            {...(autocomplete.getInputProps({
              inputElement: inputRef.current!,
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
