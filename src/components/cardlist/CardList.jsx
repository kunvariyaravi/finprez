import React, { useState, useEffect } from 'react';
import styles from './cardList.module.css';
// import Pagination from '../pagination/Pagination';
import Card from '../card/Card';

const CardList = ({ page, cat }) => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.finprez.com/api/posts?page=${page}&cat=${cat || ''}`,
          {
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setPosts(data.posts || []);
        setCount(data.count || 0);
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show an error message to the user)
      }
    };

    fetchData();
  }, [page, cat]);

  const POST_PER_PAGE = 2;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      {/* <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> */}
    </div>
  );
};

export default CardList;
