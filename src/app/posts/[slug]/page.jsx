// "use client"

import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import Head from "next/head";

const getData = async (slug) => {
  const res = await fetch(`https://www.finprez.com/api/posts/${slug}`);

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

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

export async function generateMetadata({ params }) {
  const { slug } = params;
  const response = await fetch(`https://www.finprez.com/api/posts/${slug}`);
  const post = await response.json();

  return {
    title: post.title,
    description: post.desc.substring(0, 160),
    openGraph: {
      images: [
        {
          url: post.img,
        },
      ],
    },
  };
}

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  return (
    <div className={styles.container}>
      {/* <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
      </Head> */}
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

export default SinglePage;
