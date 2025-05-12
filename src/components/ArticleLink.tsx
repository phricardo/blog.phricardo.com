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
      key={article.slug}
      className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow duration-200 bg-white"
    >
      <h2 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
        {index + 1}.{" "}
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h2>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
        {article.author && (
          <p>
            <span className="font-medium text-gray-800">Autor:</span>{" "}
            {article.author}
          </p>
        )}
        {article.publishDate && (
          <p>
            <span className="font-medium text-gray-800">Publicado em:</span>{" "}
            {article.publishDate}
          </p>
        )}
        {article.tags.length > 0 && (
          <p>
            <span className="font-medium text-gray-800">Tags:</span>{" "}
            {article.tags.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
