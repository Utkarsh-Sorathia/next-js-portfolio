/**
 * Validates and ensures alt text is meaningful for images
 * @param altText - The alt text to validate
 * @param fallback - Fallback text if alt is empty or meaningless
 * @param context - Context about the image (e.g., "project logo", "blog post image")
 * @returns A meaningful alt text
 */
export function validateAltText(
  altText: string | null | undefined,
  fallback: string,
  context?: string
): string {
  // If alt text exists and is meaningful (not just whitespace, not generic)
  if (altText && altText.trim().length > 0) {
    const trimmed = altText.trim();
    
    // Reject generic/unhelpful alt texts
    const genericPatterns = [
      /^image$/i,
      /^img$/i,
      /^photo$/i,
      /^picture$/i,
      /^.*\.(jpg|jpeg|png|webp|svg|gif)$/i, // Just filename
      /^[0-9]+$/i, // Just numbers
    ];

    const isGeneric = genericPatterns.some(pattern => pattern.test(trimmed));
    
    if (!isGeneric && trimmed.length >= 3) {
      return trimmed;
    }
  }

  // Generate meaningful fallback
  if (context) {
    return `${context}: ${fallback}`;
  }

  return fallback || 'Image';
}

/**
 * Gets a descriptive alt text for project images
 */
export function getProjectAltText(projectTitle: string): string {
  return `${projectTitle} project`;
}

/**
 * Gets a descriptive alt text for blog images
 */
export function getBlogAltText(postTitle: string): string {
  return `Blog post image for: ${postTitle}`;
}

/**
 * Gets a descriptive alt text for skill icons
 */
export function getSkillAltText(skillName: string): string {
  return `${skillName} skill icon`;
}

/**
 * Gets a descriptive alt text for experience logos
 */
export function getExperienceLogoAltText(companyName: string): string {
  return `${companyName} company logo`;
}

