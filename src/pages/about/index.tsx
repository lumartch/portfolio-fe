import { PageInfo } from '@/components';
import { ABOUT_LABELS, PathsRecord } from '@/consts';
import { PagePaths } from '@/enums';
import { Button, Chip, Grid2, Stack, Typography } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const About: React.FC = ( { skills }: InferGetStaticPropsType<typeof getStaticProps> ) => {
    const router = useRouter();
    const { description, header, paragraphOne, paragraphTwo, secondTitle, title } = ABOUT_LABELS;
    const _sx ={ display: 'flex', flexDirection: 'column', gap: '16px' };

    return (
        <>
            <PageInfo description={description} title={title} />
            <Grid2 container spacing={4}>
                <Grid2 size={{ lg: 8, md: 8, xs: 12 }} sx={_sx}>
                    <Typography component="h2" variant="h4">{header}</Typography>
                    <Typography component="p">{paragraphOne}</Typography>    
                    <Typography component="p">{paragraphTwo}</Typography>    
                </Grid2>
                <Grid2 container size={{ lg: 4, md: 4, xs: 12 }} sx={_sx}>
                    <Typography component="h2" variant="h4">{secondTitle}</Typography>
                    <Stack direction='row' flexWrap='wrap' spacing={2} useFlexGap>
                        {skills.map((skill: string, index: number) => <Chip color='primary' key={index} label={skill} variant='outlined' />)}
                    </Stack>
                    <Button onClick={() => router.push(PathsRecord[PagePaths.CONTACT])} variant='outlined'>Contact</Button>
                </Grid2>
            </Grid2>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const skills = ['TypeScript', 'ReactJs', 'JavaScript', 'CSS', 'Git', 'Java', 'Jenkins', 'Cypress', 'Jest', 'C / C++', 'C#'];
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