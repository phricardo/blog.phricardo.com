"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ContentRenderer from "@/components/ContentRenderer";

export default function ArticleContent({
  title,
  author,
  authorImage,
  publishDate,
  tags = [],
  htmlContent,
}: {
  title: string;
  author?: string;
  authorImage?: string | null;
  publishDate?: string | null;
  tags?: string[];
  htmlContent: string;
}) {
  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="text-blue-600 hover:underline text-sm inline-block mb-4"
        >
          &larr; Voltar para o início
        </Link>

        <header className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Autor com avatar e data */}
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              {authorImage && author && (
                <Image
                  src={authorImage}
                  alt={author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                {author && (
                  <p className="font-medium text-gray-800">{author}</p>
                )}
                {publishDate && (
                  <time className="block">
                    {new Date(publishDate).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                )}
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
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
        </header>

        <article className="markdown-content">
          <ContentRenderer htmlContent={htmlContent} />
        </article>
      </div>
    </main>
  );
}
