"use server";

import type { Metadata } from "next";
import { getArticleMarkdown, type ArticleData } from "@/utils/articles";
import { getHtmlContent } from "@/utils/getHtmlContent";
import ArticleContent from "@/components/ArticleContent";
import ArticleNotFound from "@/components/ArticleNotFound";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const article = getArticleMarkdown(params.slug);
    return {
      title: article.title,
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
  params: { slug: string };
}) {
  let article: ArticleData;
  try {
    article = getArticleMarkdown(params.slug);
  } catch {
    return <ArticleNotFound />;
  }

  const { publishDate, title, author, content } = article;
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
