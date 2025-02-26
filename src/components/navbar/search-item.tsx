import React, { type JSX } from "react";
import { InternalAutocompleteSource } from "@algolia/autocomplete-core";

import useMemoizedAutocomplete from "./use-autocomplete";
import {
  InternalSearchHitWithParent,
  InternalSearchState,
} from "@/types/algolia";
import { cn } from "@/lib/utils";

type Props = ReturnType<typeof useMemoizedAutocomplete> & {
  index: number;
  state: InternalSearchState<InternalSearchHitWithParent>;
  item: InternalSearchHitWithParent;
  source: InternalAutocompleteSource<InternalSearchHitWithParent>;
  hasCollections: boolean;
  onItemClick: (
    _item: InternalSearchHitWithParent,
    _event: MouseEvent | KeyboardEvent,
  ) => void;
  renderIcon: (_props: {
    item: InternalSearchHitWithParent;
    index: number;
  }) => JSX.Element;

  renderAction: (_props: {
    item: InternalSearchHitWithParent;
    deleteTransitionCallback: (_cb: () => void) => void;
    favoriteTransitionCallback: (_cb: () => void) => void;
  }) => JSX.Element;
};

function SearchItem(props: Props): JSX.Element {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isFavoriting, setIsFavoriting] = React.useState(false);
  const action = React.useRef<(() => void) | null>(null);
  const itemProps = props.getItemProps({
    item: props.item,
    source: props.source,
    onClick: (event: KeyboardEvent | MouseEvent) => {
      props.onItemClick(props.item, event);
    },
  });

  const deleteTransitionCallback = (cb: () => void) => {
    setIsDeleting(true);
    action.current = cb;
  };

  const favoriteTransitionCallback = (cb: () => void) => {
    setIsFavoriting(true);
    action.current = cb;
  };

  return (
    <li
      key={props.item.objectID}
      className={cn("ais-source-item", {
        "ais-source-item--deleting": isDeleting,
        "ais-source-item--favoriting": isFavoriting,
      })}
      {...itemProps}
      onTransitionEnd={() => {
        if (action.current) {
          action.current();
          action.current = null;
        }
      }}
    >
      {props.renderIcon({ item: props.item, index: props.index })}
      <div className="grow-[auto]">
        <p>{props.item.title}</p>
      </div>

      {props.renderAction({
        item: props.item,
        deleteTransitionCallback,
        favoriteTransitionCallback,
      })}
    </li>
  );
}

export default SearchItem;
