const SERVER_URL = "http://localhost:4280";

export const getAllProjects = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/projects`);
        const projectJson  = await response.json();
        return projectJson.projects;
    } catch(e) {
        console.error(e);
        return [];
    }
}

export const getProjectById = async (id: number) => {
    try {
        const response = await fetch(`${SERVER_URL}/projects/${id}`);
        return await response.json();
    } catch(e) {
        console.error(e);
        return [];
    }
}

export const createProject = async () => {

}