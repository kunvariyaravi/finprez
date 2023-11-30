import React, { useState, useEffect } from 'react';
import styles from './cardList.module.css';
import Pagination from '../pagination/Pagination';
import Card from '../card/Card';

const CardList = ({ page, cat }) => {
  const [data, setData] = useState({ posts: [], count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://www.finprez.com/api/posts?page=${page}&cat=${cat || ''}`,
          {
            cache: 'no-store',
          }
        );

        if (!res.ok) {
          throw new Error('Failed');
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [page, cat]);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.posts}>
            {data.posts?.map((item) => (
              <Card item={item} key={item._id} />
            ))}
          </div>
          <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
        </>
      )}
    </div>
  );
};

export default CardList;
