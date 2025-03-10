import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";

import type {
  InternalSearchHit,
  InternalSearchHitWithParent,
  InternalSearchState,
  InternalStoredSearchHit,
} from "@/types/algolia";
import { client as searchClient } from "@/lib/algolia";
import { StoredSearchPlugin } from "./create-stored-searches";

type State = InternalSearchState<InternalSearchHitWithParent>;

/**
 * Detect when an event is modified with a special key to let the browser
 * trigger its default behavior.
 */
export function isModifierEvent<TEvent extends KeyboardEvent | MouseEvent>(
  event: TEvent,
): boolean {
  const isMiddleClick = (event as MouseEvent).button === 1;

  return (
    isMiddleClick ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  );
}

/**
 * Create a memoized Algolia Autocomplete instance for custom renderrers.
 *
 * @param autocompleteState - The current state of the autocomplete.
 * @param setAutocompleteState - React hook to update the autocomplete state.
 * @param indexName - Algolia index name.
 * @param onClose - Callback when closing the autocomplete search.
 * @param recentSearches - Recently-stored search results.
 * @param favoriteSearches - Favorite-stored search results.
 * @param saveRecentSearch - Callback when saving a recent search.
 * @param push - Next.JS router push function to navigation to pages.
 * @returns A memoized Algolia Autocomplete instance.
 */
function useMemoizedAutocomplete(
  autocompleteState: State,
  setAutocompleteState: (_state: State) => void,
  indexName: string,
  onClose: () => void,
  recentSearches: StoredSearchPlugin<InternalStoredSearchHit>,
  favoriteSearches: StoredSearchPlugin<InternalStoredSearchHit>,
  saveRecentSearch: (_item: InternalSearchHit) => void,
  push: ReturnType<typeof useRouter>["push"],
) {
  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        InternalSearchHitWithParent,
        React.FormEvent<HTMLFormElement>,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        id: "algolia-autocomplete",
        placeholder: "Search articles...",
        openOnFocus: true,
        defaultActiveItemId: 0,
        initialState: {
          query: "",
        },
        onStateChange({ state }) {
          // (2) Synchronize the Autocomplete state with the React state.
          setAutocompleteState(state);
        },
        navigator: {
          navigate({ itemUrl }) {
            push(itemUrl);
          },
        },
        getSources({ query }) {
          if (!query) {
            return [
              {
                sourceId: "recent searches",
                getItemUrl({ item }) {
                  return `/blogs/${item.objectID}`;
                },
                getItems() {
                  return recentSearches.getAll() as InternalSearchHitWithParent[];
                },
                onSelect({ item, event }) {
                  saveRecentSearch(item);

                  if (!isModifierEvent(event)) {
                    onClose();
                  }
                },
              },
              {
                sourceId: "favorite searches",
                getItemUrl({ item }) {
                  return `/blogs/${item.objectID}`;
                },
                getItems() {
                  return favoriteSearches.getAll() as InternalSearchHitWithParent[];
                },
                onSelect({ item, event }) {
                  saveRecentSearch(item);

                  if (!isModifierEvent(event)) {
                    onClose();
                  }
                },
              },
            ];
          }

          return [
            // (3) Use an Algolia index source.
            {
              sourceId: "article",
              getItemInputValue({ item }) {
                return item.query as string;
              },
              onSelect({ item, event }) {
                saveRecentSearch(item);

                if (!isModifierEvent(event)) {
                  onClose();
                }
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: indexName,
                      params: {
                        query,
                        hitsPerPage: 4,
                        highlightPreTag: "<mark>",
                        highlightPostTag: "</mark>",
                        snippetEllipsisText: "...",
                        attributesToRetrieve: [
                          "title",
                          "imageUrl",
                          "description",
                          "tags",
                          "headings",
                          "publishedAt",
                        ],
                        attributesToSnippet: ["description:20", "headings:20"],
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return `/blogs/${item.objectID}`;
              },
            },
          ];
        },
      }),
    [
      indexName,
      onClose,
      push,
      recentSearches,
      saveRecentSearch,
      setAutocompleteState,
      favoriteSearches,
    ],
  );

  return autocomplete;
}

export default useMemoizedAutocomplete;
