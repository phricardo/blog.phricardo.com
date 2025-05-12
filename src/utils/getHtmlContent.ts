import { marked } from "marked";

type CodeRendererOptions = {
  text: string;
  lang?: string;
};

const renderer = new marked.Renderer();

// Custom code block renderer to embed code and language as data attributes
renderer.code = ({ text, lang }: CodeRendererOptions) => {
  return `<div data-code="${encodeURIComponent(text)}" data-language="${
    lang || "plaintext"
  }"></div>`;
};

/**
 * Asynchronously converts Markdown content to HTML using a custom renderer.
 * @param markdown - The raw Markdown string to convert.
 * @returns A Promise resolving to an HTML string.
 */
export async function getHtmlContent(markdown: string): Promise<string> {
  const result = marked(markdown, { renderer });
  if (result instanceof Promise) {
    return await result;
  }
  return result;
}
