import { getAllArticles, type ArticleMeta } from "@/utils/articles";
import ArticleLink from "@/components/ArticleLink";

export default async function Index() {
  const articles: ArticleMeta[] = getAllArticles();

  if (articles.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-600">
          No articles found
        </h1>
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Últimos Artigos
        </h1>
        {articles.map((article: ArticleMeta, index: number) => (
          <ArticleLink
            key={article.slug ?? index}
            article={article}
            index={index}
          />
        ))}
      </div>
    </main>
  );
}
