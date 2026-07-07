import React, { type JSX } from "react";
import { InternalAutocompleteSource } from "@algolia/autocomplete-core";

import useMemoizedAutocomplete from "./use-autocomplete";
import type {
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

// Isolated component so the render-prop call happens in its own render scope,
// not inside SearchItem's — the compiler can no longer see `action.current`
// and the callbacks as being in the same render frame.
type SearchItemIconProps = {
  item: InternalSearchHitWithParent;
  index: number;
  renderIcon: Props["renderIcon"];
};

function SearchItemIcon({
  item,
  index,
  renderIcon,
}: SearchItemIconProps): JSX.Element {
  return renderIcon({ item, index });
}

type SearchItemActionProps = {
  item: InternalSearchHitWithParent;
  renderAction: Props["renderAction"];
  deleteTransitionCallback: (_cb: () => void) => void;
  favoriteTransitionCallback: (_cb: () => void) => void;
};

function SearchItemAction({
  item,
  renderAction,
  deleteTransitionCallback,
  favoriteTransitionCallback,
}: SearchItemActionProps): JSX.Element {
  return renderAction({
    item,
    deleteTransitionCallback,
    favoriteTransitionCallback,
  });
}

export default function SearchItem(props: Props): JSX.Element {
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

  const deleteTransitionCallback = React.useCallback((cb: () => void) => {
    setIsDeleting(true);
    action.current = cb;
  }, []);

  const favoriteTransitionCallback = React.useCallback((cb: () => void) => {
    setIsFavoriting(true);
    action.current = cb;
  }, []);

  const handleTransitionEnd = React.useCallback(() => {
    if (action.current) {
      action.current();
      action.current = null;
    }
  }, []);

  return (
    <li
      className={cn("ais-source-item", {
        "ais-source-item--deleting": isDeleting,
        "ais-source-item--favoriting": isFavoriting,
      })}
      {...itemProps}
      onTransitionEnd={handleTransitionEnd}
    >
      <SearchItemIcon
        item={props.item}
        index={props.index}
        renderIcon={props.renderIcon}
      />
      <div className="grow-[auto]">
        <p>{props.item.title}</p>
      </div>
      <SearchItemAction
        item={props.item}
        renderAction={props.renderAction}
        deleteTransitionCallback={deleteTransitionCallback}
        favoriteTransitionCallback={favoriteTransitionCallback}
      />
    </li>
  );
}
