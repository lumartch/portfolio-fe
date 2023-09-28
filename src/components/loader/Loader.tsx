import { Card, CardContent, CircularProgress, Grid, Stack } from "@mui/material"

export const Loader = () => {
    return (
        <Grid container justifyContent='center'>
            <Stack sx={{ minHeight: '200px', justifyContent: 'space-around'}} direction='column'>
                <CircularProgress />
            </Stack>
        </Grid>
    );
}