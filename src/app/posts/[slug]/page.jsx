// "use client"

import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import Head from 'next/head';

const getData = async (slug) => {
  const res = await fetch(`https://www.finprez.com/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.desc.substring(0,60)} />
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content={data?.desc.substring(0,60)} />
        <meta property="og:image" content={data?.img} />
        {/* <meta property="og:url" content={data?.url} /> */}
        <meta name="twitter:title" content={data?.title} />
        <meta name="twitter:description" content={data?.desc.substring(0,60)} />
        <meta name="twitter:image" content={data?.img} />
      </Head>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{data?.title}</h1>
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
      </div>
      {data?.img && (
        <div className={styles.imageContainer}>
          <Image src={data.img} alt="" fill className={styles.image} />
        </div>
      )}

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
