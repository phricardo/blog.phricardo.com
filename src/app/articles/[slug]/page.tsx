"use server";

import type { Metadata } from "next";
import { getArticleMarkdown, type ArticleData } from "@/utils/articles";
import { getHtmlContent } from "@/utils/getHtmlContent";
import ArticleContent from "@/components/ArticleContent";
import ArticleNotFound from "@/components/ArticleNotFound";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = getArticleMarkdown(slug);
    return {
      title: `${article.title}`,
    };
  } catch {
    return {
      title: "Artigo não encontrado",
    };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch article metadata and raw content
  let article: ArticleData;
  try {
    article = getArticleMarkdown(slug);
  } catch (err) {
    console.log(err);
    return <ArticleNotFound />;
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
