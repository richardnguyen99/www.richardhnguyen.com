/* eslint-disable no-unused-vars */

import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      METADATA_BASE: string;
    }
  }
}
