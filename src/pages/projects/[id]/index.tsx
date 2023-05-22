import { getAllProjects, getProjectById } from "@/api/Projects";
import { Skeleton } from "@/components";
import { IProject } from "@/types/Types";
import { Button, Chip, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

type IProps = {
    project: IProject;
}

const Project: FC<IProps> = ({ project }) => {
    const router = useRouter();
    const { name, description, overview, imageUrl, tools, projectLink } = project;
    return (
        <>
            <Grid container direction={"column"} alignItems="center" justifyContent="center" gap={2}>
                <Skeleton title={name} description={description} />
                <Grid item>
                    <Button variant="contained" size="large" onClick={() => router.push("/projects")}>My Projects</Button>
                </Grid>
                <Grid item>
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={550}
                        height={550}
                    />
                </Grid>
                <Grid item container alignItems="center" justifyContent="center">
                    <h1>Project overview</h1>
                    <span>
                        {overview}
                    </span>
                </Grid>
                <Grid item container alignItems="center" justifyContent="center">
                    <h1>Tools used</h1>
                    <Grid container gap={1} alignItems="center" justifyContent="center">
                        {tools.map((values: string, index: number) => {
                            return (
                                <Grid item key={index}>
                                    <Chip label={values}></Chip>
                                </Grid>
                            )})
                        }
                    </Grid>
                </Grid>
                <Grid item>
                    { projectLink ? <Link href={projectLink}><Button variant="outlined">See project</Button></Link> : null }
                </Grid>
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