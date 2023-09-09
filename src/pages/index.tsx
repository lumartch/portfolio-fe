import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { DEVELOPER_NAME, DEVELOPER_SUMMARY, EPaths } from "@/const";
import { Skeleton } from "@/components";

const Home = ({name, summary}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  return (
      <Grid container sx={{ textAlign: "center", alignItems: "center" }} spacing={8}>
        <Grid item xs={12}>
          <Skeleton title={name} description={summary} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" size="large" onClick={() => router.push(EPaths.Projects)}>My Proyects</Button>
        </Grid>
      </Grid>
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