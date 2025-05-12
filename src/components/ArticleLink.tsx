"use client";

import React from "react";
import Link from "next/link";
import { ArticleMeta } from "@/utils/articles";

export default function ArticleLink({
  article,
  index,
}: {
  article: ArticleMeta;
  index: number;
}) {
  return (
    <div
      style={{
        background: "#eee",
        padding: "1rem",
        borderRadius: "0.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
      key={article.slug}
    >
      <h2
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {index + 1}.{" "}
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h2>

      <div style={{ display: "inline-flex", gap: "0.5rem" }}>
        {article.author && (
          <p>
            <strong>Autor:</strong> {article.author}
          </p>
        )}

        {article.publishDate && (
          <p>
            <strong>Publicado em:</strong> {article.publishDate}
          </p>
        )}

        {article.tags.length > 0 && (
          <p>
            <strong>Tags: </strong>
            {article.tags.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
