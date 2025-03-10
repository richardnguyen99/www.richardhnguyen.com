import React, { type JSX } from "react";
import { Search } from "lucide-react";

import useMemoizedAutocomplete from "./use-autocomplete";
import type {
  InternalSearchHitWithParent,
  InternalSearchState,
} from "@/types/algolia";

type Props = ReturnType<typeof useMemoizedAutocomplete> & {
  state: InternalSearchState<InternalSearchHitWithParent>;
};

export default function SearchEmpty(props: Props): JSX.Element {
  return (
    <div className="my-6 text-center">
      <Search className="mx-auto h-12 w-12 text-gray-400" />
      <p className="text-muted-foreground mt-4 line-clamp-1 text-lg">
        No results found for{" "}
        <q className="text-secondary-foreground inline-block">
          {props.state.query}
        </q>
        .
      </p>
    </div>
  );
}
