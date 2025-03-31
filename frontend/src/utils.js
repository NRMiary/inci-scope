// Helper function to remove HTML tags from a string
export function stripHTML(html) {
    return html.replace(/<[^>]+>/g, "");
  }
  