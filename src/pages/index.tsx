import { PageInfo } from '@/components';
import { DEVELOPER_NAME, DEVELOPER_SUMMARY, PathsRecord, } from '@/consts';
import { PagePaths } from '@/enums';
import { Button } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Home: React.FC = ({ name, summary }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
  
    return (
        <>
            <PageInfo description={summary} title={name} />
            <Button onClick={() => router.push(PathsRecord[PagePaths.PROJECTS])} size='large' variant='outlined'>My Projects</Button>
        </>
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