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
    <div className="container">
      <Link href="/">&larr; Back to Home</Link>
      <header>
        <h1>{title}</h1>
        <p>
          <span>
            <strong>Autor:</strong> {author}
          </span>
          <span>
            <strong>Publicado em:</strong>{" "}
            {publishDate
              ? new Date(publishDate).toLocaleDateString("pt-BR")
              : ""}
          </span>
        </p>
      </header>
      <article>
        <ContentRenderer htmlContent={htmlContent} />
      </article>
    </div>
  );
}
