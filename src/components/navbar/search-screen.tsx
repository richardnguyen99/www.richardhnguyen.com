import React from "react";

import type {
  InternalSearchHitWithParent,
  InternalSearchState,
  InternalStoredSearchHit,
} from "@/types/algolia";
import useMemoizedAutocomplete from "./use-autocomplete";
import ScreenResult from "./search-result";
import ScreenEmpty from "./search-empty";
import ScreenRecent from "./search-recent";
import { StoredSearchPlugin } from "./create-stored-searches";

type Props = ReturnType<typeof useMemoizedAutocomplete> & {
  state: InternalSearchState<InternalSearchHitWithParent>;
  recentSearches: StoredSearchPlugin<InternalStoredSearchHit>;
  favoriteSearches: StoredSearchPlugin<InternalStoredSearchHit>;
  onItemClick: (
    _item: InternalSearchHitWithParent,
    _event: MouseEvent | KeyboardEvent,
  ) => void;
};

function SearchScreen(props: Props): JSX.Element {
  if (props.state.status === "error") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-red-500">Error loading results</p>
      </div>
    );
  }

  const hasCollections = props.state.collections.some(
    (collection) => collection.items.length > 0,
  );

  if (!props.state.query) {
    return <ScreenRecent hasCollections={hasCollections} {...props} />;
  }

  if (!hasCollections) {
    return <ScreenEmpty {...props} />;
  }

  return <ScreenResult {...props} />;
}

export default React.memo(
  SearchScreen,
  function areEqual(_prevProps, nextProps) {
    return (
      _prevProps.state.isOpen === nextProps.state.isOpen &&
      _prevProps.state.query === nextProps.state.query &&
      (nextProps.state.status === "loading" ||
        nextProps.state.status === "stalled")
    );
  },
);
