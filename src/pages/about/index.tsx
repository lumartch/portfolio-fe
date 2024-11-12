import { PageInfo } from '@/components';
import { ABOUT_LABELS, PathsRecord } from '@/consts';
import { PagePaths } from '@/enums';
import { Button, Chip, Grid2, Stack } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const About: React.FC = ( { skills }: InferGetStaticPropsType<typeof getStaticProps> ) => {
    const router = useRouter();
    const { description, header, paragraphOne, paragraphTwo, secondTitle, title } = ABOUT_LABELS;
    
    return (
        <>
            <PageInfo description={description} title={title} />
            <Grid2 container paddingBottom={8} spacing={8}>
                <Grid2 size={{ lg: 8 }}>
                    <h2>{header}</h2>
                    <p>{paragraphOne}</p>    
                    <p>{paragraphTwo}</p>    
                </Grid2>
                <Grid2 size={{ lg: 4 }}>
                    <h2>{secondTitle}</h2>
                    <Stack direction='row' flexWrap='wrap' spacing={2} useFlexGap>
                        {skills.map((skill: string, index: number) => <Chip color='primary' key={index} label={skill} variant='outlined' />)}
                    </Stack>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <Button onClick={() => router.push(PathsRecord[PagePaths.CONTACT])} variant='outlined'>Contact</Button>
                </Grid2>
            </Grid2>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const skills = ['TypeScript', 'ReactJs', 'JavaScript', 'Java', 'Git', 'Jenkins', 'CSS', 'Cypress', 'Jest', 'C / C++', 'C#'];
    try {
        // const response = await fetch('https://skills-api-7070e-default-rtdb.firebaseio.com/skills.json');
        // const data = await response.json();
        // skills = data.split(',');
    } catch (e) {
        console.error(e);
    }
    return {
        props: {
            skills: skills
        },
        revalidate: 10
    };
};

export default About;