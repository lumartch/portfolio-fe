import { Chip, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const ProjectForm = () => {
    const [skills, setSkills] = useState([]);

    const defaultValues = {
        name: "",
        description: "",
        imageUrl: "",
        tools: []
    };

    const projectSchema = yup.object().shape({
        name: yup.string().required("In order to add a new project is necessary to add the name of it."),
        description:  yup.string(),
        imageUrl: yup.string(),
        tools: yup.array(),
    });

    const { control } = useForm({
        defaultValues,
        resolver: yupResolver(projectSchema),
        mode: 'all'
    });

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
        <form>
            <Grid container spacing={4}>
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
                        name="imageUrl"
                        render={ ({field, fieldState}) => (
                        <TextField 
                            {...field}
                            label="Image URL"
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
                    <InputLabel id='tools-label'>Tools</InputLabel>
                    <Controller
                        control={control}
                        name="tools"
                        render={ ({field, fieldState}) => (
                            <Select 
                                {...field}
                                labelId="tools-label"
                                variant="outlined"
                                fullWidth
                                multiple
                                minRows={2}
                                maxRows={2}
                                error={ !!fieldState.error }
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
            </Grid>
        </form>
    );
}