"use client";

import Link from "next/link";
import ContentRenderer from "@/components/ContentRenderer";

export default function ArticleContent({
  title,
  author,
  publishDate,
  htmlContent,
}: {
  title: string;
  author?: string;
  publishDate?: string | null;
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

        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            {author && (
              <p>
                <span className="font-medium text-gray-800">Autor:</span>{" "}
                {author}
              </p>
            )}
            {publishDate && (
              <p>
                <span className="font-medium text-gray-800">Publicado em:</span>{" "}
                {new Date(publishDate).toLocaleDateString("pt-BR")}
              </p>
            )}
          </div>
        </header>

        <article className="prose prose-neutral max-w-none">
          <ContentRenderer htmlContent={htmlContent} />
        </article>
      </div>
    </main>
  );
}
