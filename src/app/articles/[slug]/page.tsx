"use server";

import Link from "next/link";
import { getArticleMarkdown } from "@/utils/articles";
import { getHtmlContent } from "@/utils/getHtmlContent";
import ArticleContent from "@/components/ArticleContent";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Fetch article metadata and raw content
  let article;
  try {
    article = getArticleMarkdown(slug);
  } catch (err) {
    return (
      <div>
        <h1>Article not found</h1>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  const { publishDate, title, author, content } = article;

  // Convert markdown to HTML
  const htmlContent = await getHtmlContent(content);

  return (
    <ArticleContent
      title={title}
      author={author}
      publishDate={publishDate}
      htmlContent={htmlContent}
    />
  );
}
