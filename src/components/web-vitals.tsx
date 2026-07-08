"use client";

import React from "react";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals(): React.JSX.Element | null {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case "FCP": {
        // handle FCP results
      }
      case "LCP": {
        // handle LCP results
      }
      default: {
        console.log(metric);
      }
    }
  });

  return null;
}
