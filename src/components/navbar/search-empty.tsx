import React, { type JSX } from "react";
import { Search } from "lucide-react";

import useMemoizedAutocomplete from "./use-autocomplete";
import {
  InternalSearchHitWithParent,
  InternalSearchState,
} from "@/types/algolia";

type Props = ReturnType<typeof useMemoizedAutocomplete> & {
  state: InternalSearchState<InternalSearchHitWithParent>;
};

function SearchEmpty(props: Props): JSX.Element {
  return (
    <div className="my-6 text-center">
      <Search className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-4 line-clamp-1 text-lg text-muted-foreground">
        No results found for{" "}
        <q className="inline-block text-secondary-foreground">
          {props.state.query}
        </q>
        .
      </p>
    </div>
  );
}

export default SearchEmpty;
