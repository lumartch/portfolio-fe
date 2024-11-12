import { PageInfo } from '@/components';
import { ABOUT_LABELS, minWidth, PathsRecord } from '@/consts';
import { PagePaths } from '@/enums';
import { Button, Chip, Grid, Stack, useMediaQuery } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const About: React.FC = ( { skills }: InferGetStaticPropsType<typeof getStaticProps> ) => {
    const router = useRouter();
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const { description, header, paragraphOne, paragraphTwo, secondTitle, title } = ABOUT_LABELS;
    const direction = matches ? 'row' : 'column';
    const col: number = matches ? 6 : 12;
    const padding: number = matches ? 8 : 0;
    
    return (
        <>
            <Grid container item xs={12}>
                <PageInfo description={description} title={title} />
            </Grid>
            <Grid container item xs={12}>
                <Stack direction={direction} paddingLeft={padding} paddingRight={padding} spacing={4}>
                    <Grid item xs={col}>
                        <h2>{header}</h2>
                        <p>{paragraphOne}</p>    
                        <p>{paragraphTwo}</p>    
                    </Grid>
                    <Grid item xs={col}>
                        <h2>{secondTitle}</h2>
                        <Stack direction='row' flexWrap='wrap' spacing={2} useFlexGap>
                            {skills.map((skill: string, index: number) => <Chip color='primary' key={index} label={skill} variant='outlined' />)}
                        </Stack>
                    </Grid>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={() => router.push(PathsRecord[PagePaths.CONTACT])} variant='outlined'>Contact</Button>
            </Grid>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const skills = ['JavaScript', 'TypeScript', 'Java', 'Git', 'ReactJs', 'CSS', 'Cypress', 'Jest', 'Python', 'Azure Static Web Apps', 'C / C++', 'C#', 'Jenkins'];
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