import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { ApiHandler } from "@/api";
import { IProject } from "@/interfaces";
import { DEVELOPER_GIT_USER } from "@/const";

type IProjectList = {
    gitSource: string;
}

export const ProjectList:FC<IProjectList> = ({ gitSource }) => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [archived, setArchived] = useState<boolean>(false);

    useEffect(() => {
        const updateProjects = async () => {
            ApiHandler.getInstance();
            try {
                // const { data: projectsData } = await ApiHandler.getRepos(DEVELOPER_GIT_USER!, archived, gitSource);
                // setProjects(projectsData);
            } catch (e) {
                console.error(`ERROR THROWN BY SERVER ${e}`);
            }
        }
        updateProjects();
    }, [archived, gitSource]);

    return (
        <Box>
            {/* {console.log(gitSource)} */}
        </Box>
    );
}