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
  if (!dateString) return "Recently Published";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Converts a post body to Markdown. Bodies are either Markdown strings or
 * legacy Sanity Portable Text blocks (supports headings, lists, blockquotes
 * and strong/em/code marks). Used by the blog post page and the RSS feed.
 */
export function portableTextToMarkdown(body: any): string {
  if (!body) return '';
  if (typeof body === 'string') return body;
  if (!Array.isArray(body)) return '';

  let markdown = '';

  body.forEach((block: any) => {
    if (block._type === 'block') {
      const style = block.style || 'normal';
      const listItem = block.listItem;

      let text = '';

      if (block.children && Array.isArray(block.children)) {
        block.children.forEach((child: any) => {
          let childText = String(child?.text || '');

          // Apply marks from the child
          if (child?.marks && Array.isArray(child.marks)) {
            // Check for strong
            if (child.marks.includes('strong')) {
              childText = `**${childText}**`;
            }
            // Check for em
            if (child.marks.includes('em')) {
              childText = `*${childText}*`;
            }
            // Check for code
            if (child.marks.includes('code')) {
              childText = `\`${childText}\``;
            }
          }

          text += childText;
        });
      }

      // Handle lists
      if (listItem) {
        const prefix = listItem === 'bullet' ? '- ' : '1. ';
        markdown += `${prefix}${text}\n`;
      }
      // Apply block styles
      else if (style === 'h1') markdown += `# ${text}\n\n`;
      else if (style === 'h2') markdown += `## ${text}\n\n`;
      else if (style === 'h3') markdown += `### ${text}\n\n`;
      else if (style === 'h4') markdown += `#### ${text}\n\n`;
      else if (style === 'blockquote') markdown += `> ${text}\n\n`;
      else markdown += `${text}\n\n`;
    }
  });

  return markdown;
}

/** A post's body as Markdown, whichever format it was stored in. */
export function getPostMarkdown(post: IBlogPost): string {
  return typeof post.body === "string" ? post.body : portableTextToMarkdown(post.body);
}
