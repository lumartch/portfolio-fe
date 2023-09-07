import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { DEVELOPER_NAME, DEVELOPER_SUMMARY } from "@/const";

const Home = ({name, summary}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  return (
      <Grid container sx={{ textAlign: "center", alignItems: "center" }} spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h3" style={{ textTransform: "uppercase" }}>{name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{summary}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" size="large" onClick={() => router.push("/projects")}>My Proyects</Button>
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