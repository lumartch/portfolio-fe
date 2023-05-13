// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IProject } from '@/types/Types';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = IProject;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const response = await fetch("http://localhost:3000/api/projects/");
    const projects = await response.json();
    const { id } = req.query;
    const match = projects.find( (project: any) => project._id == id);
    res.status(200).json(match);
}