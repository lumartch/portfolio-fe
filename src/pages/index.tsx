import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Button, Grid, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { DEVELOPER_NAME, DEVELOPER_SUMMARY, EPaths, minWidth } from '@/const';
import { Skeleton } from '@/components';

const Home = ({name, summary}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
  const padding: number = matches ? 16 : 0;
  
  return (
      <Grid container sx={{ textAlign: 'center', alignItems: 'center' }} spacing={8} paddingLeft={padding} paddingRight={padding}>
        <Grid item xs={12}>
          <Skeleton title={name} description={summary} />
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' size='large' onClick={() => router.push(EPaths.Projects)}>My Projects</Button>
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