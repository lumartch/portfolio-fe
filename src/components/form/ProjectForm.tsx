import { Chip, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { IProject } from "@/types/Types";
import Image from "next/image";

type IProjectForm = {
    onSubmit: (values: any) => void,
    editValues?: IProject;
}

export const ProjectForm: FC<IProjectForm> = ({ onSubmit, editValues }) => {
    const [skills, setSkills] = useState([]);

    const defaultValues: IProject = {
        name: "",
        description: "",
        overview: "",
        imageUrl: "",
        projectLink: "",
        tools: []
    };

    const projectSchema = yup.object().shape({
        name: yup.string().required("In order to add a new project is necessary to add the name of it."),
        description:  yup.string().required(),
        overview: yup.string().required(),
        imageUrl: yup.string().required("In order to add a new project is necessary to add a image preview."),
        tools: yup.array(),
        projectLink: yup.string()
    });

    const { control, watch, reset, handleSubmit } = useForm({
        defaultValues: editValues || defaultValues,
        resolver: yupResolver(projectSchema),
        mode: 'all',
    })

    const imageValue = watch('imageUrl');

    const fetchSkills = async() => {
        try {
            const response = await fetch("https://skills-api-7070e-default-rtdb.firebaseio.com/skills.json");
            const data = await response.json();
            setSkills(data.split(","));
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => { fetchSkills(); }, [])

    return (
        <form id="project-form" onReset={ () => reset(defaultValues) } onSubmit={ handleSubmit(onSubmit) } >
            <Grid container spacing={4} padding={2}>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="name"
                        render={ ({field, fieldState}) => (
                        <TextField 
                            {...field}
                            label="Project name"
                            variant="outlined"
                            fullWidth
                            error={ !!fieldState.error }
                            helperText={ fieldState.error?.message }
                            ></TextField>)
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="description"
                        render={ ({field, fieldState}) => (
                        <TextField 
                            {...field}
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={2}
                            maxRows={2}
                            error={ !!fieldState.error }
                            helperText={ fieldState.error?.message }
                            ></TextField>)
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="overview"
                        render={ ({field, fieldState}) => (
                        <TextField 
                            {...field}
                            label="Overview"
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={2}
                            maxRows={2}
                            error={ !!fieldState.error }
                            helperText={ fieldState.error?.message }
                            ></TextField>)
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="projectLink"
                        render={ ({field, fieldState}) => (
                        <TextField 
                            {...field}
                            label="Project Link"
                            variant="outlined"
                            fullWidth
                            error={ !!fieldState.error }
                            helperText={ fieldState.error?.message }
                            ></TextField>)
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id='tools-label'>Tools</InputLabel>
                    <Controller
                        control={control}
                        name="tools"
                        render={ ({ field }) => (
                            <Select 
                                {...field}
                                labelId="tools-label"
                                variant="outlined"
                                fullWidth
                                multiple
                                minRows={2}
                                maxRows={2}
                                renderValue={(selected) => {
                                    return (
                                        <Grid container gap={1}>
                                            {selected.map((values: string, index: number) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <Chip label={values}></Chip>
                                                    </Grid>
                                                )})
                                            }
                                        </Grid>
                                    );
                                }}
                            >
                                {skills.map((skill: string, index: number) => (
                                    <MenuItem key={index} value={skill}>{skill}</MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="imageUrl"
                        render={ ({field, fieldState}) => (
                        <TextField 
                            {...field}
                            label="Image URL"
                            variant="outlined"
                            fullWidth
                            error={ !!fieldState.error }
                            helperText={ fieldState.error?.message }
                            ></TextField>)
                        }
                    />
                </Grid>
                {
                    imageValue && 
                    <Grid item xs={12}>
                        <Image
                            src={imageValue}
                            alt="projectImage"
                            width={550}
                            height={550}
                        />
                    </Grid>
                }
            </Grid>
        </form>
    );
}