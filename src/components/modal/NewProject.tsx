import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ProjectForm } from "../form/ProjectForm";
import { FC } from "react";

type INewProject = {
    open: boolean,
    onClose: () => void,
}

export const NewProject:FC<INewProject> = ( { open, onClose } ) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Add new project...
            </DialogTitle>
            <DialogContent>
                <ProjectForm />
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}