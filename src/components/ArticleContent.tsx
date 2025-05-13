"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ArticleContent({
  title,
  author,
  authorImage,
  publishDate,
  tags = [],
  markdown,
}: {
  title: string;
  author?: string;
  authorImage?: string | null;
  publishDate?: string | null;
  tags?: string[];
  markdown: string;
}) {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl bg-white shadow-none sm:shadow-lg rounded-2xl mx-auto space-y-6 p-4 sm:p-8">
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

        <article className="markdown-content ">
          <Markdown
            children={markdown}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const { ref: _ref, key: _key, ...restProps } = rest as any;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...restProps}
                    PreTag="div"
                    language={match[1]}
                    style={dark}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </article>
      </div>
    </main>
  );
}
