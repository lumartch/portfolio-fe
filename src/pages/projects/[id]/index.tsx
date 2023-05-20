import { getAllProjects, getProjectById } from "@/api/Projects";
import { Skeleton } from "@/components";
import { IProject } from "@/types/Types";
import { Box, Button, Chip, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

type IProps = {
    project: IProject;
}

const Project: FC<IProps> = ({ project }) => {
    const router = useRouter();
    const { name, description, imageUrl, tools, projectLink} = project;
    return (
        <>
            <Grid container direction={"column"} alignItems="center" justifyContent="center">
                <Skeleton title={name} description={description} />
                <Box textAlign="center">
                    <Button variant="contained" size="large" onClick={() => router.push("/projects")}>My Projects</Button>
                </Box>
                <Box>
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={550}
                        height={550}
                    />
                </Box>
                <h1>Project overview</h1>
                <Box>
                    <span>
                        {description}
                    </span>
                </Box>
                <h1>Tools used</h1>
                <Box>
                    <Grid container gap={1}>
                        {tools.map((values: string, index: number) => {
                            return (
                                <Grid item key={index}>
                                    <Chip label={values}></Chip>
                                </Grid>
                            )})
                        }
                    </Grid>
                </Box>
                { !projectLink ? <Link href={projectLink}><Button variant="outlined">See project</Button></Link> : null }
            </Grid>
        </>
    );
}

export async function getStaticPaths() {
    try {
        const projects = await getAllProjects();
        const paths = projects.map(( project: IProject ) => {
            return { params: { id: project._id!.toString() } }
        })
        return {
            paths, 
            fallback: false
        }
    } catch (e) {
        console.error(e);
    }
}

export async function getStaticProps({ params } :any) {
    try {
        const project = await getProjectById(params.id);
        return {
            props: {
                project,
            },
            revalidate: 4
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default Project;