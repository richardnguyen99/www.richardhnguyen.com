import React, { type JSX } from "react";
import { CornerDownLeft, MoveDown, MoveUp } from "lucide-react";

function Kbd(props: { children: React.ReactNode }): JSX.Element {
  return <kbd className="ais-kbd">{props.children}</kbd>;
}

export default function SearchFooter(): JSX.Element {
  return (
    <div className="ais-footer">
      <div className="ais-logo">
        <div className="h-6 w-6 bg-black dark:bg-white"></div>
        <p>richardhnguyen.com</p>
      </div>

      <ul className="ais-commands">
        <li className="ais-command">
          <Kbd>
            <CornerDownLeft />
          </Kbd>
          to select
        </li>
        <li className="ais-command">
          <Kbd>
            <MoveDown />
          </Kbd>
          <Kbd>
            <MoveUp />
          </Kbd>
          to navigate
        </li>
        <li className="ais-command">
          <Kbd>Esc</Kbd>
          to close
        </li>
      </ul>
    </div>
  );
}
