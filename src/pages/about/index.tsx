import { Button, Chip, Grid, Stack, useMediaQuery } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

import { Skeleton } from '@/components';
import { ABOUT_LABELS, EPaths, minWidth } from '@/const';

const About = ( { skills }: InferGetStaticPropsType<typeof getStaticProps> ) => {
    const router = useRouter();
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const { Description, Header, ParagraphOne, ParagraphTwo, Title, SecondTitle } = ABOUT_LABELS;
    const direction = matches ? 'row' : 'column';
    const col: number = matches ? 6 : 12;
    const padding: number = matches ? 8 : 0;
    return (
            <Grid container item textAlign='center' spacing={4} paddingLeft={padding} paddingRight={padding}>
                <Grid item container xs={12}>
                    <Skeleton title={Title} description={Description} />
                </Grid>
                <Grid item container xs={12}>
                    <Stack spacing={4} direction={direction} paddingLeft={padding} paddingRight={padding}>
                        <Grid item xs={col}>
                            <h2>{Header}</h2>
                            <p>{ParagraphOne}</p>    
                            <p>{ParagraphTwo}</p>    
                        </Grid>
                        <Grid item xs={col}>
                            <h2>{SecondTitle}</h2>
                            <Stack direction='row' spacing={2} useFlexGap flexWrap='wrap'>
                                {skills.map((skill: string, index: number) => <Chip key={index} label={skill} variant='outlined' color='primary' />)}
                            </Stack>
                        </Grid>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='outlined' onClick={() => router.push(EPaths.Contact)}>Contact</Button>
                </Grid>
            </Grid>
        );
}

export const getStaticProps: GetStaticProps  = async() => {
    let skills = ['JavaScript', 'TypeScript', 'Java', 'Git', 'ReactJs', 'CSS', 'Cypress', 'Jest', 'Python', 'Azure Static Web Apps', 'C / C++', 'C#', 'Jenkins'];
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
    }
}

export default About;