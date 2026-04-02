import { IBlogPost } from "@/interfaces";

/**
 * Extracts a plain text excerpt from blog post body
 */
export function getBlogExcerpt(post: IBlogPost, length: number = 160): string {
  if (!post) return "";

  // Use manual excerpt if it exists
  if (post.excerpt) {
    return post.excerpt.substring(0, length).trim();
  }

  if (!post.body) return "";

  let excerpt = "";
  if (typeof post.body === "string") {
    // Basic markdown to text conversion
    excerpt = post.body.replace(/[#*`[\]()]/g, "").trim();
  } else if (Array.isArray(post.body)) {
    // Portable Text extraction
    const firstTextBlock = post.body.find(
      (block: any) =>
        block._type === "block" &&
        block.children?.some((child: any) => child.text?.trim())
    );
    excerpt = firstTextBlock?.children?.map((c: any) => c.text).join("") || "";
  }

  return excerpt.substring(0, length).trim();
}

/**
 * Calculates estimated reading time in minutes
 */
export function getReadingTime(text: string | any[]): string {
  let content = "";
  if (typeof text === "string") {
    content = text;
  } else if (Array.isArray(text)) {
    content = text
      .map((block: any) =>
        block.children?.map((child: any) => child.text).join("")
      )
      .join(" ");
  }

  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}

/**
 * Formats a date string to a readable format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
