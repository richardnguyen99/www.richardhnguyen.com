import React, { type JSX } from "react";
import { History, Star, X } from "lucide-react";

import useMemoizedAutocomplete from "./use-autocomplete";
import type {
  InternalSearchHitWithParent,
  InternalSearchState,
  InternalStoredSearchHit,
} from "@/types/algolia";
import { Button } from "@/components/ui/button";
import SearchItem from "./search-item";
import { StoredSearchPlugin } from "./create-stored-searches";

type Props = ReturnType<typeof useMemoizedAutocomplete> & {
  state: InternalSearchState<InternalSearchHitWithParent>;
  recentSearches: StoredSearchPlugin<InternalStoredSearchHit>;
  favoriteSearches: StoredSearchPlugin<InternalStoredSearchHit>;
  onItemClick: (
    _item: InternalSearchHitWithParent,
    _event: MouseEvent | KeyboardEvent,
  ) => void;
  hasCollections: boolean;
};

export default function SearchRecent({
  state,
  onItemClick,
  ...rest
}: Props): JSX.Element | null {
  if (state.status === "idle" && !rest.hasCollections) {
    return (
      <div className="ais-panel ais-recent my-4 text-center">
        <p className="text-lg">No recent searches</p>
      </div>
    );
  }

  if (!rest.hasCollections) {
    return null;
  }

  return (
    <div className="ais-panel ais-recent" {...rest.getPanelProps({})}>
      {state.isOpen &&
        state.collections.map((collection, index) => {
          const { source, items } = collection;

          if (items.length === 0) {
            return null;
          }

          return (
            <div key={`source-${index}`} className="ais-source">
              <h3 className="ais-source-id">{source.sourceId}</h3>

              {items.length > 0 && (
                <ul className="ais-source-list" {...rest.getListProps()}>
                  {items.map((item) => {
                    return (
                      <SearchItem
                        key={item.objectID}
                        item={item}
                        index={index}
                        state={state}
                        source={source}
                        onItemClick={onItemClick}
                        renderIcon={() => <History className="grow-0" />}
                        renderAction={({
                          deleteTransitionCallback,
                          favoriteTransitionCallback,
                        }) => (
                          <React.Fragment>
                            {source.sourceId === "favorite searches" ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ais-action ais-favorite"
                                title="Unfavorite"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();

                                  favoriteTransitionCallback(() => {
                                    rest.favoriteSearches.remove(item);
                                    rest.recentSearches.add(item);
                                    rest.refresh();
                                  });
                                }}
                              >
                                <Star fill="currentColor" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ais-action ais-favorite"
                                title="Favorite"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();

                                  favoriteTransitionCallback(() => {
                                    rest.favoriteSearches.add(item);
                                    rest.recentSearches.remove(item);
                                    rest.refresh();
                                  });
                                }}
                              >
                                <Star />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ais-action ais-remove"
                              title={`Remove from ${source.sourceId}`}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();

                                deleteTransitionCallback(() => {
                                  if (source.sourceId === "favorite searches") {
                                    rest.favoriteSearches.remove(item);
                                  } else {
                                    rest.recentSearches.remove(item);
                                  }

                                  rest.refresh();
                                });
                              }}
                            >
                              <X />
                            </Button>
                          </React.Fragment>
                        )}
                        {...rest}
                      />
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
    </div>
  );
}
