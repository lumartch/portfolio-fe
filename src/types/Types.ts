export type IProject = {
    _id?: string;
    name: string;
    description: string;
    overview: string;
    imageUrl: string;
    tools: Array<string>;
    projectLink: string;
}