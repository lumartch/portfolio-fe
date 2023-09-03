import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { DEVELOPER_NAME, DEVELOPER_SUMMARY } from "@/const";

import home from '../styles/Home.module.css';
import global from '../styles/Global.module.css';

const Home = ({name, summary}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  return (
      <div className={global.container}>
        <h1 className={home.name}>{name}</h1>
        <div className={home.summary}>{summary}</div>
        <Button variant="outlined" size="large" onClick={() => router.push("/projects")}>My Proyects</Button>
      </div>
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