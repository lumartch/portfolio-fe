import { IProject } from "@/types/Types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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

export const createProject = async (project: IProject) => {
    try {
        const response = await fetch(`${SERVER_URL}/projects`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });
        const projectsJson = await response.json();
        return projectsJson.projectSaved;
    } catch (error) {
        console.error(error);
        return {};
    }
}

export const updateProject = async (project: IProject) => {
    try {
        const response = await fetch(`${SERVER_URL}/projects/${project._id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });
        const projectsJson = await response.json();
        return projectsJson;
    } catch (error) {
        console.error(error);
        return {};
    }
}
export const deleteProject = async (id: string) => {
    try {
        const response = await fetch(`${SERVER_URL}/projects/${id}`, {
            method: 'DELETE',
        });
        return response.status === 204;
    } catch (error) {
        console.error(error);
        return false;
    }
}