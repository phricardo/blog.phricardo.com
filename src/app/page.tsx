import { getAllArticles, type ArticleMeta } from "@/utils/articles";
import ArticleLink from "@/components/ArticleLink";

export default async function Index() {
  const articles: ArticleMeta[] = getAllArticles();

  if (articles.length === 0) return <h1>No articles found</h1>;
  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      {articles.map((article: any, index: number) => (
        <ArticleLink article={article} index={index} />
      ))}
    </div>
  );
}
