"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArticleMeta } from "@/utils/articles";

export default function ArticleLink({
  article,
  index,
}: {
  article: ArticleMeta;
  index: number;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      key={article.slug}
      className="block bg-white rounded-2xl border border-gray-200 p-6 no-underline transition transform hover:shadow-lg hover:-translate-y-1 duration-200"
    >
      {/* Cabeçalho: número e data */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-indigo-500 font-bold text-xl">{index + 1}.</span>
        {article.publishDate && (
          <time className="text-sm text-gray-500">
            {new Date(article.publishDate).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </time>
        )}
      </div>

      {/* Título */}
      <h2 className="text-gray-900 font-semibold text-2xl leading-tight mb-3">
        {article.title}
      </h2>

      {/* Autor e Tags na mesma linha */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        {/* Autor com avatar */}
        {article.author && (
          <div className="flex items-center gap-2">
            {article.authorImage && (
              <Image
                src={article.authorImage}
                alt={article.author}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <p>{article.author}</p>
          </div>
        )}

        {/* Badges de tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="uppercase text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
