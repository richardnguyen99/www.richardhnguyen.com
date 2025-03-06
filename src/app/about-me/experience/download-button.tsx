"use client";

import React, { type JSX } from "react";

import { Button } from "@/components/ui/button";

export function DownloadButton(): JSX.Element {
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const handleDownload = React.useCallback(async () => {
    const response = await fetch("/api/resume");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = linkRef.current as HTMLAnchorElement | null;

    if (!link) {
      return;
    }

    // Ask the browser to download the file
    link.href = url;
    link.download = "Richard_H_Nguyen_Resume.pdf";

    link.click();
    window.URL.revokeObjectURL(url);
  }, []);

  return (
    <>
      <a ref={linkRef} style={{ display: "none" }}></a>
      <Button size="lg" onClick={handleDownload}>
        Get my Résumé
      </Button>
    </>
  );
}

export default DownloadButton;
