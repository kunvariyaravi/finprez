export default async function sitemap() {
    const response = await fetch("https://www.finprez.com/api/ipopost");
    const { posts } = await response.json();
  
    const ipopostEntries = posts.map(({ iposlug }) => ({
      url: `https://www.finprez.com/ipopost/${iposlug}`,
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
  