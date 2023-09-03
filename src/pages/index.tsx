import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { DEVELOPER_NAME, DEVELOPER_SUMMARY } from "@/const";

import styles from "../styles/Home.module.css";

const Home = ({name, summary}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  return (
      <section className={styles.Home}>
        <h1 className={styles.Name}>{name}</h1>
        <div className={styles.Summary}>{summary}</div>
        <Button variant="outlined" size="large" onClick={() => router.push("/projects")}>My Proyects</Button>
      </section>
    );
}

export const getStaticProps: GetStaticProps  = async() => {
  return {
    props: {
      name: DEVELOPER_NAME,
      summary: DEVELOPER_SUMMARY
    }
  }
}

export default Home;