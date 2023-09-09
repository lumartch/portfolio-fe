import { Button, Chip, Grid, Stack } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import { Skeleton } from "@/components";
import { ABOUT_LABELS, EPaths } from "@/const";

const About = ( { skills }: InferGetStaticPropsType<typeof getStaticProps> ) => {
    const router = useRouter();
    const { Description, Header, ParagraphOne, ParagraphTwo, Title, SecondTitle } = ABOUT_LABELS;
    return (
            <Grid container>
                <Grid item xs={12}>
                    <Skeleton title={Title} description={Description} />
                </Grid>
                <Grid item container xs={12} spacing={3} >
                    <Grid item xs={6}>
                        <h2>{Header}</h2>
                        <p>{ParagraphOne}</p>    
                        <p>{ParagraphTwo}</p>    
                    </Grid>
                    <Grid item xs={6}>
                        <h2>{SecondTitle}</h2>
                        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                            {skills.map((skill: string, index: number) => <Chip key={index} label={skill} variant="outlined" color="primary" />)}
                        </Stack>
                    </Grid>
                </Grid>
                <Button variant="outlined" size="large" onClick={() => router.push(EPaths.Contact)}>Contact</Button>
            </Grid>
        );
}

export const getStaticProps: GetStaticProps  = async() => {
    let skills = ['JavaScript', 'TypeScript', 'Java', 'Git', 'ReactJs', 'CSS', 'Cypress', 'Jest', 'Python', 'Azure Static Web Apps', 'C / C++', 'C#', 'Jenkins'];
    try {
        // const response = await fetch("https://skills-api-7070e-default-rtdb.firebaseio.com/skills.json");
        // const data = await response.json();
        // skills = data.split(",");
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