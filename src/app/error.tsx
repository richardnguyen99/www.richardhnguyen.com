"use client";

import React from "react";

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function Error({
  error,
  unstable_retry,
}: Props): React.ReactElement {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => unstable_retry()}>Try again</button>
    </div>
  );
}
