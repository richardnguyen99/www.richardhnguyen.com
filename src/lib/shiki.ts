import { createHighlighter } from "shiki";

const highlighter = await createHighlighter({
  themes: ["github-dark", "github-light"],
  langs: [
    "ansi",
    "txt",
    "css",
    "tsx",
    "jsx",
    "ts",
    "js",
    "graphql",
    "python",
    "shell",
    "protobuf",
    "markdown",
    "mdx",
    "html",
    "scss",
  ],
});

export default highlighter;
