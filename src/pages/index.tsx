import { GetStaticProps, InferGetStaticPropsType } from "next";
import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

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
      name: "Luis Martínez",
      summary: "Software Developer Engineer with two years of experience in Front-End and Back-End looking for a mid-level position to launch my career into new challenges; " +
                  " Throughout my career, I've explored different areas of software development such as Front-End, Back-end, testing, and support for legacy services." +
                  " To advance my profession as a Full-stack Engineer, I'm now working to improve my tool abilities for ReactJS, Jest, Java, SpringBoot, and Rest API design.",
    }
  }
}

export default Home;