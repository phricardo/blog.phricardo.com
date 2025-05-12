"use client";

import React from "react";
import { CopyBlock, noctisViola } from "react-code-blocks";

export default function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  return (
    <CopyBlock
      text={code}
      language={language}
      showLineNumbers={true}
      theme={noctisViola}
    />
  );
}
