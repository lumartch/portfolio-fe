import { Skeleton } from "@/components";
import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

type IProject = {
    project: any;
}

const Project: FC<IProject> = ({project}) => {
    const router = useRouter();
    return (
        <>
            <Grid container direction={"column"} alignItems="center" justifyContent="center">
                <Skeleton title={project.name} description={project.description} />
                <Box textAlign="center">
                    <Button variant="contained" size="large" onClick={() => router.push("/projects")}>My Projects</Button>
                </Box>
                <Box>
                    <Image
                        src={project.imageUrl}
                        alt={project.name}
                        width={550}
                        height={550}
                    />
                </Box>
                <h1>Project overview</h1>
                <Box>
                    <span>
                        {project.description}
                    </span>
                </Box>
                <h1>Tools used</h1>
                <Box>
                    {project.tools}
                </Box>
            </Grid>
        </>
    );
}

// export  async function getServerSideProps(context: any) {
//     const id = context.params.id;
//     try {
//         const response = await fetch(`http://localhost:3000/api/projects/${id}`);
//         const project =  await response.json();
//         return {
//             props: {
//                 project,
//             },
//         }
//     } catch (e) {
//         console.error(e);
//     }
// }

export async function getStaticPaths() {
    try {
        const response = await fetch(`http://localhost:3000/api/projects/`);
        const projects =  await response.json();
        const paths = projects.map(( project: any ) => {
            return { params: { id: project._id.toString() } }
        })
        return {
            paths, 
            fallback: false
        }
    } catch (e) {
        console.error(e);
    }
}

export async function getStaticProps({params} :any) {
    try {
        const response = await fetch(`http://localhost:3000/api/projects/${params.id}`); 
        const project =  await response.json();
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