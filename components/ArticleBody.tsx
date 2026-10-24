import { BASE_PATH } from "@/lib/site";

/**
 * Renders article HTML compiled from /admin markdown. Root-relative links and
 * images ("/areas/...", "/uploads/...") get the site basePath; tables are
 * wrapped so they scroll horizontally on phones.
 */
export function ArticleBody({ html }: { html: string }) {
  const out = html
    .replace(/(href|src)="\/(?!\/)/g, `$1="${BASE_PATH}/`)
    .replace(/<table>/g, '<div class="mb-6 overflow-x-auto rounded-card shadow-soft"><table class="!mb-0">')
    .replace(/<\/table>/g, "</table></div>");
  return <div className="prose-ms" dangerouslySetInnerHTML={{ __html: out }} />;
}
