"use client";

import React from "react";
import CodeBlock from "@/components/CodeBlock";

export function extractChildNodesFromHTML(htmlContent: string): ChildNode[] {
  return Array.from(
    new DOMParser().parseFromString(htmlContent, "text/html").body.childNodes
  );
}

export default function ContentRenderer({
  htmlContent,
}: {
  htmlContent: string;
}) {
  const nodes = extractChildNodesFromHTML(htmlContent);

  return (
    <>
      {nodes.map((node, index) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          // Codeblocks
          if (element.tagName === "DIV" && element.dataset.code) {
            const code = decodeURIComponent(element.dataset.code || "");
            const language = element.dataset.language as string;

            return (
              <CodeBlock
                key={`code-block-${index}`}
                code={code}
                language={language}
              />
            );
          }

          // html output
          return (
            <div
              key={`div-${index}`}
              dangerouslySetInnerHTML={{ __html: element.outerHTML }}
            />
          );
        }
        return null;
      })}
    </>
  );
}
