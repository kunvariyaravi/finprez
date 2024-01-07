export default async function sitemap() {
  try {
    const response = await fetch("https://www.finprez.com/api/ipopost");
    console.log("API Response:", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const { posts } = await response.json();

    if (!posts || posts.length === 0) {
      console.error("No posts found in the API response.");
      return [];
    }

    const ipopostEntries = posts.map(({ iposlug }) => ({
        url: `https://www.finprez.com/ipo/${iposlug}`,
        // lastModified: new Date(post.updatedAt),
        // changeFrequency:,
        // priority:
      }));
      
      console.log("IPO Post Entries:", ipopostEntries);
      

    return [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      //     lastModified: new Date(),
      //   },
      ...ipopostEntries,
    ];
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}
