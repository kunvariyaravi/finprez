export default async function sitemap() {
    try {
      const response = await fetch("https://www.finprez.com/api/ipopost");
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const { posts } = await response.json();
  
      if (!posts || posts.length === 0) {
        console.error("No posts found in the API response.");
        return ''; // Return an empty string or handle accordingly if no posts are found.
      }
  
      const ipopostEntries = posts.map(({ iposlug }) => ({
        url: `https://www.finprez.com/ipo/${iposlug}`,
      }));
  
      // Build the sitemap XML content
      const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${ipopostEntries.map(entry => `<url><loc>${entry.url}</loc></url>`).join('\n')}
        </urlset>`;
  
      return sitemapXML;
    } catch (error) {
      console.error("Error:", error);
      return ''; // Return an empty string or handle accordingly in case of an error.
    }
  }
  