// Importing necessary modules and components
import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

// Async function to fetch data for a specific post using its slug
const getData = async (slug) => {
  try {
    const res = await fetch(`https://www.finprez.com/api/posts/${slug}`);

    if (!res.ok) {
      throw new Error("Failed");
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

// Async function to generate static parameters for Next.js static site generation
export async function generateStaticParams() {
  try {
    const response = await fetch("https://www.finprez.com/api/posts");
    const { posts } = await response.json();

    // Check if 'posts' is an array before mapping over it
    if (Array.isArray(posts)) {
      return posts.map(({ id }) => ({ params: { slug: id.toString() } }));
    } else {
      console.error(
        "API response did not contain a valid 'posts' array:",
        posts
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Async function to generate metadata for a specific post
export async function generateMetadata({ params }) {
  const { slug } = params;
  const response = await fetch(`https://www.finprez.com/api/posts/${slug}`);
  const post = await response.json();

  if (response.ok && post) {
    return {
      title: post.title,
      description: post.title,
      openGraph: {
        images: [
          {
            url: post.img,
          },
        ],
      },
    };
 } else {
    console.error("Error fetching post data:", response.status, post);
    return {};
 }
}

// Async component to display a single page with post details
const SinglePage = async ({ params }) => {
  const { slug } = params;

  // Fetch data for the specific post
  const data = await getData(slug);

  // Render the single page with post details
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{data?.title}</h1>
      </div>
      {data?.img && (
        <div className={styles.imageContainer}>
          <Image src={data.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.user}>
        {data?.user?.image && (
          <div className={styles.userImageContainer}>
            <Image
              src={data.user.image}
              alt=""
              fill
              className={styles.avatar}
            />
          </div>
        )}
        <div className={styles.userTextContainer}>
          <span className={styles.username}>{data?.user.name}</span>
          <span className={styles.date}>
            Published on {data?.createdAt.substring(0, 10)}
          </span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

// Exporting the SinglePage component as the default export
export default SinglePage;
