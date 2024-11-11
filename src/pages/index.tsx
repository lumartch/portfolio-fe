import { Skeleton } from '@/components';
import { DEVELOPER_NAME, DEVELOPER_SUMMARY, EPaths } from '@/consts';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Home: React.FC = ({name, summary}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  
  return (
    <Grid container spacing={8} sx={{ alignItems: 'center', textAlign: 'center' }}>
      <Grid size={{ xs: 12 }}>
        <Skeleton description={summary} title={name} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Button onClick={() => router.push(EPaths.Projects)} size='large' variant='outlined'>My Projects</Button>
      </Grid>
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      name: DEVELOPER_NAME,
      summary: DEVELOPER_SUMMARY
    }
  };
};

export default Home;