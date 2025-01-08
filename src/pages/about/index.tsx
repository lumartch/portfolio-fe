import { PageInfo } from '@/components';
import { useFirebase } from '@/config';
import { ABOUT_LABELS, PathsRecord } from '@/consts';
import { PagePaths } from '@/enums';
import { Button, Chip, Grid2, Stack, Typography } from '@mui/material';
import { get } from 'firebase/database';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
    languages: string[];
    frameworks: string[];
    tools: string[];
}

const About = ( { frameworks, languages, tools }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { description, header, paragraphOne, paragraphTwo, title } = ABOUT_LABELS;
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
                    <Typography component="h2" variant="h4">Programming Languages</Typography>
                    <Stack direction='row' flexWrap='wrap' spacing={2} useFlexGap>
                        {languages.map((language, index) => <Chip color='primary' key={index} label={language} variant='outlined' />)}
                    </Stack>
                    <Typography component="h2" variant="h4">Frameworks</Typography>
                    <Stack direction='row' flexWrap='wrap' spacing={2} useFlexGap>
                        {frameworks.map((framework, index) => <Chip color='primary' key={index} label={framework} variant='outlined' />)}
                    </Stack>
                    <Typography component="h2" variant="h4">Tools</Typography>
                    <Stack direction='row' flexWrap='wrap' spacing={2} useFlexGap>
                        {tools.map((tool, index) => <Chip color='primary' key={index} label={tool} variant='outlined' />)}
                    </Stack>
                    <Button onClick={() => router.push(PathsRecord[PagePaths.CONTACT])} variant='outlined'>Contact</Button>
                </Grid2>
            </Grid2>
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    try {
        const { refFrameworks, refLanguages, refTools } = useFirebase();
        const languages = (await get(refLanguages)).val();
        const frameworks = (await get(refFrameworks)).val();
        const tools = (await get(refTools)).val();
        return {
            props: { frameworks, languages, tools },
            revalidate: 10
        };
    } catch {
        throw new Error({ statusCode: 500 });
    }
};

export default About;