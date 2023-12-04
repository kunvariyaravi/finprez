import Link from "next/link";
import styles from "./homepage.module.css";
// import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "../components/cardlist/CardList";
import Menu from "@/components/Menu/Menu";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
       <div className="blur" style={{top: '15%', right: '0'}}></div>
        <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
      {/* <Featured /> */}
      {/* <CategoryList /> */}
      <div className={styles.content}>
        <CardList page={page}/>
        <Menu />
      </div>
    </div>
  );
}