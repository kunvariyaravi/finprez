import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "../components/cardlist/CardList.jsx";
import Menu from "../components/Menu/Menu.jsx";
import IpoList from "../components/ipolist/ipolist.jsx";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      {/* <Featured /> */}
      {/* <CategoryList /> */}
      <IpoList></IpoList>
      <div className={styles.content}>
        <CardList page={page}/>
        {/* <Menu /> */}
      </div>
    </div>
  );
}