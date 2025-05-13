import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMeta {
  slug: string;
  title: string;
  author?: string;
  authorImage?: string | null;
  tags: string[];
  publishDate: string | null;
}

export interface ArticleData extends ArticleMeta {
  content: string;
}

/***
 * Reads all .md files in public/articles and returns an array of metadata.
 */
export function getAllArticles(): ArticleMeta[] {
  const dir = path.join(process.cwd(), "public", "articles");
  const fileNames = fs.readdirSync(dir);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, fileName), "utf8");
    const { data } = matter(raw);

    const tags: string[] = data.tags
      ? Array.isArray(data.tags)
        ? data.tags
        : data.tags.split(",").map((t: string) => t.trim())
      : [];

    const publishDate: string | null = data.publishDate
      ? new Date(data.publishDate).toISOString()
      : null;

    const authorImage: string | null = data.authorImage
      ? String(data.authorImage)
      : null;

    return {
      slug,
      title: String(data.title),
      author: data.author ? String(data.author) : undefined,
      authorImage,
      tags,
      publishDate,
    };
  });
}

/**
 * Reads Markdown file for a given slug and returns its metadata and content.
 * @param slug - The article identifier (filename without extension).
 * @returns An object containing slug, parsed front-matter, and Markdown content.
 * @throws If file does not exist.
 */
export function getArticleMarkdown(slug: string): ArticleData {
  const filePath = path.join(process.cwd(), "public", "articles", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Article not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const tags: string[] = data.tags
    ? Array.isArray(data.tags)
      ? data.tags
      : data.tags.split(",").map((t: string) => t.trim())
    : [];

  const publishDate: string | null = data.publishDate
    ? new Date(data.publishDate).toISOString()
    : null;

  const authorImage: string | null = data.authorImage
    ? String(data.authorImage)
    : null;

  return {
    slug,
    title: String(data.title),
    author: data.author ? String(data.author) : undefined,
    authorImage,
    tags,
    publishDate,
    content,
  };
}
