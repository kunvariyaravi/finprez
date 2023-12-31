// IpoList.js
import React from "react";
import styles from "./ipolist.module.css";
import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch("https://www.finprez.com/api/ipopost", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const jsonData = await res.json();

    

    // Sort data by close date in descending order
    const sortedData = jsonData.result.sort((a, b) => {
      const dateA = new Date(a.closedate);
      const dateB = new Date(b.closedate);
      return dateB - dateA;
    });

    return sortedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error
  }
};


const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Date(dateString).toLocaleDateString("en-GB", options);
  return formattedDate;
};

const getIPOStatus = (openDate, closeDate) => {
  const currentDate = new Date();

  const formattedOpenDate = new Date(openDate);
  const formattedCloseDate = new Date(closeDate);

  if (currentDate < formattedOpenDate) {
    return 'Upcoming';
  } else if (currentDate > formattedCloseDate) {
    return 'Closed';
  } else {
    return 'Open';
  }
};

const IpoList = async () => {
  const posts = await getData();

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.title}>Latest IPO in India</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thCell}>Company Name</th>
            <th className={styles.thCell}>Open Date</th>
            <th className={styles.thCell}>Close Date</th>
            <th className={styles.thCell}>Price</th>
            <th className={styles.thCell}>Lot Size</th>
            <th className={styles.thCell}>GMP</th>
            <th className={styles.thCell}>Allotment Date</th>
            <th className={styles.thCell}>Listing Date</th>
            <th className={styles.thCell}>Status</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((item) => (
            <tr key={item._id}>
              <td className={styles.tableCell}>
                <Link href={`https://www.finprez.com/ipo/${item.iposlug}`}>
                  {item.title}
                </Link>
              </td>
              <td className={styles.tableCell}>{formatDate(item.opendate)}</td>
              <td className={styles.tableCell}>{formatDate(item.closedate)}</td>
              <td className={styles.tableCell}>{item.price}</td>
              <td className={styles.tableCell}>{item.lot}</td>
              <td className={styles.tableCell}>{item.gmp}</td>
              <td className={styles.tableCell}>{formatDate(item.allotmentdate)}</td>
              <td className={styles.tableCell}>{formatDate(item.listingdate)}</td>
              <td className={styles.tableCell}>
                {getIPOStatus(item.opendate, item.closedate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IpoList;
