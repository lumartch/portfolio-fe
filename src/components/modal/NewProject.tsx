import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ProjectForm } from "../form/ProjectForm";
import { FC } from "react";

type INewProject = {
    open: boolean,
    onClose: () => void,
    onSubmit: (values: any) => void,
}

export const NewProject:FC<INewProject> = ( { open, onClose, onSubmit } ) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Add new project...
            </DialogTitle>
            <DialogContent>
                <ProjectForm onSubmit={onSubmit} />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="info" type="submit" form="project-form">Add</Button>
                <Button variant="contained" color="error" type="reset" form="project-form">Clear</Button>
            </DialogActions>
        </Dialog>
    );
}