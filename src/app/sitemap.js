export default async function sitemap() {
    const response = await fetch("https://www.finprez.com/api/ipopost");
    const { posts } = await response.json();

    if (!posts) {
        console.error("No posts found in the API response.");
        return []; // Return an empty array or handle the error appropriately
      }
  
    const ipopostEntries = posts.map(({ iposlug }) => ({
      url: `https://www.finprez.com/ipo/${iposlug}`,
      // lastModified: new Date(post.updatedAt),
      // changeFrequency:,
      // priority:
    }));
  
    return [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      //     lastModified: new Date(),
      //   },
      ...ipopostEntries,
    ];
  }
  